import React from 'react'
//import axios from 'axios' - only needed for testing the first examples
import unsplash from '../api/unsplash'
import SearchBar from './SearchBar'
import ImageList from './ImageList'

// We will show two ways to get notified when the request for data is complete and show the images on the screen. The easier way will be right below the notes about the timeline of the process:

/* Notes about the process:
Our goal is not yet to get images to appear, but just to get a list of the number of images that appear.
*When we first load our application, the component will render itself one time with no list of images
* The user enters a search term, and the onSearchMethod is called
*that makes an actual request to unsplash
* wait
* Request complete
* Use that image data to update what our App is showing
*in order to get that app to re-render, we are going to call setState on it and set our images as state on our app component
* That will cause the app component to re-render, and we can use that as an opportunity to then show a list of images.
  */

  /* Here is the somewhat more difficult way:

  class App extends React.Component {
    onSearchSubmit(term) {
        axios.get('https://api.unsplash.com/search/photos', {//remember that this is an asynchronous request. It will take some time for axios to reach out to Unsplash, and then get a response back. By the time we get a response from this request, we will have already exited the onSearchSubmit method. Here is one way of getting notified when the request is completed.
            params: { query: term },
            headers: {
            Authorization: 
            'Client-ID BXaTQwuK5M_bGhicYq3odzm5I1UuloyU2d6UKB5hiGs'
            }
         //whenever we make a request with axios, it returns an object called a promise. A promise will give us a notification when some amount of work, like a network request is completed.
        }).then (response=>{ //we pass the .then a function, usually an arrow function, and the arrow function will get called sometime in the future. This arrow function is essentially a callback that will be invoked with whatever data we got from the Unsplash API. For now we will refer to that data as a response and see what happens when we console.log(response)
            console.log(response.data.results);//this gave us an array of objects, and each object represents one image.

        You can always use the .then statement anytime you know that you are working with a promise

        })
        
    }
    render() {
        return (
            <div className = "ui container" style={{ marginTop: '20px'}}>
            <SearchBar onSubmit= {this.onSearchSubmit} />
            </div>
        )
    }
}*/

//====slightly easier method below===============
 /*
class App extends React.Component {
    state={ images: [] }; //we put a default after the property based on what type of info we plan to get back.
          //to add in state to our app component, we first need to initialize state here at the top of this class. and give a name to the object/property. images seems an appropriate name, since we are getting back an array/list of them. So we will have the property be {images: []}. Note the empty array, because we know that is what we will be getting back, an array. Sometimes we will initialize the property with an empty string or null or [] or {}, depending on what we expect to get back.

    async onSearchSubmit(term) { //putting the async keyword in front of the function name, allows us to use the async await syntax inside this function.
    const response = await axios.get('https://api.unsplash.com/search/photos', { 
            params: { query: term },
            headers: {
            Authorization: 
            'Client-ID BXaTQwuK5M_bGhicYq3odzm5I1UuloyU2d6UKB5hiGs'
            }
        }) 
 
        this.setState( {images: response.data.results}) //setting state will cause the component to re-render.
        }
        
    
    render() {
        return (
            <div className = "ui container" style={{ marginTop: '20px'}}>
            <SearchBar onSubmit= {this.onSearchSubmit} />
            Found: {this.state.images.length} images
            </div>
        )
    }
}//this gave us an error of: Unhandled Rejection (TypeError): this.setState is not a function. We need to fix the context/value of this in the onSearchSubmit callback, by binding it by assigning it to an arrow function to the onSearchSubmit property inside the app class, or by wrapping the callback inside of an arrow function. See below:*/




//=================this fixes the error surrounding "this"============================
/*
class App extends React.Component {
    state={ images: [] }; 

    onSearchSubmit= async(term)=> { 
    const response = await axios.get('https://api.unsplash.com/search/photos', { 
            params: { query: term },
            headers: {
            Authorization: 
            'Client-ID BXaTQwuK5M_bGhicYq3odzm5I1UuloyU2d6UKB5hiGs'
            }
        }) 
 
        this.setState( {images: response.data.results}) 
        }
        
    
    render() {
        return (
            <div className = "ui container" style={{ marginTop: '20px'}}>
            <SearchBar onSubmit= {this.onSearchSubmit} />
            Found: {this.state.images.length} images
            </div>
        )
    }
}
*/
//====What we have works, but we want to clean up our code. it's not really appropriate (best practice) to put all of this configuration directly into our app component, so we are going to create a folder especially for configuration that is related to axios or somehow getting unsplash to accept our request. 
class App extends React.Component {
    state={ images: [] }; 
//note: now that we have created a special api folder, we will no longer use await axios.get('https://api.unsplash.com/search/photos', 
    onSearchSubmit= async term=> { 
    const response = await unsplash.get('search/photos', { 
            params: { query: term },
          /*  headers: {
            Authorization: 
            'Client-ID BXaTQwuK5M_bGhicYq3odzm5I1UuloyU2d6UKB5hiGs'
            }  This part was moved to the api folder*/
        });

        this.setState( {images: response.data.results}) 
    }
        
    
    render() {
        return (
            <div className = "ui container" style={{ marginTop: '20px'}}>
            <SearchBar onSubmit= {this.onSearchSubmit} />
            <ImageList images={this.state.images} />
            </div>
        );
    }
}



export default App


//==========================NOTES===========================
/* We have only learned how to communicate between components through the props system. And the props system only allows us to pass info from the parent component down to a child. We can only pass information from the app component down to SearchBar through props. But we can use a little trick. We are going to turn the App component into a class based component. In it we are going to define a callback method of onSearchSubmit. Then, whenever the app component decides to show our search bar, it's going to pass that callback or that onSearchSubmit as a prop down to the SearchBar, and the SearchBar is going to hold on to that method. Then whenever a user submits a form, it will take that callback it was given and it will call that callback with whatever the search term was. This is very similar to the onFormSubmit and onChange handlers. We are passing a callback function down into these other components, and then whenever something happens inside of those components, they are going to call our callback functions to give our SearchBar a notification that something just happened, and you need to deal with this event.

We will re-structure the app into  a class based component, so it can have some function that it can take and pass down into the SearchBar. Below is the old code to reference what it looked like before the re-factor.

    const App = () => {
    return (
    <div className = "ui container" style={{ marginTop: '20px'}}>
        <SearchBar />
    </div>
    )
}


*/
