import axios from 'axios' //the nice thing about axios is that you can set up a pre-configured instance of the axios client that has default properties set for where it is going to make your request, for headers, and params.


//use the create method and pass it an empty object. the create method is going to create an instance of the axios client with a few defaulted properties. axios.create just allows us to create a customized little copy specifically just to make requests to some specific url to just those headers. So we will take the headers section from the app file, and the root url to unsplash. Now that we have this, we no longer need to import axios on the App.js. Instead we need to do "import unsplash from '../api/unsplash'"

export default axios.create ({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 
        'Client-ID BXaTQwuK5M_bGhicYq3odzm5I1UuloyU2d6UKB5hiGs'
        }
}) 
