import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBt6yVfJmCdlDxseen7DBev6P-ykQ9ItYY",
  authDomain: "pi-day-314.firebaseapp.com",
  databaseURL: "https://pi-day-314.firebaseio.com",
  projectId: "pi-day-314",
  storageBucket: "pi-day-314.appspot.com",
  messagingSenderId: "560379727735"
};

firebase.initializeApp(config);

export default firebase;
