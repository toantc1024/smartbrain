import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
 apiKey: '4bb8c51e16404816bc379eb9f73c5722'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      image: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      rightCol:width - ( clarifaiFace.right_col * width ), /// | <----
      leftCol: clarifaiFace.left_col * width, // -----> |
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - ( clarifaiFace.bottom_row * height ) 
    } 
  }

  displayFaceBox = (box) => {
    this.setState({
      box: box
    });
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onSubmit = () => {
    this.setState({image: this.state.input});
   const raw = JSON.stringify({
     user_app_id : {
       user_id: "toantc1024",
       app_id: "my-first-application"
     },
     inputs: [
       {
         data: {
           image: {
             url: this.state.input
           },
         },
       },
     ],
   });

   fetch(
      "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key c4b9c720614d48818405109878fa8e12",
        },
        body: raw,
      }
    )
    .then((response) => response.json())
    .then((result) => {
      this.displayFaceBox(this.calculateFaceLocation(result));
    })
    .catch((error) => {
      console.log("Ooops!");
    })

  }
  render() {
    return (
      <div className="App">
        <Navigation />
        <Rank />
        <ImageLinkForm onInput={this.onInputChange} onSubmit={this.onSubmit} />
        <ParticlesBg color="#ffffff" num={20} type="cobweb" bg={true} />
        <FaceRecognition box={this.state.box} imageSource={this.state.image} />
      </div>
    );    
  }
}

export default App;
