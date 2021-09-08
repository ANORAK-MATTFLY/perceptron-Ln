---
title: "Master Objects in JS 🍨 (Part 2)"
date: 2021-07-16T05:35:07.322Z
filePath: "_posts/Master Objects in JS 🍨 (Part 2).md"
slug: "Master Objects in JS 🍨 (Part 2)"
---

# Master objects in JS 🍨 (Part 2)

## Objects and Prototypes

Like many **object-oriented** languages, JavaScript provides support for implementation inheritance: the reuse of code or data through a dynamic delegation mechanism. But unlike many conventional languages, **JavaScript**’s inheritance mechanism is based on prototypes rather than classes. For many programmers, **JavaScript** is the first object-oriented language they encounter without classes.

In many languages, every object is an instance of an associated class, which provides code shared between all its instances. **JavaScript**, by contrast, has no built-in notion of classes. Instead, objects inherit from other objects. Every object is associated with some other object, known as its prototype. Working with prototypes can be different from classes, although many concepts from traditional object-oriented languages still carry over.

## Understand the difference between `prototype`, `getPrototypeOf` and `__proto__`

Prototypes involve three separate but related accessors, all of which are named with some variation on the word prototype. This unfortunate overlap naturally leads to quite a bit of confusion. Let’s get straight to the point.

- `C.prototype` is used to establish the **prototype** of **objects** created by new C().
- `Object.getPrototypeOf(obj)` is the standard **ES5** mechanism for retrieving `obj`’s prototype object.
- `obj.__proto__` is a nonstandard mechanism for retrieving `obj`’s **prototype** object

To understand each of these, consider a typical definition of a JavaScript datatype. The User constructor expects to be called with the new operator and takes a name and the hash of a password string and
stores them on its created object.

```javascript
function User(name, passwordHash) {
  this.name = name;
  this.passwordHash = passwordHash;
}

User.prototype.toString = function () {
  return "[User " + this.name + "]";
};

User.prototype.checkPassword = function (password) {
  return hash(password) === this.passwordHash;
};

let u = new User("sfalken", "0ef33ae791068ec64b502d6cb0191387");
```

The User **function** comes with a default **prototype** property, containing an **object** that starts out more or less empty. In this example, we add two methods to the `User.prototype` object: `toString` and `checkPassword.` When we create an instance of User with the new operator, the resultant object u gets the object stored at `User.prototype`
automatically assigned as its **prototype object**. The image below shows a diagram of these objects

Notice the arrow linking the instance object u to the prototype object
`User.prototype`. This link describes the inheritance relationship.
Property lookups start by searching the `object`’s `own properties`; for example, u.name and `u.passwordHash` return the current values of immediate properties of u. Properties not found directly on u are looked up in u’s prototype. Accessing `u.checkPassword`, for example, retrieves a method stored in `User.prototype`.

This leads us to the next item in our list. Whereas the **prototype** property of a constructor function is used to set up the **prototype** relationship of new instances, the ES5 function `Object.getPrototypeOf()` can
be used to retrieve the prototype of an existing object. So, for example, after we create the object u in the example above, we can test:

```javascript
Object.getPrototypeOf(u) === User.prototype; // true
```

[![](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2Fjs%20objects%2FDiagram.png?alt=media&token=80eceac8-d133-4bdd-a776-fb0be71f5525)](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2Fjs%20objects%2FDiagram.png?alt=media&token=80eceac8-d133-4bdd-a776-fb0be71f5525)

> This illustrates the **prototype** relationships for the User **constructor** and
> **instance**.

Some environments produce a nonstandard mechanism for retrieving
the **prototype** of an **object** via a special `__proto__` property. This can
be useful as a stopgap for environments that do not support **ES5**’s `Object.getPrototypeOf`. In such environments, we can similarly test:

```javascript
u.__proto__ === User.prototype; // true
```

A final note about **prototype** relationships: **JavaScript** programmers will often describe User as a class, even though it consists of little more than a function. Classes in JavaScript are essentially the combination of a constructor function (User) and a **prototype** **object** used to share methods between instances of the **class** (`User.prototype`).

[![](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2Fjs%20objects%2Fdiagram2.png?alt=media&token=1b38b56a-86c4-4583-acd3-5377f453690c)](https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2Fjs%20objects%2Fdiagram2.png?alt=media&token=1b38b56a-86c4-4583-acd3-5377f453690c)

> This is a conceptual view of the User “class”.

The image above provides a good way to think about the User **class** conceptually. The User **function** provides a **public constructor** for the class, and `User.prototype` is an internal implementation of the methods shared between instances. Ordinary uses of User and u have no need to access the **prototype** **object** directly.

