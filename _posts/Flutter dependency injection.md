---
title: 'Flutter dependency injection'
date: 2020-03-16T05:35:07.322Z
filePath: '_posts/Flutter dependency injection.md'
slug: 'Flutter dependency injection'
---

# Flutter dependency injection


Dependency Injection is a term that is almost familiar to all the developers if you have been working in Java, rails, etc. Let’s go through each step to implement this feature in Flutter using Injector and GetIt packages.

Let’s create a flutter project using the command

> flutter create dependency_injection_demo

Now let’s replace the “***main.dart”*** file with the following contents which is listing the quotes by using a listview.

```
void main() {
  runApp(MyApp());
}class MyApp extends StatelessWidget {
@override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dependency Injection Demo',
      home: MyQuotePage(title: 'Dependency Injection Demo Page'),
    );
  }
}class MyQuotePage extends StatefulWidget {
  MyQuotePage({Key key, this.title}) : super(key: key);  @override
  _MyQuotePageState createState() => _MyQuotePageState();
}class _MyQuotePageState extends State<MyQuotePage> {
  final List _data = [
    {
      "quote": "Simplicity is a great virtue.",
      "author": "Edsger Wybe Dijkstra"
    },
    {
      "quote": "Progress and dont look back.",
      "author": "Michael Nielsen"
    }
  ];  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: Center(
          child: ListView.builder(
            itemCount: _data.length,
            itemBuilder: (context, index) => _quoteItem(_data[index], index),
          ),
        ));
  }  Widget _quoteItem(item, index) {
    return ListTile(
      tileColor: index % 2 == 0 ? Colors.white: Colors.grey.withOpacity(0.1),
      title: Text(
        '"${item["quote"]}"',
      ),
      subtitle: Padding(
        padding: const EdgeInsets.only(top: 10),
        child: Text('- ${item["author"]}',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 10)),
      ),
    );
  }
}
```

Now let’s load the data from the repository. Create a repository named QuoteRepository.

```
class QuoteRepository {
  const QuoteRepository();  List getQuotes() {
    return [
      {
        "quote": "Simplicity is a great virtue.",
        "author": "Edsger Wybe Dijkstra"
      },
      {"quote": "Progress and don't look back.", "author": "Michael Nielsen"}
    ];
  }
}
```

Make some changes in the main file as:

```
QuoteRepository _quoteRepository;
@override
void initState() {
  super.initState();
  _quoteRepository = QuoteRepository();
}@override
Widget build(BuildContext context) {
  final List _data = _quoteRepository.getQuotes();
  return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: ListView.builder(
          itemCount: _data.length,
          itemBuilder: (context, index) => _quoteItem(_data[index], index),
        ),
      ));
}
```

Create the MockQuoteProvider class as:

```
abstract class QuoteApiProvider {
  const QuoteApiProvider();class MockQuoteApiProvider implements QuoteApiProvider {
  const MockQuoteApiProvider();  Future<List> getQuotes() async {
//add some delay to give the feel of api call
await Future.delayed(Duration(seconds: 3));
    return Future.value([
      {
        "quote": "Simplicity is a great virtue.",
        "author": "Edsger Wybe Dijkstra"
      },
      {"quote": "Progress and don't look back.", "author": "Michael Nielsen"}
    ]);
  }
}
```

Here the MockQuoteApiProvider is an implementation of QuoteApiProvider. Later we’ll add another implementation to explore its more features. Make the necessary changes to the QuoteRepository class as:

```
class QuoteRepository {
  final QuoteApiProvider _provider;  const QuoteRepository({provider})
      : _provider = provider ?? const MockQuoteApiProvider();  Future<List> getQuotes() {
    return _provider.getQuotes();
  }
}
```

and also make changes to the main class as:

