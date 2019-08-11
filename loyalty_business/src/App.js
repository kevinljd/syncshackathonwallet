import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Header, Footer } from './components/Layout/';
import Exercises from './components/Exercises/Exercises';
import firebase from 'firebase';
import QrReader from 'react-qr-reader'


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
    //state
    this.state = { count: 0 };

    let doc = this.db.collection('qrcodes').doc('1');

    let observer = doc.onSnapshot(docSnapshot => {
      var number = docSnapshot.data().number;
      this.setState({ count: number });
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

  }

  buttonClick = () => {
    // firebase update database
    var accNumber = '123'
    let docRef = this.db.collection('qrcodes').doc(accNumber);

    let setAda = docRef.set({
      coffeeCount: 0
    });
  }


  state = {
    result: 'No result'
  }
 //when QR code is scanned
  handleScan = data => {
    var coffeeCounter = 0;
    if (data) {
      let docRef = this.db.collection('qrcodes').doc(toString(data));
      let collectionRef = this.db.collection('qrcodes');
      console.log(data);
      // let query = collectionRef.where('accountNumber', '==', data).get()
      //   .then(snapshot => {
      //     if (snapshot.empty) {
      //       console.log('No matching documents.');
      //       return;
      //     } else {
      //       // console.log(typeof snapshot);
      //       // console.log(coffeeCounter);
      //       // coffeeCounter = snapshot[0].data().coffeeCount;
      //       // console.log(coffeeCounter);
      //     } 

      //     snapshot.forEach(doc => {
      //       console.log(doc.id, '=>', doc.data());
      //       coffeeCounter = doc.data().coffeeCount + 1;
      //       console.log(' hello from before ' + coffeeCounter);
      //     });
      //   })
      //   .catch(err => {
      //     console.log('Error getting documents', err);
      //   });

      let getDoc = docRef.get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such account!');
          } else {
            console.log('Account data:', doc.data().coffeeCount);
            coffeeCounter = doc.data().coffeeCount + 1;
            console.log(coffeeCounter);
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
        
      let setAda = docRef.set({
        coffeeCount: coffeeCounter
      });

      // console.log('hello from after ' + coffeeCounter);



      this.setState({
        result: data
      });
    }
  }
  handleError = err => {
    console.error(err)
  }



  render() {
    return (
      <div className="App">
        <h1>{this.state.count}</h1>
        <button onClick={this.buttonClick}>Click me</button>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }

}

export default App;
