---
title: Perfecting the Art of Perfection
date: "2017-12-06T23:46:37.121Z"
template: "post"
draft: false
slug: "/posts/inheritance-pt-1/"
category: "OOJS"
tags:
  - "OOP"
  - "JavaScript"
description: "Let's take a brief look at prototypal inheritance with JavaScript."
---
Although you can build software using an object-oriented style with JavaScript, there are some core differences between the inheritance model in JavaScript versus OOP-specific languages, e.g., Java, C#. To share functionality between objects, traditional OOP languages utilize _classical inheritance_ as their inheritance model, while JavaScript uses _prototype-based inheritance_.

Classical Inheritance revolves around using classes as a blueprint to create new objects. In other words, classes are a template that describe what values and functionality is available within objects that are instantiated from a class. To create an object in a classical OOP language, you _must_ instantiate a class! For example, if you have a Car class and wanted to create a new object that encapsulates information about your car, you would need to instantiate the Car class.

```Java
class Car {
  // properties and methods go here
}

// myCar is an instance of Car class.
var myCar = new Car();
```

Prototypal inheritance allows you more flexibility by enabling you to instantiate new objects based on other objects. There is no concept of a class (at least in a traditional sense). Instead of a class, _constructor functions_ are used to create new objects with specified values and functionality.

```javascript
const Car = function(make, model, year) {
  this.make = make
  this.model = model
  this.year = year
}

const myCar = new Car('Honda', 'Civic', 2016)
console.log(myCar.make) // 'Honda'
console.log(myCar.year) // 2016
```

By convention, constructor functions are given an uppercase name. However, a constructor will serve its purpose, even if it is not capitalized.

Now, let's talk about what makes JavaScript special.

## The Prototype Chain

If you have played with JavaScript for more than a couple of days, you have probably benefited from the flexibility of the prototype chain. Let us take a closer look.

At a high level, most values in JavaScript can be considered objects. This is how you are able to call the `splice()` method on any array, or invoke `toUpperCase` on any string variable you create. If a method or property doesn't exist on the current object, JavaScript will look at the object's prototype to see if the method or property exists there. It will continue looking up the prototype chain until it finds the functionality it needs.

```javascript
const myName = 'Rakeem'
myName.slice(1, 3) // 'ak'
Object.getPrototypeOf(myName) // String prototype object
```

In the example above, `myName` is a custom variable that is of type `string`. After creating the variable, we invoke the slice method, which does not exist in the myName variable. JavaScript will see that the method does not exist, so it looks at myName's prototype, which is String.prototype. If you execute `Object.getPrototypeOf(myName)` in your terminal, you can see the prototype for yourself. If you expand the object, you will see familiar methods, like length, charAt, slice, etc. Every string variable that you create will have the String prototype as its prototype. This functionality works for all primitive data types in JavaScript.
