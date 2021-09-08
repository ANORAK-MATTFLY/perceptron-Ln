---
title: "Master Objects in JS 🍨 (Part 3)"
date: 2021-06-16T05:35:07.322Z
filePath: "_posts/Master Objects in JS 🍨 (Part 3).md"
slug: "Master Objects in JS 🍨 (Part 3)"
---

# Master Objects in JS 🍨 (Part 3)

## Make your Constructors new-Agnostic 🏗️

When you create a constructor such as the User function in Item 30, you rely on callers to remember to call it with the new operator. Notice how the function assumes that the receiver is a brand-new object:

```javascript
function User(name, passwordHash) {
  this.name = name;
  this.passwordHash = passwordHash;
}
```

If a caller forgets the new keyword, then the function’s receiver  
becomes the global object:

```javascript
var u = User("baravelli", "d8b74df393528d51cd19980ae0aa028e");
u; // undefined
this.name; // "baravelli"
this.passwordHash; // "d8b74df393528d51cd19980ae0aa028e"
```

> Not only does the function uselessly return undefined, it also disas-
> trously creates (or modifies, if they happen to exist already) the global
> variables name and passwordHash.

If the User function is defined as ES5 strict code, then the receiver  
defaults to undefined:

```javascript
function User(name, passwordHash) {
  "use strict";
  this.name = name;
  this.passwordHash = passwordHash;
}
var u = User("baravelli", "d8b74df393528d51cd19980ae0aa028e");
// error: this is undefined
```

> In this case, the faulty call leads to an immediate error: The first line
> of User attempts to assign to this.name, which throws a TypeError. So,
> at least with a strict constructor function, the caller can quickly dis-
> cover the bug and fix it.

Still, in either case, the User function is fragile. When used with new
it works as expected, but when used as a normal function it fails. A
more robust approach is to provide a function that works as a con-
structor no matter how it’s called. An easy way to implement this is to
check that the receiver value is a proper instance of User:

```javascript
function User(name, passwordHash) {
  if (!(this instanceof User)) {
    return new User(name, passwordHash);
  }
  this.name = name;
  this.passwordHash = passwordHash;
}
```

This way, the result of calling User is an object that inherits from `User.prototype`, regardless of whether it’s called as a function or as a constructor:

```javascript
let x = User("baravelli", "d8b74df393528d51cd19980ae0aa028e");
let y = new User("baravelli", "d8b74df393528d51cd19980ae0aa028e");
x instanceof User; // true
y instanceof User; // true
```

One downside to this pattern is that it requires an extra function call, so it is a bit more expensive. It’s also hard to use for variadi c functions, since there is no straightforward analog to the apply method for calling variadic functions as constructors. A somewhat more exotic approach makes use of **ES5**’s `Object.create`:

```javascript
function User(name, passwordHash) {
  let self = this instanceof User ? this : Object.create(User.prototype);
  self.name = name;
  self.passwordHash = passwordHash;
  return self;
}
```

> `Object.create` takes a prototype object and returns a new object that inherits from it. So when this version of User is called as a function, the result is a new **object** inheriting from `User.prototype`, with the name and passwordHash properties initialized.

While Object.create is only available in ES5, it can be approximated
in older environments by creating a local constructor and instantiat-
ing it with new:

```javascript
if (typeof Object.create === "undefined") {
  Object.create = function (prototype) {
    function C() {}
    C.prototype = prototype;
    return new C();
  };
}
```

> Note that this only implements the **single-argument** version of `Object.create`. The real version also accepts an optional second **argument** that describes a set of **property** descriptors to define on the new **object**.

What happens if someone calls this new version of User with new?
Thanks to the constructor override pattern, it behaves just like it does with a function call. This works because JavaScript allows the result of a new expression to be overridden by an explicit return from a constructor function. When User returns self, the result of the new expression becomes self, which may be a different object from the one bound to this.

Protecting a constructor against misuse may not always be worth the trouble, especially when you are only using a constructor locally.
Still, it’s important to understand how badly things can go wrong if a constructor is called in the wrong way. At the very least, it’s important to document when a constructor function expects to be called with new, especially when sharing it across a large codebase or from a shared library.

## Things to Remember 🧠

1. Make a **constructor** **agnostic** to its caller’s syntax by reinvoking itself with new or with `Object.create`.
2. Document clearly when a function expects to be called with new.

## 🎉🎉🎉 Thank you for reading the third part of this article! 🎉🎉🎉

And if you want more in depth knowledge about your favorite programming languages checkout my personal [blog](https://code-rainbow.web.app/) to become an on demand developer 😉, and you can find me on [twitter](https://twitter.com/JrMatanda) as well😃.
