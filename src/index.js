import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'whatwg-fetch';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'; 

const firebaseConfig = {
    apiKey: "AIzaSyBUBBU3RtpGwvuh6FNBrpfUW--9pe92W-M",
    authDomain: "info340-thomam7.firebaseapp.com",
    databaseURL: "https://info340-thomam7.firebaseio.com",
    projectId: "info340-thomam7",
    storageBucket: "info340-thomam7.appspot.com",
    messagingSenderId: "586981701477",
    appId: "1:586981701477:web:a8e0867503fdbada63538c",
    measurementId: "G-VQK68JWNJR"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
