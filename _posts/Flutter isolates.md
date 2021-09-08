---
title: "Flutter isolates"
date: 2021-06-16T05:35:07.322Z
filePath: "_posts/Flutter isolates.md"
slug: "Flutter isolates"
---

# Flutter isolates

[![](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FFlutter%20isolates%2FsJ6e_WnpL.png?alt=media&token=d3558068-851e-4744-941c-9b2ffb136c74)](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FFlutter%20isolates%2FsJ6e_WnpL.png?alt=media&token=d3558068-851e-4744-941c-9b2ffb136c74)

There are many ways to manage state in Flutter, but most of them are built in such a way that all the logic is executed in the main isolate of your application. Execution of network requests, working with WebSocket, potentially heavy synchronous operations (like local search), all this, as a rule, is implemented in the main isolate. This article will show other doors as well 👀.

I saw only one package designed to transfer these operations to external isolates, but [another](https://pub.dev/packages/isolator) one has recently appeared (written by me). I suggest you familiarize yourself with it.

In this article, I will use two main terms - **isolate** and the **main thread**. They differ so that the text is not too tautological, but essentially the main thread is also an isolate. Also here you will find some expressions that will cut the ear (_or eyes_) especially sensitive natures, so I apologize in advance - sorry. I will mark all doubtful words in italics (_not only them, try to figure it out now_). Also, further calling the operations **synchronous** - I will keep in mind that you will receive the result in the same function in which the third-party method was called. And **asynchronous** functions are functions in which you will not get the result in place but get it in another.

## Intro

Isolates are designed to run code on a non-main thread of your Flutter application. When the main thread starts executing network requests, performing calculations, or doing any other operations other than its main purpose - drawing the interface, sooner or later you will face the fact that the precious time for rendering one frame will start to increase. Basically, the time available to you to perform any operation on the main thread is limited to ~ 16ms, this is the window that exists between rendering 2 frames at 60FPS. However, at the moment there are many phones with a higher display frequency, and since I just have one, the more interesting it will be to compare the performance of an application with the same actions using different approaches. In this case, the window is already ~11.11ms, and the display refresh rate is 90FPS.

## Experiment number one: initial conditions

Let's imagine that you need to load a large amount of data, you can do this in several ways:

- Just make a request on the main thread
- Use the compute function to make a request
- Explicitly use isolate for request

The experiments were carried out on an OnePlus 7 Pro with a Snapdragon 855 processor and a forced to 90Hz screen frequency. The application was launched by the flutter run profile command. The emulation of receiving data from the server was carried out (5 simultaneous requests 10 times in a row).

One request returns JSON - an array of **2273** elements, one of the elements is shown in the screenshot. The size of the answer is 1.12Mb. Thus, for 5 simultaneous requests, we need to parse 5.6Mb of JSON (but there will be 2273 items in the application list).

[One of the elements of JSON](https://res.cloudinary.com/practicaldev/image/fetch/s--GNdys9p3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn.hashnode.com/res/hashnode/image/upload/v1610253178808/ysHj4pMvW.png)

[![](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FFlutter%20isolates%2FysHj4pMvW.png?alt=media&token=2fec114d-b2d0-4a75-ae80-9f69abfc2086)](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FFlutter%20isolates%2FysHj4pMvW.png?alt=media&token=2fec114d-b2d0-4a75-ae80-9f69abfc2086)

Let's compare all three methods in terms of such parameters - frame rendering time, operation time, the complexity of organizing/writing code.

### First example: Set of requests from the main thread

```
Future<void> loadItemsOnMainThread() async {
  _startFpsMeter();
  isLoading = true;
  notifyListeners();
  List<Item> mainThreadItems;
  for (int i = 0; i < 10; i++) {
    bench.startTimer('Load items in main thread');
    mainThreadItems = await makeManyRequests(5);
    final double diff = bench.endTimer('Load items in main thread');
    requestDurations.add(diff);
  }
  items.clear();
  items.addAll(mainThreadItems);
  isLoading = false;
  notifyListeners();
  _stopFpsMeter();
  requestDurations.clear();
}

```

This method resides in the reactive state which executing in the main application isolate.

This method is located in the reactive state executing in the main isolate of the application. When executing the code above, we get the following values:

- Average render time of one frame (FrameRenderingTime) - 14.036ms / 71.25FPS
- Maximum FRT- 100.332ms / 9.97FPS
- Average time to execute 5 concurrent requests - 226.894ms

See in action:

### Second example: compute()

```
Future<void> loadItemsWithComputed() async {
  _startFpsMeter();
  isLoading = true;
  notifyListeners();
  List<Item> computedItems;

  /// There were two variants of execution
  /// Each set of 5 concurrent requests, run sequentially,
  /// ran in compute function
  if (true) {
    for (int i = 0; i < 10; i++) {
      bench.startTimer('Load items in computed');
      computedItems = await compute<dynamic, List<Item>>(_loadItemsWithComputed, null);
      final double diff = bench.endTimer('Load items in computed');
      requestDurations.add(diff);
    }

    /// The second option is all 10 requests of 5 in one compute function
  } else {
    bench.startTimer('Load items in computed');
    computedItems = await compute<dynamic, List<Item>>(_loadAllItemsWithComputed, null);
    final double diff = bench.endTimer('Load items in computed');
    requestDurations.add(diff);
  }
  items.clear();
  items.addAll(computedItems);
  isLoading = false;
  notifyListeners();
  _stopFpsMeter();
  requestDurations.clear();
}

Future<List<Item>> _loadItemsWithComputed([dynamic _]) async {
  return makeManyRequests(5);
}

Future<List<Item>> _loadAllItemsWithComputed([dynamic _]) async {
  List<Item> items;
  for (int i = 0; i < 10; i++) {
    items = await makeManyRequests(5);
  }
  return items;
}

```

In this example, the same requests were launched in two versions: every 5 concurrent requests out of 10 consecutive ones were launched each in its own compute:

- Average FRT - 11.254ms / 88.86FPS
- Maximum FRT - 22.304ms / 44.84FPS
- Average time to execute 5 concurrent requests - 386.253ms

The second way - all 10 sequential requests for 5 simultaneous requests were launched in one compute:

- Average FRT - 11.252ms / 88.87FPS
- Maximum FRT - 22.306ms / 44.83FPS
- Average time for 5 concurrent requests (calculated as executing all 10 of 5 requests in compute, divided by 10) - 231.747ms

### Third example: Isolate

It is worth making a digression here: in package terminology, there are two parts of the general state (state):

- Frontend-state is a any reactive state that sends messages to the Backend, processes its responses, and also stores data, after updating which the UI is updated, and it also stores light methods that are called from the UI. This state works in the main thread of the application.
- Backend-state is a heavy state that receives messages from the Frontend, performs heavy operations, returns responses to the Frontend, and operates in a separate isolate. This state can also store data (wherever you want).

The code from the third option is split into several methods, due to the need to communicate with the isolate. Frontend methods are shown below:

```
/// This method is the entry point to the operation
Future<void> loadItemsWithIsolate() async {
  /// We start the frame counter before the whole operation
  _startFpsMeter();
  isLoading = true;
  notifyListeners();

  /// We start counting the request time
  bench.startTimer('Load items in separate isolate');

  /// Sending an event to Backend
  send(Events.startLoadingItems);
}

/// The [Events.loadingItems] event handler for updating the request time from the isolate
void _middleLoadingEvent() {
  final double time = bench.endTimer('Load items in separate isolate');
  requestDurations.add(time);
  bench.startTimer('Load items in separate isolate');
}

/// The [Events.endLoadingItems] terminating event handler from the isolate
Future<void> _endLoadingEvents(List<Item> items) async {
  this.items.clear();

  /// Updating data in reactive state
  this.items.addAll(items);

  /// Finishing counting request times
  final double time = bench.endTimer('Load items in separate isolate');
  requestDurations.add(time);
  isLoading = false;
  notifyListeners();

  /// Stop the frame counter
  _stopFpsMeter();
  requestDurations.clear();
}

```

And here you can see the Backend method, with the logic we need:

```
/// Event handler [Events.startLoadingItems]
Future<void> _loadingItems() async {
  _items.clear();
  for (int i = 0; i < 10; i++) {
    _items.addAll(await makeManyRequests(5));
    if (i < (10 - 1)) {
      /// For all requests except the last one - we send only one event
      send(Events.loadingItems);
    } else {
      /// For the last of 10 requests - send a message with data
      send(Events.endLoadingItems, _items);
    }
  }
}

```

Results:

- Average FRT - 11.151ms / 89.68FPS
- Maximum FRT - 11.152ms / 89.67FPS

### Subtotals

After carrying out three experiments on loading the same data set in the application, we get the following results:

Judging by these results, the following conclusions can be drawn:

- Flutter is capable of delivering stable ~ 90FPS
- Making a lot of heavy network requests on the main thread of your application affects its performance - lags appear
- Writing code to run on the main thread is as easy as shelling pears
- Compute allows you to reduce the visibility of lags
- Writing code using Compute has some limitations (pure functions, static methods cannot be passed, no closures, etc.)
- Overhead when using compute by operation time ~ 150–160ms
- Isolate eliminates lags completely
- Writing code using isolates are more difficult and also carries some limitations, which will be discussed later

Let's conduct another experiment to find out for sure which of the methods is optimal for all the parameters under study.

## Experiment number two: local search

Let's imagine that now we need to find certain elements in the loaded data by the value entered into the input. This test is implemented in the following way: there is an input into which 3 substrings of 3 characters are entered character by character from the number of substrings available in the list of items. The number of elements in the array for search has been increased 10 times and is **22730** pieces.

The search was carried out in 2 modes - the primitive presence of the entered string in an element from the list, as well as using the string similarity [algorithm](https://pub.dev/packages/string_similarity).

Also, asynchronous search options - compute / Isolate, do not start until the previous search has completed. It works like this - by entering the first character in the input field, we start the search until it completes - the data will not return to the main thread and the UI is not redrawn, the second character is not entered in the input field. When all actions are completed, the second character is entered and also vice versa. This is analogous to the algorithm when we "save" the characters entered by the user, and then send just one request, instead of sending a request for absolutely every character entered, regardless of how fast they were entered.

Rendering times were measured only when characters were entered into the search, i.e. data preparation operations and anything else did not affect the collected data.

For starters, helper functions, a search function, and other generic code:

```
/// Function for creating a copy of elements
/// used as source for filtering
void cacheItems() {
  _notFilteredItems.clear();
  final List<Item> multipliedItems = [];
  for (int i = 0; i < 10; i++) {
    multipliedItems.addAll(items);
  }
  _notFilteredItems.addAll(multipliedItems);
}

```

```
/// Function that launches a test script
/// for entering characters into a text input
Future<void> _testSearch() async {
  List<String> words = items.map((Item item) => item.profile.replaceAll('https://opencollective.com/', '')).toSet().toList();
  words = words
      .map((String word) {
        final String newWord = word.substring(0, min(word.length, 3));
        return newWord;
      })
      .toSet()
      .take(3)
      .toList();

  /// Start the frame counter
  _startFpsMeter();
  for (String word in words) {
    final List<String> letters = word.split('');
    String search = '';
    for (String letter in letters) {
      search += letter;
      await _setWord(search);
    }
    while (search.isNotEmpty) {
      search = search.substring(0, search.length - 1);
      await _setWord(search);
    }
  }

  /// Stop the frame counter
  _stopFpsMeter();
}

```

```
/// We enter characters with a delay of 800ms,
/// but if the data from the asynchronous filter (computed / isolate)
/// has not yet arrived, then we are waiting for them
Future<void> _setWord(String word) async {
  if (!canPlaceNextLetter) {
    await wait(800);
    await _setWord(word);
  } else {
    searchController.value = TextEditingValue(text: word);
    await wait(800);
  }
}

```

```
/// Depending on the set flag [USE_SIMILARITY]
/// whether or not search with string similarity is used
List<Item> filterItems(Packet2<List<Item>, String> itemsAndInputValue) {
  return itemsAndInputValue.value.where((Item item) {
    return item.profile.contains(itemsAndInputValue.value2) || (USE_SIMILARITY && isStringsSimilar(item.profile, itemsAndInputValue.value2));
  }).toList();
}

bool isStringsSimilar(String first, String second) {
  return max(StringSimilarity.compareTwoStrings(first, second), StringSimilarity.compareTwoStrings(second, first)) >= 0.3);
}

```

### Search in the main thread

```
Future<void> runSearchOnMainThread() async {
  cacheItems();
  isLoading = true;
  notifyListeners();
  searchController.addListener(_searchOnMainThread);
  await _testSearch();
  searchController.removeListener(_searchOnMainThread);
  isLoading = false;
  notifyListeners();
}

void _searchOnMainThread() {
  final String searchValue = searchController.text;
  if (searchValue.isEmpty && items.length != _notFilteredItems.length) {
    items.clear();
    items.addAll(_notFilteredItems);
    notifyListeners();
    return;
  }
  items.clear();

  /// Packet2 - wrapper class for two values
  items.addAll(filterItems(Packet2(_notFilteredItems, searchValue)));
  notifyListeners();
}

```

This is how it looks:

Simple search results:

- Average FRT - 21.588ms / 46.32FPS
- Maximum FRT - 668,986ms / 1.50FPS

Search with similarity results:

- Average FRT - 43,123ms / 23.19FPS
- Maximum FRT - 2 440,910ms / 0.41FPS

### Search with compute()

```
Future<void> runSearchWithCompute() async {
  cacheItems();
  isLoading = true;
  notifyListeners();
  searchController.addListener(_searchWithCompute);
  await _testSearch();
  searchController.removeListener(_searchWithCompute);
  isLoading = false;
  notifyListeners();
}

Future<void> _searchWithCompute() async {
  canPlaceNextLetter = false;

  /// Before starting filtering, set a flag that will signal
  /// that asynchronous filtering is taking place
  isSearching = true;
  notifyListeners();
  final String searchValue = searchController.text;
  if (searchValue.isEmpty && items.length != _notFilteredItems.length) {
    items.clear();
    items.addAll(_notFilteredItems);
    isSearching = false;
    notifyListeners();
    await wait(800);
    canPlaceNextLetter = true;
    return;
  }
  final List<Item> filteredItems = await compute(filterItems, Packet2(_notFilteredItems, searchValue));

  /// After filtering is finished, remove the signal
  isSearching = false;
  notifyListeners();
  await wait(800);
  items.clear();
  items.addAll(filteredItems);
  notifyListeners();
  canPlaceNextLetter = true;
}

```

Some YouTube:

Simple search results:

- Average FRT - 12.682ms / 78.85FPS
- Maximum FRT - 111.544ms / 8.97FPS

Search with similarity results:

- Average FRT - 12.515ms / 79.90FPS
- Maximum FRT - 111,527ms / 8.97FPS

### Search with Isolate

Not a lot of code: Frontend

```
/// Start operation in isolate by sending message
Future<void> runSearchInIsolate() async {
  send(Events.cacheItems);
}

void _middleLoadingEvent() {
  final double time = bench.endTimer('Load items in separate isolate');
  requestDurations.add(time);
  bench.startTimer('Load items in separate isolate');
}

/// This method will called on event [Events.cacheItems], which will sent by Backend
Future<void> _startSearchOnIsolate() async {
  isLoading = true;
  notifyListeners();
  searchController.addListener(_searchInIsolate);
  await _testSearch();
  searchController.removeListener(_searchInIsolate);
  isLoading = false;
  notifyListeners();
}

/// On every input event we send message to Backend
void _searchInIsolate() {
  canPlaceNextLetter = false;
  isSearching = true;
  notifyListeners();
  send(Events.startSearch, searchController.text);
}

/// Writing data from Backend (isolate) to Frontend (reactive state)
Future<void> _setFilteredItems(List<Item> filteredItems) async {
  isSearching = false;
  notifyListeners();
  await wait(800);
  items.clear();
  items.addAll(filteredItems);
  notifyListeners();
  canPlaceNextLetter = true;
}

Future<void> _endLoadingEvents(List<Item> items) async {
  this.items.clear();
  this.items.addAll(items);
  final double time = bench.endTimer('Load items in separate isolate');
  requestDurations.add(time);
  await wait(800);
  isLoading = false;
  notifyListeners();
  _stopFpsMeter();
  print('Load items in isolate ->' + requestDurations.join(' ').replaceAll('.', ','));
  requestDurations.clear();
}

```

And these are the methods that are in the backend that runs in a third-party isolate:

```
/// Handler for event [Events.cacheItems]
void _cacheItems() {
  _notFilteredItems.clear();
  final List<Item> multipliedItems = [];
  for (int i = 0; i < 10; i++) {
    multipliedItems.addAll(_items);
  }
  _notFilteredItems.addAll(multipliedItems);
  send(Events.cacheItems);
}

/// For each event [Events.startSearch] this method is called,
/// filtering elements and sending the filtered to the light state
void _filterItems(String searchValue) {
  if (searchValue.isEmpty) {
    _items.clear();
    _items.addAll(_notFilteredItems);
    send(ThirdEvents.setFilteredItems, _items);
    return;
  }
  final List<Item> filteredItems = filterItems(Packet2(_notFilteredItems, searchValue));
  _items.clear();
  _items.addAll(filteredItems);
  send(Events.setFilteredItems, _items);
}

```

Simple search results:

- Average FRT - 11.354ms / 88.08FPS
- Maximum FRT - 33.455ms / 29.89FPS

Search with similarity:

- Average FRT - 11.353ms / 88.08FPS
- Maximum FRT - 33.459ms / 29.89FPS

### Even more conclusions

It follows from this tablet and previous research that:

- The main thread should not be used for operations >16ms (to provide at least 60FPS)
- Compute is technically suitable for frequent and heavy operations, but imposes an overhead of the same 150ms, and also has more unstable performance compared to the permanent isolate (this is probably due to the fact that every time it opens, and, after the operation is completed, the isolate is closed , which also requires resources)
- Isolate is the hardest way to code for maximum performance in a Flutter application

## Isolator

Well, it seems that isolates are the ideal way to achieve the result, and even Google advises using them for all heavy operations (this is for a word of mouth, I haven't found any proofs). But you have to write a lot of code. In fact, everything that is written above is the result achieved using the library presented at the very beginning, without it - you will have to write much, much more. In addition, this search algorithm can be optimized - after filtering all elements, send only a small portion of data to the front - this will take less resources, and after its transfer, send everything else. Or sending data by chunks.

I also experimented with the bandwidth of the communication channel between isolates. To evaluate it, the following entities were used:

```
class Item {
  const Item(
    this.id,
    this.createdAt,
    this.profile,
    this.imageUrl,
  );

  final int id;
  final DateTime createdAt;
  final String profile;
  final String imageUrl;
}

```

And it turned out the following - with the simultaneous transfer of 5000 elements, the time it takes to copy the data does not affect the UI, i.e. the rendering frequency is not reduced. 1,000,000 of these elements were transferred in batches of 5,000 at a time with a forced pause between the transmission of bursts of 8ms, through Future.delayed, while the frame rate did not drop below 80FPS. Unfortunately, I did this experiment long before writing this article and there are no dry numbers (if there is a request, they will appear).

Many may find it difficult or unnecessary to deal with isolates, and people stop at compute. Here another functionality of this package can come to the rescue, which equates the API to the simplicity of compute, and as a result, it gives much more possibilities.

Here's an example:

```
/// Frontend part
Future<void> decrement([int diff = 1]) async {
  counter = await runBackendMethod<int, int>(Events.decrement, diff);
}

/// -----

/// Backend part
Future<int> _decrement(int diff) async {
  counter -= diff;
  return counter;
}

```

Thanks to this approach, you can simply call the backend function by the ID that this function corresponds to. ID matching to the method is specified in predefined getters:

```
/// Frontend part
/// This block is responsible for handling events from the isolate.
@override
Map<Events, Function> get tasks => {
      Events.increment: _setCounter,
      Events.decrement: _setCounter,
      Events.error: _setCounter,
    };

/// -----

/// Backend part
/// And this one is for handling events from the main thread
@override
Map<Events, Function> get operations => {
      Events.increment: _increment,
      Events.decrement: _decrement,
    };

```

Thus, we get two ways of interaction:

1. **Asynchronous communication through explicit messaging**

`Frontend` sends an event to the `Backend` using the send method, passing the event ID and an optional argument in the message.

```
enum Events {
  increment,
}

class FirstState with Frontend<Events> {
  int counter = 0;

  void increment([int diff = 1]) {
    send(Events.increment, diff);
  }

  void _setCounter(int value) {
    counter = value;
    notifyListeners();
  }

  @override
  Map<Events, Function> get tasks => {
    Events.increment: _setCounter,
  };
}

```

This message is passed to the backend and processed there.

```
class FirstBackend extends Backend<Events, void> {
  FirstBackend(BackendArgument<void> argument) : super(argument);

  int counter = 0;

  void _increment(int diff) {
    counter += diff;
    send(Events.increment, counter);
  }

  @override
  Map<Events, Function> get operations => {
    Events.increment: _increment,
  };
}

```

`Backend` returns the result to the `Frontend` and you're done! There are two ways to return the result - by returning a response using the backend method (return) (then the response will be sent with the same message ID as it was received), and the second is to explicitly call the send method. In this case, you can send any messages to the reactive state with any ID you specify. The main thing is that the handler methods are set by these IDs.

Schematically, the first way looks like this:

Yellow double-sided arrow - interaction with any services from outside, for example, a certain server. And purple, going from server to back - these are incoming messages from the same server, for example - WebSocket.

1. **_Synchronous_ communication by calling the backend function by its ID**

`Frontend` uses the `runBackendMethod` method, specifying an ID to call the `Backend` method corresponding to it, getting the response right there. In this way, it is not even necessary to specify anything in the tasks list of your front. At the same time, as shown in the code below, you can override the `onBackendResponse` method in your front, which is called every time your front-state receives messages from the `Backend`.

```
enum Events {
  decrement,
}

class FirstState with ChangeNotifier, Frontend<Events> {
  int counter = 0;

  Future<void> decrement([int diff = 1]) async {
    counter = await runBackendMethod<int, int>(Events.decrement, diff);
  }

  /// Automatically notification after any event from backend
  @override
  void onBackendResponse() {
    notifyListeners();
  }
}

```

The backend method processes the incoming event and simply returns the result. In this case, there is one limitation - back methods called "synchronously" should not call the send method with the same ID they correspond to. In this example, the \_decrement method should not call the send (`Events.decrement`) method. At the same time, he can send any other messages.

```
class FirstBackend extends Backend<Events, void> {
  FirstBackend(BackendArgument<void> argument) : super(argument);

  int counter = 0;

  /// Or, you can simply return a value
  Future<int> _decrement(int diff) async {
    counter -= diff;
    return counter;
  }

  @override
  Map<Events, Function> get operations => {
    Events.decrement: _decrement,
  };
}

```

Схема второго способа похожа на первый, за тем исключением, что во фронте вам не нужно писать обработчики событий, прилетающих с бэка. (_Im terrible sorry, I am translating my article from russian, and it looks like the translator broke at the most inopportune moment_ 😣)

_Soon, in version 0.0.5, this feature will work and in backward - you can run Frontend's tasks in synchronous mode from its Backend._

### What else to add…

To use such a bundle, you need to create these backends. For this, `Frontend<EventType>` has a backend creation mechanism - the `initBackend` method. In this method, you need to pass a factory function to create the backend. It should be a pure top-level function (top-level, as the Flutter documentation says), or a static class method. The time to create one isolate is about 200ms.

```
enum Events {
  increment,
  decrement,
}

class FirstState with ChangeNotifier, Frontend<Events> {
  int counter = 0;

  void increment([int diff = 1]) {
    send(Events.increment, diff);
  }

  Future<void> decrement([int diff = 1]) async {
    counter = await runBackendMethod<int, int>(Events.decrement, diff);
  }

  void _setCounter(int value) {
    counter = value;
  }

  Future<void> initState() async {
    await initBackend(createFirstBackend);
  }

  /// Automatically notification after any event from backend
  @override
  void onBackendResponse() {
    notifyListeners();
  }

  @override
  Map<Events, Function> get tasks => {
    Events.increment: _setCounter,
  };
}

```

An example of a backend-part creator function:

```
typedef Creator<TDataType> = void Function(BackendArgument<TDataType> argument);

void createFirstBackend(BackendArgument<void> argument) {
  FirstBackend(argument.toFrontend);
}

@protected
Future<void> initBackend<TDataType extends Object>(Creator<TDataType> creator, {TDataType data, ErrorHandler errorHandler}) async {
  /// ...
}

```

### Limitations

- Everything is the same as a regular isolate
- For each "Backend" being created, its own isolate is currently being created, and if there are too many backends, the time of their creation becomes noticeable, especially if you initialize all of them, say, when the application is loaded. I experimented with running 30 backends at the same time - the boot time on the above phone in - release mode took over 6 seconds.
- There are some difficulties in handling errors that occur in isolates (backends). Here, if you are interested in this package, you should familiarize yourself with the initBackend method from Frontend in more detail.
- The complexity of writing the code is higher compared to storing logic only in the main thread

### Checklist for use

Everything is simple here, you do not need to use isolates (either separately or using this package) if:

- The performance of your application does not degrade under various operations
- For bottlenecks, compute is enough
- You don't want to deal with isolates
- The life cycle of your application is so short that there is no point in optimizing it

Otherwise, you can turn your attention to this approach and a [package](https://pub.dev/packages/isolator) (called Isolator) that will simplify your work with isolates.

All examples from this article are available on [Github](https://github.com/alphamikle/isolator/tree/master/example).
