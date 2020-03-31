import React from 'react'
import './ImageList.css'
import ImageCard from './ImageCard'

//keep the notes below in mind to understand what is going on

const ImageList = props =>{
    /*const images = props.images.map((image)=>{
        return <img alt={image.description} key={image.id}  src ={image.urls.regular} />//these names come from the console. notice that we keep repeating image. we can simplify by destructuring. Then we can remove the multiple uses of the word "image" see below  */

        const images = props.images.map(image=>{
            return <ImageCard key={image.id} image ={image} />
    })
    return <div className = "image-list">{images}</div>;
};


export default ImageList


/*Notes about mapping
If for example we have const myNumbers = [0,1,2,3,4]. Let's say we want to create an entirely new array that multiplies each number in this original array by 10. Here is how we do it:

const numbers = [0,1,2,3,4]

let newNumbers=[]

for (let i=0; i < numbers.length; i++) {
    newNumbers.push(numbers[i] * 10)
}
numbers - the console showed the original array
newNumbers - the console showed the new array of the original *10 

so the original array was not changed or mutated in any way in the for loop

a map statement in JS is going to do the exact same thing as above.
a mapping statement is going to iterate over an array, and return a brand new array. we use the function numbers.map: and pass it a function

numbers.map ((num) => { //the inner function is going to be called with each element of the array. We will give it a name of num, since numbers is a JS keyword.
    return num * 10 this will give us the new array just as the above method would. 

})


*/