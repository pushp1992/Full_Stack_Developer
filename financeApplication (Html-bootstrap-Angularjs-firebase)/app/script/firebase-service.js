// Initialize Firebase
var config = {
  apiKey: "AIzaSyDNZ_JxLdRGL0qRKyrsbo6IDTPiLgE95qI",
  authDomain: "ces-banking-application.firebaseapp.com",
  databaseURL: "https://ces-banking-application.firebaseio.com",
  projectId: "ces-banking-application",
  storageBucket: "ces-banking-application.appspot.com",
  messagingSenderId: "352270754338"
};
const fbase = firebase.initializeApp(config);
db = firebase.firestore(fbase);

