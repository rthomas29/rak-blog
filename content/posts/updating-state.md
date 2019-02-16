---
title: 'React: Updating Parent State from Child Components'
date: 2018-01-01
---

I've been having a lot of fun learning React and how it fits into front-end development in 2018. With tools like create-react-app, you can have an app up and running in no time at all. While there's a lot to learn within the React ecosystem, this post will focus on updating the state of a Parent component from a Child component.

### What is State?

If you've spent any time with React, you know that **state** is one of the main building blocks of any application. State is the current value or status of variables within components that are rendered to your view. For example, if you have a `Button` component and you would like to keep track of the number of times it is clicked, the number of clicks should be represented as a property on the `Button` component's state object. It should be given a descriptive name, something like numberOfClicks would suffice.

In React, if you want to pass data between components, **data flows down** from Parent to Child components. Parent components are just components that house other components, those being Child components. The way that we pass data down to Child components is through **props**. Props is an object that holds any variables that are passed from Parent to Child. If you wanted to pass some arbitrary information to a Child component from the state of your Parent component, like name and age, it would look something like this:

```jsx
<Child name={this.state.name} age={this.state.age} />
```

To manipulate this data and render it from your Child component, you have to access the props object, like so:

```jsx
  render() {
    return (
      <div>
        <p> I'm {this.props.name} and I am {this.props.age} years old.</p>
      </div>
    )
  }
```

##### Note:

Accessing props using the `this` keyword only works if your components are ES6 classes. If you are using stateless components, you would access props without `this`, i.e. props.name, props.age.

### Main Point

Something I initially had trouble wrapping my mind around was updating state of a Parent component from a Child component. For instance, if I had a `name` property stored in my Parent component state, and I wanted to update that property based on input from a Child component. How would I go about doing that?

#### Step 1: Create a function to handle input change and bind it to the Parent class context.

```jsx
class Parent extends Component {
  constructor() {
    super()
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  state = {
    name: '', // setting initial value of our name state
  }
  handleInputChange(event) {
    event.preventDefault()
    this.setState({ name: event.target.value })
  }
}
```

Let's dig into this code.

```javascript
this.handleInputChange = this.handleInputChange.bind(this)
```

This block of code is ensuring that regardless of where `handleInputChange()` is called, the context will always be the Parent component. In other words, our `this.setState()` method will only set the state of `name` on the Parent class. This will be extremely important in the next steps.

```jsx
  handleInputChange(event) {
    event.preventDefault();
    this.setState({ name: event.target.value })
  }
```

When triggered, `handleInputChange()` will set the state of `name` to be the value of the event target, which will be the input contained in the Input component.

##### Note:

Although using `bind` is valid, many developers will use arrow functions to bind methods to classes instead. Arrow functions do not create a new `this` context and will use the `this` value of the enclosing lexical scope instead. This is an example of the Parent component we made earlier, but with an arrow function.

```jsx
class Parent extends Component {
  // no constructor needed
  state = {
    name: '',
  }
  handleInputChange = event => {
    event.preventDefault()
    this.setState({ name: event.target.value })
  }
}
```

As you can see, we no longer require binding of `handleInputChange` in the constructor.

#### Step 2: Pass handleInputChange() to the Input component, the Child, as props.

In JavaScript, functions are first-class citizens, so we are able to pass them around as arguments. Now, since JSX allows you to freely use JavaScript within HTML, most rules apply. We can pass our `handleInputChange()` as props to our Input component.

```jsx
// in our Parent component
render() {
  return (
    <div>
      <h1>Hello, {this.state.name}</h1>
      <Input ourInputFunction={this.handleInputChange} />
    </div>
  )
}
```

The h1 tag is where our name will eventually show up, once updated. For now, it will be empty, since the initial state of `name` is ''. Also, the variable name, in this case `ourInputFunction`, can be any name you desire. I suggest giving it the same name as in the Parent component. I only gave it a different name to show that the naming is your choice.

#### Step 3: Handle event in Input component using `handleInputChange`.

Handling events in React is similar to handling events in HTML, with a couple differences. The main difference that pertains to us is that React events must be `camelCased`. In our case, we're using the `onChange` event to listen for changes that occur in our Input component, and we will use handleInputChange to handle that event.

```jsx
class Input extends Component {
  constructor(props) {
    super()
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.props.ourInputFunction} />
      </div>
    )
  }
}
```

##### Note:

Be aware that you must use the variable name that you passed as props in the Parent component. As you see above, I used `this.props.ourInputFunction` instead of `this.props.handleInputChange` because that's the name we used in the above example. Also, you do not want to add the `()` at the end of `this.props.ourInputFunction`. In JSX, anything inside of curly braces will be resolved immediately, and you do not want the function to be called until the `onChange` event is triggered.

### TL;DR

I learned how to update state in a Parent component from within a Child component. Here's how.

1. Create a function to handle input change and bind it to the Parent class context. Make sure to include `setState` within this function.

2. Pass said function to the Child component, as props.

3. Use React event handling, specifically `onChange` event, and handle this event using the function you passed as props from Parent.

### Parent component

```jsx
class Parent extends Component {
  constructor() {
    super()
    this.handleInputFunction = this.handleInputFunction.bind(this)
  }
  state = {
    name: '',
  }
  handleInputFunction(e) {
    e.preventDefault()
    this.setState({ name: e.target.value })
  }
  render() {
    return (
      <div>
        <h1>Hello, {this.state.name}</h1>
        <Input ourInputFunction={this.handleInputFunction} />
      </div>
    )
  }
}
```

### Input (Child) component

```jsx
class Input extends Component {
  constructor(props) {
    super()
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.props.ourInputFunction} />
      </div>
    )
  }
}
```

As you can see, we can now update the state of our Parent component from our child Input component.
![Post GIF demo](https://media.giphy.com/media/3oFzm5of4Hnnqs9yco/giphy.gif)
