---
title: "TIL: Pointer Events"
date: "2019-08-17T13:32:20.773Z"
template: "post"
draft: false
slug: "/posts/pointer-events/"
category: "TIL"
tags:
  - "TIL"
  - "CSS"
  - "Front End"
  - "React"
description: "Having weird side-effects when clicking a disabled button? The pointer-events CSS property may help"
---


## TL;DR
### Use the `pointer-events` CSS rule to disable click/pointer events on specific DOM elements.


# Intro
Over the past week, I've been tasked with creating a flexible and re-usable `Button` component that we can use across our products for work. It's been fun to discover new corner cases that I hadn't previously run into while thinking about what a standard `Button` component should be capable of.


# The Problem
One corner case I ran into was handling the behavior of a `disabled` button. If you're unaware, when a `Button` is passed the `disabled` flag, it should be "grayed" out and should not "React" (all the pun intended) to any click or change events. However, if you nest a child component in `Button` that has an `onClick` handler, that `onClick` handler will still fire, even though your `Button` may be disabled! Huh? How can we fix this? You guessed it...`pointer-events`!

# The Solution
As you may already know, the DOM was designed to handle all types of events from the client. Click or pointer events are some of the most prominent on a webpage. Let's say we have some code that looks like this:

```javascript
function Button() {
  return (
    <div>
      <button disabled>
        <span onClick={() => alert("clicked!!!")}>
          Some clickable text
        </span>
      </button>
    </div>
  );
}
```

In this instance, the `button` element is disabled; meaning the DOM is not listening for any events that are emitted from it. However, our `span` is ready to go! The `button:disabled` state holds no power over any children of `button`, so the DOM is still prepared to react to events on `button`'s children. We can tell the DOM to not listen to pointer events of specific elements by utilizing the `pointer-events` CSS property.

```javascript
function Button() {
  return (
    <div>
      <button disabled>
        <span style={{ pointerEvents: "none" }} onClick={() => console.log("clicked!!!")}>
          Some clickable text
        </span>
      </button>
    </div>
  );
}
```

Now `span` won't be able to react to pointer events!

### Note
You might feel inclined to attach `pointer-events` to the `button` in this case. This won't work! `pointer-events` needs to be attached to the element you wish to silence, which is `span` in this case!

So, that's it! If you want a quick way to prevent specific elements from reacting to click or pointer events, reach for `pointer-events`.