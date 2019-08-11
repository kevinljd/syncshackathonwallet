import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Header, Footer } from './components/Layout/';
import Exercises from './components/Exercises/Exercises';
import firebase from 'firebase';


class App extends Component {
  constructor(props)
  {
    super(props);

    var firebaseConfig = {
      apiKey: "AIzaSyB0qm5fy-ak74N1D2yrai7TaBgDBFk41sY",
      authDomain: "wallet-bf0a0.firebaseapp.com",
      databaseURL: "https://wallet-bf0a0.firebaseio.com",
      projectId: "wallet-bf0a0",
      storageBucket: "",
      messagingSenderId: "560297165185",
      appId: "1:560297165185:web:05a4568e68af7469"
    };
    // Initialize Firebase
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    this.db = firebaseApp.firestore();
    this.state = { count: 0 };

    let doc = this.db.collection('qrcodes').doc('accNumber');

    let observer = doc.onSnapshot(docSnapshot => {
      var number = docSnapshot.data().number;
      this.setState({ count: number });
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

  }

  buttonClick = () => {
    // firebase update database
    let docRef = this.db.collection('qrcodes').doc('accNumber');
    let number = this.state.count + 1;
    if (number > 10) {
      number = 0;
    }

    let setAda = docRef.set({
      number: number
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.count}</h1>
        <button onClick={this.buttonClick}>Click me</button>
        <Header />
        <Exercises />
        <Navbar />
        <Footer />
      </div>
    )
  }

}

export default App;