```
@override
void initState() {
  super.initState();
  _quoteRepository = QuoteRepository();
  _futureQuote = _quoteRepository.getQuotes();
}
@override
Widget build(BuildContext context) {
  return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: FutureBuilder<List>(
            future: _futureQuote,
            builder: (context, AsyncSnapshot<List> snapData) {
              if (snapData.connectionState == ConnectionState.waiting) {
                return Center(child: Text('Please wait its loading...'));
              } else {
                if (snapData.hasError)
                  return Center(child: Text('Error: ${snapData.error}'));
                else
                  return ListView.builder(
                    itemCount: snapData.data.length,
                    itemBuilder: (context, index) =>
                        _quoteItem(snapData.data[index], index),
                  );
              }
            }),
      ));
}
```

Here the **quoteRepository** is the dependency in the **main** class and **quoteApiProvider** is the dependency of the **QuoteRepository** class. Instead of directly instantiating these dependencies, we’ll use dependency injection to instantiate them properly.

Open the **pubspec.yaml** file and add the following dependencies.

```
dependencies:
  ...
  injectable: ^1.0.7
  get_it: ^5.0.6
  json_annotation: ^3.1.1dev_dependencies:
  ...
  injectable_generator: ^1.0.6
  build_runner: ^1.10.6
  json_serializable: ^3.5.0
```

Let’s make some changes so that the implementation becomes easier. First, let’s generate the Quote and QuoteList using JSON serialization. The file should be as:

```
import 'package:flutter/cupertino.dart';
import 'package:json_annotation/json_annotation.dart';@immutable
@JsonSerializable()
class Quote {
  final String quote;
  final String author;
  final String lang;
  final List<String> tags;  factory Quote.fromJson(Map<String, dynamic> json) =>
      _$QuoteFromJson(json);  Map<String, dynamic> toJson() => _$QuoteToJson(this);
}@JsonSerializable()
class QuoteList {
  final List<Quote> quotes;  factory QuoteList.fromJson(Map<String, dynamic> json) =>
      _$QuoteListFromJson(json);  Map<String, dynamic> toJson() => _$QuoteListToJson(this);
}
```

Second, create the config file for the injector and add the following contents:

```
import 'package:dependency_injection_demo/config/injectable.config.dart';
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
final getIt = GetIt.instance;@injectableInit
GetIt configureDependencies() => $initGetIt(getIt);
```

Now run “***flutter packages pub run build_runner build”*** to generate the necessary missing files. Also, add the following in the main class:

```
...
void main() {
WidgetsFlutterBinding.ensureInitialized();
configureDependencies();
  runApp(MyApp());
}
...
```

We can use three types of annotations — @injectable, @singleton, and @lazySingleton.

Let’s add @injectable annotation to **QuoteRepository** and @singleton to **MockQuoteApiProvider**. Since **MockQuoteApiProvider** is the implementation of **QuoteApiProvider,** we must use **@Singleton(as QuoteApiProvider)**. Hence the respective classes become:

```
@injectable
class QuoteRepository {
  final QuoteApiProvider _provider;  const QuoteRepository({QuoteApiProvider provider})
      : _provider = provider;  Future<List> getQuotes() {
    return _provider.getQuotes();
  }
}
```

and

```
@Singleton(as: QuoteApiProvider)
class MockQuoteApiProvider implements QuoteApiProvider {
  const MockQuoteApiProvider();  Future<List<Quote>> getQuotes() async {
//add some delay to give the feel of api call
await Future.delayed(Duration(seconds: 3));
    return Future.value([
      Quote(quote: "Simplicity is a great virtue.", author: "Edsger Wybe Dijkstra"),
      Quote(quote: "Progress and don't look back.", author: "Michael Nielsen")
    ]);
  }
}
```

> Note: We must run ‘flutter packages pub run build_runner build’ whenever we make changes to these files to regenerate the necessary files to accommodate the changes. Add the additional flag — delete-conflicting-outputs if you run into the error. So the full code becomes ‘flutter packages pub run build_runner build — delete-conflicting-outputs’