### Things to Remember 🧠

1. `C.prototype` determines the prototype of objects created by new `C()`.
2. `Object.getPrototypeOf(obj)` is the standard ES5 function for retrieving the **prototype** of an **object**.
3. `obj.__proto__` is a nonstandard mechanism for retrieving the **prototype** of an **object**.
4. A class is a **design pattern** consisting of a **constructor** **function** and
   an associated **prototype**.

## Prefer `Object.getPrototypeOf` to `__proto__` 🦄

**ES5** introduced `Object.getPrototypeOf` as the standard **API** for retrieving an object’s prototype, but only after a number of **JavaScript** engines had long provided the special `__proto__` property for the same purpose. Not all **JavaScript** environments support this extension, however, and those that do are not entirely compatible. Environments differ, for example, on the treatment of objects with a null prototype. In some environments, **proto** is inherited from `Object.prototype`, so an object with a null prototype has no special **proto** property:

```javascript
var empty = Object.create(null); // object with no prototype
"__proto__" in empty; // false (in some environments)
// In  others,  __proto__  is  always  handled  specially,  regardless  of  an object’s state:

var empty = Object.create(null); // object with no prototype
"__proto__" in empty; // true (in some environments
```

Wherever `Object.getPrototypeOf` is available, it is the more standard and portable approach to extracting prototypes. Moreover, the `__proto__` property leads to a number of bugs due to its pollution of
all objects. JavaScript engines that currently support the extension may choose in the future to allow programs to disable it in order to avoid these bugs. Preferring `Object.getPrototypeOf` ensures that code will continue to work even if `__proto__` is disabled.

For **JavaScript** environments that do not provide the **ES5** API, it is easy to implement in terms of `__proto__`:

```javascript
if (typeof Object.getPrototypeOf === "undefined") {
  Object.getPrototypeOf = function (obj) {
    var t = typeof obj;
    if (!obj || (t !== "object" && t !== "function")) {
      throw new TypeError("not an object");
    }
    return obj.__proto__;
  };
}
```

> This implementation is safe to include in ES5 environments, because it avoids installing the function if `Object.getPrototypeOf` already exists.

### Things to Remember 🧠

1. Prefer the standards-compliant `Object.getPrototypeOf` to the non-
   standard `__proto__` property.

2. Implement `Object.getPrototypeOf` in non-ES5 environments that  
   support `__proto__`.

## Never modify `__proto__` 🍕

The special **proto** property provides an additional power that `Object.getPrototypeOf` does not: the ability to modify an **object**’s **prototype** link. While this power may seem innocuous (after all, it’s just another property, right?), it actually has serious implications and should be avoided. The most obvious reason to avoid modifying
`__proto__` is portability: Since not all platforms support the ability to
change an **object**’s **prototype** you simply can’t write portable code that does it.

Another reason to avoid modifying `__proto__` is performance. All modern **JavaScript** engines heavily optimize the act of getting and setting **object** **properties**, since these are some of the most common operations that JavaScript programs perform. These optimizations are built on the engine’s knowledge of the structure of an object. When you change the object’s internal structure, say, by adding or removing properties to the object or an object in its prototype chain, some of these optimizations are invalidated. Modifying `__proto__` actually changes the inheritance structure itself, which is the most destructive change possible. This can invalidate many more optimizations than modifications to ordinary properties.

But the biggest reason to avoid modifying `__proto__` is for maintaining predictable behavior. An object’s prototype chain defines its behavior by determining its set of properties and property values. Modifying an object’s prototype link is like giving it a brain transplant: It swaps the object’s entire inheritance hierarchy. It may be possible to imagine exceptional situations where such an operation could be helpful, but as a matter of basic sanity, an inheritance hierarchy should remain stable.

For creating new objects with a custom prototype link, you can use **ES5**’s `Object.create`. For environments that do not implement ES5, Item 33 provides a portable implementation of `Object.create` that does not rely on `__proto__`.

### Things to Remember 🧠

1. Never modify an object’s `__proto__` property.
2. Use `Object.create` to provide a custom **prototype** for new objects.

## 🎉🎉🎉 Thank you for reading the second part this article! 🎉🎉🎉

### Don't forget to checkout the third part of this serie! 🥳 [Make your Constructors new-Agnostic](<https://code-rainbow.web.app/blog/Master%20Objects%20in%20JS%20%F0%9F%8D%A8%20(Part%203).html>).

And if you want more in depth knowledge about your favorite programming languages checkout my personal [blog](https://code-rainbow.web.app) to become an on demand developer 😉, and you can find me on [twitter](https://twitter.com/JrMatanda) as well😃.
