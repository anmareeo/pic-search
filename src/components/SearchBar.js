import React from 'react'
import './ImageList.css'


/*we want to make sure that the onInputChange method gets called everytime a user puts text into the input field, so we will add a new prop of onChange, and then pass it a reference to the method we just created. See below.***NOTE*** in the input field, we are passing a method to onChange, onInputChange is a function, it is a callback function, but we do not want it to have the parentheses after it, or else onInputChange would be called every time the component is rendered. We just want the function to be called at some time in the future. So we are just passing a reference to this function to the input element so that the input can call that function sometime in the future.  

When a user types something into the input, our callback is going to be invoked. This callback will be run with one argument being passed to it automatically, and we usually refer to that object as the 'event object'. Note that event comes after onInputChange.

The event object is a normal javascript object that contains a bunch of information about the event that just occured. in the case of a user typing something, there is usually just one property inside of the entire event object that we care about, and that is the event.target.value property. That property will contain the text that the user inputs. Note: upon console.log(event.target.value), when I typed into the search bar, the console showed exactly what I typed and removed.

here is one way of typing this:
<input type = "text" onChange={this.onInputChange} /> //here the console.log method is added to the class.
an alternate way is this:
<input type = "text" onChange={(event)=> console.log(event.target.value)} /> //here the console.log is on the same line, with an arrow function. It's an abbreviated method that does not require us to define a separate method on the class. An even more abbreviated way is:
onChange={(e)=>console.log(e.target.value)}

*/

//We are going to refactor this from an uncontrolled to controlled.
/*class SearchBar extends React.Component {
    onInputChange (event){
        console.log(event.target.value)
    }

   
    render() {
        return (
            <div className = "ui segment">
                <form className = "ui form">
                    <div className = "field">
                        <label>Image Search</label>
                        <input type = "text" onChange={this.onInputChange} />
                    </div>
                </form>
            </div>
            )
    }
}
*/

//====================================================================

class SearchBar extends React.Component {
   state={ term: ''}

   onFormSubmit = event => {
       event.preventDefault()
       
       this.props.onSubmit(this.state.term) // we should give the search responsibilities to the App
   }

   
    render() {
        return (
            <div className = "ui segment">
                <form onSubmit={event=>this.onFormSubmit(event)}className = "ui form">
                    <div className = "field">
                        <label>Image Search</label>
                        <input type = "text" 
                        value ={this.state.term} 
                        onChange={(e)=> this.setState({term: e.target.value}) } 
                        />
                    </div>
                </form>
            </div>
            )
    }
}

/*Notes about why we refactored the code from the first instance to the current one.
Here is how the flow goes:
* User types in input
* Callback gets invoked --in this case it it is onChange
* We call setState with the new value -we pull the change out of that event object by referencing event.target.value, and then we update the state on our component with that new value, so now, this.state.term is going to contain whatever the user just typed into that input.
* Component re-renders - anytime we call setState the component is going to re-render itself, so the render method gets called a second time, the instant the user types something in there.
* Input is told what it's value is--coming from state - when the component re-renders, we take the value of that input/we take this.state.term and assign it to the value prop of the input. The value prop is going to overwrite whatever text is already inside of the input. So we take whatever value is inside of this.state.term and we shove it into the input.

So controlled vs uncontrolled.
As developers, we do not want to store our data inside of our html elements. before we refactored, the input tag itself was storing the value itself. It was the only thing inside of our entire application that knew what the value of the input was. We don't want to do that. 
Instead, we want to centralize all of the information that we have inside of our react component. We want to ensure that the react side is what is driving all of the data that is flowing through our app. We are not going to store data inside of the DOM.
So after the refactor, we don't have to pull info out of the DOM to find the value of the input. We can easily go directly to the the state object in our react component and see the value of input at any given moment in time.

*/






export default SearchBar





