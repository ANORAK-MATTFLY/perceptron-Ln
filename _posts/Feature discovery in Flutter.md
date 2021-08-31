---
title: 'Feature discovery in Flutter'
date: 2020-03-16T05:35:07.322Z
filePath: '_posts/Feature discovery in Flutter.md'
slug: 'Feature discovery in Flutter'
---



# Feature discovery in Flutter


Feature Discovery In Flutter

Hello friends, I will talk about my new blog on . we will explore the **Feature Discovery In flutter** using the **[feature_discovery_package](https://pub.dev/packages/feature_discovery)**. With the help of the package, we can easily achieve the flutter feature discovery. So let’s get started.

> Table of Contents :

> FlutterFeature DiscoveryCode ImplementationCode FileConclusion

# Flutter :

> “ Flutter is Google’s UI toolkit that helps you build beautiful and natively combined applications for mobile, web, and desktop in a single codebase in record time, Flutter offers great developer tools, with amazing hot reload”

# Feature Discovery :

The Feature Discovery Package animated implements feature discovery following custom design guidelines, in this, we can use any widget within feature discovery, we use it to introduce the user to a feature about which they wouldn’t you know.

> Demo Module :

# Implementation :

**Step 1: Add the dependencies**

**dependencies :**

```
dependencies:
feature_discovery: ^0.13.0+2
```

**Step 2: Importing**

```
import 'package:feature_discovery/feature_discovery.dart';
```

**Step 3:** **Run flutter package get**

# Code Implementation :

> Create a new dart file called flutter__zoom_drawer_demo.dart inside the libfolder.

First of all, we have to wrap our widget tree in the feature discovery widget and inside it, we will add any class or material to the child widget.

```
FeatureDiscovery(
  recordStepsInSharedPreferences:false,
  child: FeatureDiscoveryDemoApp(),
),
```

Now we will implement FeatureDiscovery.discoverFeature inside the **initState()** method in which we will give the feature’s id so that the user taps the first feature then it will be sent to the next feature.

```
@override
voidinitState() {
  WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
    FeatureDiscovery.discoverFeatures(context,
        <String>[
'feature1',
'feature2',
'feature3',
'feature4',
        ]
    );
  });
super.initState();
}
```

Now we will discuss DescribedFeatureOverlay () widget. This widget takes all the parameters for an overlay displayed during feature search that will display the overlay as its child. This will pass a feature ID inside it which is of string type using the ID. So that we can know which feature is shown on this screen, we have defined feature1, first of all, we will see this feature.

```
DescribedFeatureOverlay(
  featureId:'feature1',
  targetColor: Colors.white,
  textColor: Colors.black,
  backgroundColor: Colors.red.shade100,
  contentLocation: ContentLocation.trivial,
  title: Text(
'This is Button',
    style: TextStyle(fontSize: 20.0),
  ),
  pulseDuration: Duration(seconds: 1),
  enablePulsingAnimation:true,
  overflowMode: OverflowMode.extendBackground,
  openDuration: Duration(seconds: 1),
  description: Text('This is Button you can\n add more details heres'),
  tapTarget: Icon(Icons.navigation),
  child: BottomNavigationBar(items: [
    BottomNavigationBarItem(title: Text('Home'), icon: Icon(Icons.home)),
    BottomNavigationBarItem(
        title: Text('Notification'),
        icon: Icon(Icons.notifications_active)),
  ]),
),
```

When we run the application, we ought to get the screen’s output like the underneath screen capture.

[![](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FFeature%20discovery%20in%20Flutter%2F1gwtofbbJKYlyxxxxxDXaDA.png?alt=media&token=3baa180b-77a4-4388-adc6-21360d8dec15)](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FFeature%20discovery%20in%20Flutter%2F1gwtofbbJKYlyxxxxxDXaDA.png?alt=media&token=3baa180b-77a4-4388-adc6-21360d8dec15)

In this screen, we have defined the featureId2 inside the **DescribedFeatureOverlay()** widget, in which it defines its title background color and description etc.

```
DescribedFeatureOverlay(
    featureId:'feature2',
    targetColor: Colors.white,
    textColor: Colors.white,
    backgroundColor: Colors.blue,
    contentLocation: ContentLocation.below,
    title: Text(
'Menu Icon',
      style: TextStyle(fontSize: 20.0),
    ),
    pulseDuration: Duration(seconds: 1),
    enablePulsingAnimation:true,
    overflowMode: OverflowMode.clipContent,
    openDuration: Duration(seconds: 1),
    description: Text(
'This is Button you can add more details heres\n New Info here add more!'),
    tapTarget: Icon(Icons.menu),

```

When we run the application, we ought to get the screen’s output like the underneath screen capture.

[![](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FFeature%20discovery%20in%20Flutter%2F1GvGPDhY0Toighyl3ymAWIA.png?alt=media&token=90f33050-5902-4c78-995a-3c1dba245b89)](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FFeature%20discovery%20in%20Flutter%2F1GvGPDhY0Toighyl3ymAWIA.png?alt=media&token=90f33050-5902-4c78-995a-3c1dba245b89)

In this screen, we have defined the featureId3 inside the **DescribedFeatureOverlay()** widget, in which it defines its title background color and description etc.

```
DescribedFeatureOverlay(
  featureId:'feature3',
  targetColor: Colors.white,
  textColor: Colors.black,
  backgroundColor: Colors.amber,
  contentLocation: ContentLocation.trivial,
  title: Text(
'More Icon',
    style: TextStyle(fontSize: 20.0),
  ),
  pulseDuration: Duration(seconds: 1),
  enablePulsingAnimation:true,
  barrierDismissible:false,
  overflowMode: OverflowMode.wrapBackground,
  openDuration: Duration(seconds: 1),
  description: Text('This is Button you can add more details heres'),
  tapTarget: Icon(Icons.search),
  child: IconButton(icon: Icon(Icons.search), onPressed: () {}),
  onOpen: ()async{
return true;
  },
),
```

When we run the application, we ought to get the screen’s output like the underneath screen capture.

[![](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FFeature%20discovery%20in%20Flutter%2F1uOYQSZNLR8K7I6qeHJOdiA.png?alt=media&token=5ec6442a-6740-43b8-b677-eaf87f004cad)](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FFeature%20discovery%20in%20Flutter%2F1uOYQSZNLR8K7I6qeHJOdiA.png?alt=media&token=5ec6442a-6740-43b8-b677-eaf87f004cad)

# Code File:

```
import 'package:flutter/material.dart';
import 'package:feature_discovery/feature_discovery.dart';

classFeatureDiscoveryDemoextendsStatelessWidget {
  @override
  Widget build(BuildContext context) {
returnMaterialApp(
      debugShowCheckedModeBanner:false,
      home: FeatureDiscovery(
        recordStepsInSharedPreferences:false,
        child: FeatureDiscoveryDemoApp(),
      ),
    );
  }
}

classFeatureDiscoveryDemoAppextendsStatefulWidget {
  @override
  _FeatureDiscoveryDemoAppState createState() =>
      _FeatureDiscoveryDemoAppState();
}

class_FeatureDiscoveryDemoAppStateextendsState<FeatureDiscoveryDemoApp> {
  @override
voidinitState() {
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      FeatureDiscovery.discoverFeatures(context, <String>[
'feature1',
'feature2',
'feature3',
'feature4',
      ]);
    });
super.initState();
  }

  @override
  Widget build(BuildContext context) {
returnScaffold(
      appBar: AppBar(
        leading: DescribedFeatureOverlay(
            featureId:'feature2',
            targetColor: Colors.white,
            textColor: Colors.white,
            backgroundColor: Colors.blue,
            contentLocation: ContentLocation.below,
            title: Text(
'Menu Icon',
              style: TextStyle(fontSize: 20.0),
            ),
            pulseDuration: Duration(seconds: 1),
            enablePulsingAnimation:true,
            overflowMode: OverflowMode.clipContent,
            openDuration: Duration(seconds: 1),
            description: Text(
'This is Button you can add more details heres\n New Info here add more!'),
            tapTarget: Icon(Icons.menu),
            child: IconButton(icon: Icon(Icons.menu), onPressed: () {})),
        title: Text('Feature Discovery Demo'),
        centerTitle:true,
        actions: [
          DescribedFeatureOverlay(
            featureId:'feature3',
            targetColor: Colors.white,
            textColor: Colors.black,
            backgroundColor: Colors.amber,
            contentLocation: ContentLocation.trivial,
            title: Text(
'More Icon',
              style: TextStyle(fontSize: 20.0),
            ),
            pulseDuration: Duration(seconds: 1),
            enablePulsingAnimation:true,
            barrierDismissible:false,
            overflowMode: OverflowMode.wrapBackground,
            openDuration: Duration(seconds: 1),
            description: Text('This is Button you can add more details heres'),
            tapTarget: Icon(Icons.search),
            child: IconButton(icon: Icon(Icons.search), onPressed: () {}),
            onOpen: ()async{
return true;
            },
          ),
        ],
      ),
      bottomNavigationBar: DescribedFeatureOverlay(
        featureId:'feature1',
        targetColor: Colors.white,
        textColor: Colors.black,
        backgroundColor: Colors.red.shade100,
        contentLocation: ContentLocation.trivial,
        title: Text(
'This is Button',
          style: TextStyle(fontSize: 20.0),
        ),
        pulseDuration: Duration(seconds: 1),
        enablePulsingAnimation:true,
        overflowMode: OverflowMode.extendBackground,
        openDuration: Duration(seconds: 1),
        description: Text('This is Button you can\n add more details heres'),
        tapTarget: Icon(Icons.navigation),
        child: BottomNavigationBar(items: [
          BottomNavigationBarItem(title: Text('Home'), icon: Icon(Icons.home)),
          BottomNavigationBarItem(
              title: Text('Notification'),
              icon: Icon(Icons.notifications_active)),
        ]),
      ),
    );
  }
}
```

# Conclusion:

In this flutter article, I have explained a **Feature Discovery** in a flutter, which you can modify and experiment with according to your own, this little introduction was from the Feature Discovery demo from our side.

I hope this blog will provide you with sufficient information in Trying up the Feature Discovery in your flutter project. We will show you the Feature Discovery is?, and work on it in your flutter applications, So please try it.

❤ ❤ Thanks for reading this article ❤❤