Finally in the **main** class:

```
@override
void initState() {
  super.initState();
  _quoteRepository = GetIt.instance.get<QuoteRepository>();
  _futureQuote = _quoteRepository.getQuotes();
}
```

We have successfully injected the two dependencies into our quote app. Let’s implement another implementation for QuoteApiProvider which will act as a real(but also a mock) production provider.

```
@Singleton(as: QuoteApiProvider)
class RealQuoteApiProvider implements QuoteApiProvider {
  const RealQuoteApiProvider();  Future<List<Quote>> getQuotes() async {
//add some delay to give the feel of api callawait Future.delayed(Duration(seconds: 3));
    return Future.value([
      Quote(quote: "Simplicity is a great virtue from production.", author: "Edsger Wybe Dijkstra"),
      Quote(quote: "Progress and don't look back.", author: "Michael Nielsen")
    ]);
  }
}
```

> Here if we run ‘flutter packages pub run build_runner build — delete-conflicting-outputs’ we’ll run into an issue reason being we have two non-named implementations for QuoteApiProvider. To solve this issue we have to name one of them using @Named annotation.

```
...
@Named("prod")
@Singleton(as: QuoteApiProvider)
class RealQuoteApiProvider implements QuoteApiProvider {
  const RealQuoteApiProvider();  Future<List<Quote>> getQuotes() async {
...
```

Now we are all set. We just have to use the named parameter in the QuoteRepository to switch between **RealQuoteApiProvider** or **MockQuoteApiProvider** depending on the requirements.

```
...
//to useRealQuoteApiProvider
@injectable
class QuoteRepository {
  final QuoteApiProvider _provider;  const QuoteRepository({@Named("prod") QuoteApiProvider provider})
      : _provider = provider;
......
//to useMockQuoteApiProvider
@injectable
class QuoteRepository {
  final QuoteApiProvider _provider;  const QuoteRepository({QuoteApiProvider provider})
      : _provider = provider;
...
```

> We also can pass the parameters to the injectors by using @factoryParam annotation. Let’s create a variable named env and declare it as @factoryParam in QuoteRepository.

```
@injectable
class QuoteRepository {
  final QuoteApiProvider _provider;
  final String _env;  const QuoteRepository(
      {@Named("prod") QuoteApiProvider provider, @factoryParam env})
      : _env = env,
        _provider = provider;  Future<List> getQuotes() {
    return _provider.getQuotes(_env);
  }
}
```

Also, make changes in provider files:

```
@Named("prod")
@Singleton(as: QuoteApiProvider)
class RealQuoteApiProvider implements QuoteApiProvider {
  const RealQuoteApiProvider();  Future<List<Quote>> getQuotes(String env) async {
//add some delay to give the feel of api callawait Future.delayed(Duration(seconds: 3));
    return Future.value([
      Quote(quote: "Simplicity is a great virtue from production - $env.", author: "Edsger Wybe Dijkstra"),
      Quote(quote: "Progress and don't look back.", author: "Michael Nielsen")
    ]);
  }
}
```

and in the main file:

```
@override
void initState() {
  super.initState();
  _quoteRepository = GetIt.instance.get<QuoteRepository>(param1: "testing");
  _futureQuote = _quoteRepository.getQuotes();
}
```

> Note: We have to specifically use the named parameter param1(and param2 if we have to use 2 parameters). We cannot use more than 2 parameters and if for some reason we have to use more than 2 parameters then we have to use maps.

# Type of declaration

## @injectable — Factory method

This declaration allows dependencies to instantiate a new class whenever the corresponding invocation is called.

## @singleton

This declaration allows dependencies to be singleton i.e. limiting its instantiation to only one.

## @lazySingleton

This is also similar to singleton except it is only created when it is really required by the code.

You can click the [link](https://github.com/Mhsanjib/flutter_dependency_injection) for the full code.

#flutter, #di, #injectable, #get_it, #future_builder, #providers