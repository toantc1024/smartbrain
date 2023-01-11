import React, { Component, useDeferredValue } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import './App.css';


const initialState = {
  input: '',
  busyLoading: false,
  image: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0, 
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      busyLoading: false,
      image: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0, 
        joined: ''
      }
    }
  }
  
  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        rightCol:width - ( clarifaiFace.right_col * width ), /// | <----
        leftCol: clarifaiFace.left_col * width, // -----> |
        topRow: clarifaiFace.top_row * height,
        bottomRow: height - ( clarifaiFace.bottom_row * height ) 
      } 
    })
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
    if(this.state.busyLoading) 
      return;
    this.setState({image: this.state.input, busyLoading: true});
    fetch('https://smartbrain-api-kl5c.onrender.com/imageUrl', {
      method: 'PUT',
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify({
        imageUrl: this.state.input
      })
     })
     .then(response => response.json())
     .then(data => {
      fetch('https://smartbrain-api-kl5c.onrender.com/image', {
          method: 'PUT',
          mode: 'cors', 
          cache: 'no-cache', 
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow', 
          referrerPolicy: 'no-referrer', 
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json()) 
        .then(result => {
          this.setState(Object.assign(this.state.user, {entries: result.entries}));
        })
        .catch(err => console.log('unable to get entries'));
      this.setState({busyLoading: false});
      this.displayFaceBox(this.calculateFaceLocation(data));
      }
     )
   .catch((error) => {
    this.setState({busyLoading: false});
    console.log("Ooops!");
    })
  }
  onRouteChange = (route) => {
    let status = false;

    if(route === "home") {
      status = true;
    }
    if(route === 'signout') {
      this.setState(initialState);
    } else 
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
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm busyLoading={this.state.busyLoading} onInput={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition box={box} imageSource={image} />
            </div>
          : (
              this.state.route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );    
  }
}

export default App;
