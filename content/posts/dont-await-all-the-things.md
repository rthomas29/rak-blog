---
title: "Quick tip: Don't await all the things"
date: "2019-06-07T14:41:18.994Z"
template: "post"
draft: false
slug: "/posts/dont-await-all-the-things/"
category: "Async JS"
tags:
  - "Asynchronous JavaScript"
  - "JavaScript"
  - "Async/Await"
  - "Promises"
description: "Quick tip on using async/await"
---

I want to make this quick, so let's dive right in!

If you've been writing JavaScript for any period of time, you've probably run into `Promise` and `async/await`. If you're unfamiliar with promises, I would suggest heading over to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for an in-depth explanation.

## What does async/await do?

In JavaScript, we use `async/await` to wait for the resolution of a promise. This means that we can pause the execution of an `async` function to wait for data returned from another asynchronous function.

```javascript
const fetchUser = async function () {
  const user = await pretendThisReturnsAResolvedPromise()
  console.log(user)
  return user
}
```
In the above code snippet, when `fetchUser` is called, thread execution will pause and `await` the data that is returned from `pretendThisReturnsAResolvedPromise`. The data will be the result of either `Promise.resolve()` or `Promise.reject()` being invoked from a Promise object.

## Ok, so what's the tip?

When working with modern JavaScript, I've noticed that it's common to slap `async/await` on every asynchronous function without analyzing the use case. When you declare a function `async`, it'll still handle its asynchronous behavior via the [event loop](https://www.youtube.com/watch?v=8aGhZQkoFbQ), but it returns an implicit `Promise` object, which may create unnecessary overhead, especially if you already have a Promise being returned from your function. Here's an example I ran into when working with Firebase Authentication:

```javascript
import app from 'firebase/app'
import 'firebase/auth'

class Firebase {
  constructor(firebaseConfig) {
    this.instance = app.initializeApp(firebaseConfig)
    this.auth = app.auth()
  }

  createUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

  signInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

  signOut = () => this.auth.signOut()

  onAuthStateChanged = cb => this.auth.onAuthStateChanged(cb)
}
```

I created a Firebase class that encapsulates user authentication for a side project I'm working on. For this example, the methods themselves aren't important, but it is important to know that the authentication methods from the Firebase SDK **already return a promise**, so there's no need to make my Firebase class methods `async`! I've seen instances where developers, myself included, will do something like this:

```javascript
 class Firebase {
  // same class from above...

    signInWithEmailAndPassword = async (email, password) => {
      try {
        const user = await this.auth.signInWithEmailAndPassword(email, password)
        return user
      } catch(error) {
        // some arbitrary error handling
      }
    }
 }
```

There are a couple of things wrong with this, in my opinion.

1. The caller won't have full flexibility when handling errors.
2. Unnecessary implicit Promise!

If we wrote our Firebase class methods like this, any consumers of the Firebase class methods will have to adhere to this specific type of error handling. If we instead return `this.auth.signInWithEmailAndPassword(email, password)`, which itself returns a `Promise`, we keep our class method pure and give the caller full flexibility regarding how they want to handle potential errors.


This was a thought that has been rolling around in my head for the past couple days so I decided to write about it. If I missed something, or worded something poorly, please feel free to comment and let me know 😊
