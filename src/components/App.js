import React from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'

 /*
class App extends React.Component {
    onSearchSubmit(term) {
        axios.get('https://api.unsplash.com/search/photos', {
            params: { query: term },
            headers: {
            Authorization: 
            'Client-ID BXaTQwuK5M_bGhicYq3odzm5I1UuloyU2d6UKB5hiGs'
            }
           
        }) 
        .then (response=>{ //this is a promise that lets us know that a request is successful
            console.log(response.data.results);

        })

    }
        above is how we get access to the objects that represents imaging. Chaing on a .then request. This is the more difficult method, Below is the easier method.
        ====================================================================*/

        class App extends React.Component {
            async onSearchSubmit(term) { //the async keyword allows us to use the async syntax inside this function.Await is a keyword that we will use in front of the axios request, and then we will turn that into a variable called response.
                const response = await axios.get('https://api.unsplash.com/search/photos', {
                    params: { query: term },
                    headers: {
                    Authorization: 
                    'Client-ID BXaTQwuK5M_bGhicYq3odzm5I1UuloyU2d6UKB5hiGs'
                    }
                    
                }) 
         console.log (response.data.results)
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