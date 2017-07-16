import firebase from 'firebase';

export default function initFirebase() {
  const config = {
    apiKey: 'AIzaSyBr_B7GtYnfvABFui00nhTA7sNTf2vqEZI',
    authDomain: 'fcc-nightlife-steward.firebaseapp.com',
    databaseURL: 'https://fcc-nightlife-steward.firebaseio.com',
    projectId: 'fcc-nightlife-steward',
    storageBucket: '',
    messagingSenderId: '616468628522',
  };
  firebase.initializeApp(config);
}

