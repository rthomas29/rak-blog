---
title: 'OOJS: Inheritance Pt. 2 - Class in JavaScript'
date: "2018-03-08T23:46:37.121Z"
template: "post"
draft: false
slug: "/posts/inheritance-pt-2/"
category: "OOJS"
tags:
  - "OOP"
  - "JavaScript"
description: "Let's take a brief look at prototypal inheritance with JavaScript."
---

One of the biggest additions to the JavaScript spec via ES6 was the `class` keyword. Using classes allows engineers to replicate class syntax in OOP languages that utilize the classical inheritance model (Java, C#, etc.). However, `class` in JavaScript still utilizes **prototypal inheritance** under the hood and is simply syntactic sugar on top of that functionality. This post will compare the creation of objects using ES5 constructor functions and ES6 class keywords.

### First thing first

I want to reiterate that classes in JavaScript is **not** the same as classes in other OOP languages. In the background, objects are still utilizing the prototype chain to look up and use functionality that doesn't exist within it's context. This is important to remember. `Class` is only syntactic sugar on top of prototypal inheritance. Now let's get into our comparison.

### Constructor Function Declaration vs. Class Declaration

Prior to ES6, if we wanted to create many objects that shared the same properties, but had different values, we would declare a constructor function, like so:

```javascript
function User(name, age) {
  this.name = name
  this.age = age
}
```

After declaring `User`, we are then able to instantiate new instances of `User` by invoking `User` with the `new` keyword. We would then be able to assign unique values for the `name` and `age` properties by passing those values as arguments to `User`.

```javascript
const nori = new User('Nori', 2)
console.log(nori.name) // 'Nori'
console.log(nori.age) // 2
```

If we wanted every instance of `User` to share functionality, we would add those methods to the `User.prototype` object.

```javascript
User.prototype.logDetails = function() {
  console.log(`My name is ${this.name} and I am ${this.age} years old.`)
}
nori.logDetails() // My name is Nori and I am 2 years old.
```

#### Note

Adding `logDetails` directly to `User` would yield the same result as above, but would be quite redundant. We would be defining `logDetails` on every instance of `User`, which wouldn't be "free" as far as memory is concerned. Adding the method to the prototype object of the `User` constructor function would allow us to define the method once, and use it for every instance of `User`. Even if an instance of `User` was created prior to us adding `logDetails` to the prototype object, we would still be able to programatically allow those instances access to `logDetails` through the prototype chain.

Let's take a look at this workflow using ES6 `class` syntax.

```javascript
class User {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  logDetails() {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`)
  }
}

const nori = new User('Nori', 2)
console.log(nori.name) // 'Nori'
console.log(nori.age) // 2
nori.logDetails() // My name is Nori and I am 2 years old.
```

When the `new` operator is invoked on the `User` class, the constructor function within `User` is invoked and returns an object with `name` and `age` as properties. Similar to our constructor function, the properties are assigned the values that were passed as arguments to `User`.

In the background, the object that is returned from `User` is still linked to `User` through prototypal inheritance. Here's an example:

```javascript
// User is the class we defined earlier.
const newUser = new User('Bob', 25)
newUser.logDetails() // My name is Bob and I am 25 years old.
newUser.scream() // newUser.scream is not a function.

newUser.prototype.scream = function() {
  console.log('AHHHHHHHHHHH')
}
newUser.scream() // 'AHHHHHHHHHHH'
```

Even though we're using `class` to define our `User` blueprint, we can still access its prototype to add shared functionality. However, this isn't standard practice. When using classes, you could just add the function definition to the class itself, and it would mimic the process of adding a method to the prototype object. I added `scream` to the prototype object above to demonstrate that prototypal inheritance is still happening under the hood of a class declaration.

```javascript
const anotherNewUser = new User('Rando', 27)

// Error: another.NewUser.logAge is not a function
// We didn't create the definition with our `User` class.
anotherNewUser.logAge()

// Once we add logAge function definition to our class, then we get the desired results.
class User {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  logDetails() {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`)
  }
  logAge() {
    console.log(`I am ${this.age} years old.`)
  }
}

anotherNewUser.logAge() // I am 27 years old.
```

### Which method should I use?

I suggest learning and understanding prototypal inheritance and how it works before defaulting to classes in JavaScript. Classes are cleaner and require less code to implement the same functionality achieved through constructor functions and adding methods to the prototype object of that function.

However, it is vital to understand prototypal inheritance as it is one of the most powerful mechanisms within the JavaScript language. Before using classes, you should understand the `__proto__` property, the prototype object, and how it all works together when you create new objects through constructor functions.