/*Notes to remember
* We do NOT put on a set of () whenever we pass a callback function to an event handler, such as onChange.
* Different events are going to be wired to different property names. onChange is one of those very special property names, but there are several other property names for wiring up callbacks or event handlers, like the one we put together above (onChange)
    *if we pass a function to onChange, it will be called anytime the user changes text in an input
    *if we pass a callback function to the property name onClick, then anytime the user clicks on that elelment the function will be called
    *if we pass a function to the property called onSubmit on a form element, our callback will be automatically invoked. 

As a test, I put added
 onInputClick() {
        console.log("Input was clicked") 
        and wired it up to <input type = "text" onClick={this.onInputClick} onChange={this.onInputChange} /> 
    the log showed the message "input was clicked"
    }
 **
 Note that it does not matter what we name onInputChange--we could call it asdf and it would not matter, as long as it is is consistent, but what does matter is the property name we attach it to onChange or onClick, for example. 
 
 **Event handlers in React are quite simple. All we have to do is find some element that we want to watch for some event, we add a prop to it of onChange or whatever event, change, click or submit. we will pass that prop a callback, and then that callback will be invoked anytime that event occurs.

 **key point: we are storing our info inside of our components on our state property as opposed to storing information on the DOM. But the challenging part is that when the user types in the input, the input knows what the text is because it contains that text. But we call onChange to inform our component, essentially after the fact, saying "hey, here is what the new text is in input", and then when we re-render the component, we set the value on the input with essentially the value that is already in there. The input knows what is being typed in there, but we are overiding it with the same value that was already in there. It seems strange, but the point is to have React drive everything and store everything. Some frameworks store info in the DOM and do just fine, but in the React world we don't want anything on the DOM. 
 The good part of doing things this way is that it makes doing certain steps pretty easy and straightforward. For example, if I wanted to render my searchbar with some default value inside the input, I can very easily change the initalization of the state term to say "Hi there". So then when the input renders it will have the value of Hi There.

 We can also easily manipulate the input the user is typing in for every single key press they enter. So if we want to force the value to always be all caps, we just change {term: e.target.value} to {term: e.target.value.toUpperCase()}, and it will re-render and for uppercase letters, even if the user does not enter upperCase. So even if Caps Lock is not on, it will still be in all caps.

 * the default behavior on forms is to submit everytime enter is pushed. so we want to prevent the default with that event handler shown above. We want to wait until the user clicks "submit"
That worked just fine, and then we added console.log(this.state.term),and we got this error:
TypeError: Cannot read property 'state' of undefined. This is an error that we will see often
 But it is not a very clear error. A better way to phrase it would be I cannot access the property stat on the value "undefined" Even that is not super clear. Undefined is a value inside javascript. it's telling us we are trying to access undefined.state. Console.log is equating the word "this" with "undefined" soooo
 What is the value of "this" used for in a class? The instance of SearchBar has a few different properties, such as State, Render, and onFormSubmit. inside of any code that we write inside of any searchbar, we can reference the keyword "this". "This" is a reference back to the class itself. So when we say "this" we are essentially saying give me a reference to the instance of SearchBar that I am writing code inside of. We can then use that to get direct access to our state, render or onFormSubmit properties. This.state will give access to the state object that belongs to this particular instance of the SearchBar. this seems to work just fine, but it does not work inside of the onFormSubmit function. To understand why it's not working, we need to get a better idea of HOW the value of "this" is determined in a function.

 Below is a good example of code that makes use of the "this" keyword inside a method on a class.
 class Car {
  setDriveSound(sound) {
    this.sound = sound
  }
  drive() {
    return this.sound
  }
}

const car = new Car();
car.setDriveSound("Vroom");
car.drive() //each time car.drive() is called, you will see "Vroom" in the console.

HERE IS THE VERY IMPORTANT RULE TO UNDERSTAND:
whenever you want to figure out what the value of "this" is going to be equal to inside of a method on a class, we don't look at the method itself, but we look at where we call the method. so we are calling the method at the bottom with car.drive(), so here is the rule of thumb. We find the function name. In this case, it is drive. we look to the dot to the left of the function (car.drive) so the dot left of the function shows the variable that is referenced. In this case it is the car variable. car is what "this" is going to be equal to inside of the drive function. So "this" is equal to the instance of the car class.

so... Anytime you want to figure out what the value of this is going to be inside of a function, don't look at the function, look at where the function is called, and then to the left of of the dot where the function is called. For JS this rule works 95% of the time.

Let's go back to our car example and add to the bottom

class Car {
  setDriveSound(sound) {
    this.sound = sound
  }
  drive() {
    return this.sound
  }
}

const car = new Car();
car.setDriveSound("Vroom");
car.drive() 

const drive = car.drive
drive()//When we call the drive function, we get the error 
TypeError: Cannot read property 'sound' of undefined

If we apply that rule, notice that there is no dot to the left of drive, and no variable before it. So we get the error. 
Here is how we fix it..... Here again is the car example
class Car {
    constructor() { //no need to for super because we are not extending anything in this case
  this.drive = this.drive.bind(this)   we can bind the drive function. When we bind a function, it produces a new version of the function. Now when drive() is called, we get Vroom.
    }
  setDriveSound(sound) {
    this.sound = sound
  }
  drive() {
    return this.sound
  }
}
const car = new Car();
car.setDriveSound("Vroom");
car.drive() 

const drive = car.drive
drive()

so above is one way--define the constructor, bind the function, and override the existing one.
Another way to fix it---we will go back into the non-car code, the original code that gave us the error. Here is a copy

class SearchBar extends React.Component {
   state={ term: ''}

   onFormSubmit(event) { -- //this line is shorthand syntax for onFormSubmit function (event)
       event.preventDefault()
       console.log(this.state.term)
   }
   we can turn the onFormSubmit function into an arrow function instead. The function keyword will always lead to a broken value of "this". Arrow functions automatically bind the value of "this" for all of the code inside the function.


   class SearchBar extends React.Component {
   state={ term: ''}

   onFormSubmit=(event)=> {
       event.preventDefault()
       console.log(this.state.term)
   }
   Change the code above to an arrow function. Arrow functions automatically.\
   So in our case, the arrow function will make sure that the value of this is always equal to our instance of the SearchBar.

   Here is the third way we can fix the error 

   onFormSubmit(event) {
       
       event.preventDefault()
       console.log(this.state.term)
   }

   
    render() {
        return (
            <div className = "ui segment">
                <form onSubmit={this.onFormSubmit}className = "ui form">
                    <div className = "field">
                        <label>Image Search</label>
                        <input type = "text" 
                        value ={this.state.term} 
                        onChange={(e)=> this.setState({term: e.target.value}) } 
                        />
                    </div>
                </form>
            </div>
            )
    }
}
Change this line as shown above--  <form onSubmit={this.onFormSubmit}className = "ui form"> to an arrow function just like the one on onChange(above). we will wrap the onFormSubmit in an arrow function
Like this:
    <form onSubmit={event=> this.onFormSubmit(event)} here, we are defining an arrow function, and passing it down into the form, so when the form gets submitted,it's going to call the arrow function and then execute this.onFormSubmit(event). 


//IMPORTANT, regarding "this": Anytime you have a callback function, to be safe, use the arrow function syntax. It is going to automatically bind this function and will make sure it always has the appropriate value of "this" inside of it.
    Example: See onFormSubmit code in the SearchBar component.
        

Search Bar component
With the props system we only communicate from a parent down to a child. That ended up being and issue because we wanted to communicate the search term from the search bar up to the parent (App)component. in order to communicate from a child to a parent, we pass a callback from the parent to the child and then the child we call that callback.
    Example: See this.props.onSubmit(this.state.term) under the Example above. This is identical to what we did with the event handlers in the return section of the SearchBar.
*/








