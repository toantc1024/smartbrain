import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      image: '',
      box: {},
      route: 'signin',
      isSignedIn: false
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
  onRouteChange = (route) => {
    let status = false;
    if(route === "home") {
      status = true;
    }
    this.setState({route: route, isSignedIn: status});
  }
  render() {
    const {isSignedIn, image, box} = this.state;
    return (  
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        <ParticlesBg color="#ffffff" num={20} type="cobweb" bg={true} />
        {
          this.state.route === 'home' 
          ? <div>
              <Rank />
              <ImageLinkForm onInput={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition box={box} imageSource={image} />
            </div>
          : (
              this.state.route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange} /> 
              : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );    
  }
}

export default App;
