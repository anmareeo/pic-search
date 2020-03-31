import React from 'react'
//purpose of this component is to show one image at a time to allow it to determine size

class ImageCard extends React.Component {
    constructor (props){
        super(props)

        this.imageRef = React.createRef()
    }
componentDidMount () {
    console.log(this.imageRef)
    console.log(this.imageRef.current.clientHeight) //we reach into the DOM and we get back different images, The ref itself is a JS object that has a current property, and the current property references a DOM note, in this case, an image. On this image, it will show the height. Note the console.log of (this.imageRef.current.clientHeight) returned 0---all height of zero. That is because the console only knows what is in there once we expand. We see zero because the DOM is reaching out to the API to get that image, and it takes some time, so we are trying to access that height before it even knows what it is.
}


    render() {
        const {description, urls} = this.props.image //destructuring to avoid duplicating words
        return (
            <div>
                <img ref={this.imageRef}alt={description} src ={urls.regular} />
            </div>
            
        )
    }
}

export default ImageCard

/*Notes about what is going on behind the scenes in order for the images to be displayed in a more organized manner without large spaces or photos being cut off.
* Let the image card render itself and its image
* after that image is rendered, we are going to somehow reach into the DOM and figure out how tall the image ended up being when it appeared on the screen.
* Once we have figured out the height, we are going to take that height and set it on state on each individual image card component, and that will cause each component to re-render itself
* When re-rendering, we are going to use that image height that was previously figured out to generate the appropriate grid row and property to make sure that the image takes up just enough space to show itself and not overlap any other image.


When we want to access DOM elements directly, using React, we do not use the document.querySelector function. Instead we make use of a React system called the Ref system.Ref stands for Reference, and here is how that system works:
To create a ref, we are going to define our constructor function. We are going to call a function inside the constructor function to create a reference and assign it as an instance variable on our class. We can in theory assign references to the state of our component, but it's not required to do so because these refs are not going to change over time. And we are never going to call setState with a ref. In general, we only put data in state if we expect it to change over time.
* once we assign that ref as an instance variable on our class, we are going to then go down to our render method and pass that ref into some particular JSX element as a prop.





*/