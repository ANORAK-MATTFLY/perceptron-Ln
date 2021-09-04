---
title: "Master Objects in JS 🍨 (Part 1)"
date: 2020-03-16T05:35:07.322Z
filePath: "_posts/Master Objects in JS 🍨 (Part 1).md"
slug: "Master Objects in JS 🍨 (Part 1)"
---

# Master Objects in JS 🍨 (Part 1)

## Objects

_Objects are JavaScript’s fundamental data structure. Intuitively, an object represents a table relating strings to values. But when you dig deeper, there is a fair amount of machinery that goes into objects._

Most strongly typed languages such as Java use `isEquals()` to check whether two objects
are the same. You may be tempted to simply use the `==` operator to check whether two
objects are the same in JavaScript.
However, this will not evaluate to true.

```javascript
let firstEmptyObject = {};
let secondEmptyObject = {};

firstEmptyObject == secondEmptyObject; // returns false
firstEmptyObject === secondEmptyObject; // returns false
```

Although these objects are equivalent (same properties and values), they are not
equal. Namely, the variables have different addresses in memory.
This is why most JavaScript applications use utility libraries such as `lodash` or
`underscore`, which have the `isEqual(object1, object2)` function to check two objects
or values strictly. This occurs via implementation of some property-based equality
checking where each property of the object is compared.
In this example, each property is compared to achieve an accurate object equality result.

```javascript
let personOne = {
  name: "Will",
  lastName: "Owen",
};

let personTwo = {
  name: "Will",
  lastName: "Owen",
};

const getPropertiesNameOf = (object) => Object.getOwnPropertyNames(object);

function equivalenceCheck(objectOne, objectTwo) {
  // Initially set to false then will eventually switch to true if the check is successful
  let isEqual = false;

  // Get all propreties of the objectOne param
  let objectOneProperties = getPropertiesNameOf(objectOne);

  // Get the length of both objects
  let objectOneLength = getPropertiesNameOf(objectOne).length;
  let objectTwoLength = getPropertiesNameOf(objectTwo).length;

  // check if the objects are the same length if they are not then we just return false
  if (objectOneLength != objectTwoLength) {
    return false;
  }

  // Check if the objects are the same values if this is not the case then we return false
  objectOneProperties.forEach((property, index) => {
    let propName = objectOneProperties[index];
    if (objectOne[propName] == objectTwo[propName]) {
      isEqual = true;
    } else {
      isEqual = false;
    }
  });

  return isEqual;
}
```

However, this would still work for objects that have only a string or a number as the
property.

```javascript
let obj1 = { prop1: "test", prop2: function () {} };
let obj2 = { prop1: "test", prop2: function () {} };
equivalenceCheck(obj1, obj2); // returns false
```

This is because functions and arrays cannot simply use the == operator to check for
equality.

```javascript
let function1 = function () {
  console.log(2);
};
let function2 = function () {
  console.log(2);
};
console.log(function1 == function2); // prints 'false'
```

Although the two functions perform the same operation, the functions have  
different addresses in memory, and therefore the equality operator returns false.
The primitive equality check operators, == and ===, can be used only for strings and
numbers. To implement an equivalence check for objects, each property in the object
needs to be checked.

Now let dig a little bit deeper 😋.

## Freezing an object 🥶

The first thing you need to know about objects in JavaScript is that they are mutable (meaning they can be changed). That flexibility it one the most powerful things about JavaScript! 🤩 However in order to make your code more robust 💪

you sometimes need to create objects that are immutable, for example perhaps you use an object to keep track of data that are constant and need to remain constant, in a case like that you need to freeze the object to prevent it from being changed.

Another common application is in functional programming using such a of paradigm you want to avoid mutating data. let's look at an example of how to freeze an object.

```javascript
let courseInfo = {
  question: 10,
  possScore: 100,
  active: true,
  startPage: "./page1.html",
};
```

Now let say you want to modify the `courseInfo` object, you would write something like this.

```javascript
delete courseInfo.possScore;
console.log(courseInfo); // {question: 10, active: true, startPage: "./page1.html"};
```

As you can see we can't access the `possScore` property anymore as we deleted it, But let's look at how we would prevent that from happening.

```javascript
const courseInfo = Object.freeze({
  question: 10,
  possScore: 100,
  active: true,
  startPage: "./page1.html",
}); // Our object is now freezed!🥶
```

Let's do a step by step analysis.

step 1. We changed `courseInfo` variable from let to a constant variable because we don't want it to be reassigned either.

step 2. We make use of the `Object.freeze` static method to prevent all the properties and values of the object from being changed.

But now how do we check if our `courseInfo` is actually frozen? Well you can try to delete or add new things to it but one simple way of doing is to use the `isFrozen` method like so.

```javascript
console.log(Object.isFrozen(courseInfo)); // This returns true 😉
```

## Create a copy of an object 🧪

One of the problems JavaScript developers usually faces when working with objects is creating a copy of them. This happens because they try to assign the variable that they want to assign a variable X to a variable Y thinking that this would help them in anyway, but the truth is by doing so, we are just using a reference to the original object, as the result when ever the original object is modified the so called "copy" will change as well.

A simple and efficient way of achieving that task is making use of both the `JSON.parse()` and `JSON.stringify()` methods like so.

```javascript
let courseInfo = {
  question: 10,
  possScore: 100,
  active: true,
  startPage: "./page1.html",
};
// Create a copy of the courseInfo object
let copyOfCourseInfo = JSON.parse(JSON.stringify(courseInfo));

// Modify the original object
delete courseInfo.question;

console.log(courseInfo); // {possScore: 100, active: true, startPage: "./page1.html"};

console.log(courseInfo); // {question: 10, possScore: 100, active: true, startPage: "./page1.html"};
```

## 🎉🎉🎉 Thank you for reading the first part this article! 🎉🎉🎉

## Don't forget to checkout the second part of this serie because we dig even deeper 🥳! (JS Objects and Prototypes).

And if you want more in depth knowledge about your favorite languages checkout my personal [blog](https://code-rainbow.vercel.app/) to become an on demand developer 😉, and you can find me on [twitter](https://twitter.com/JrMatanda) as well😃.
