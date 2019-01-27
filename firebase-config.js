import Firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCGCgCTu9OwUZbprgmqH9-KCTp0jjKtCFs",
  authDomain: "vuevuexprettygirlsapi.firebaseapp.com",
  databaseURL: "https://vuevuexprettygirlsapi.firebaseio.com",
  projectId: "vuevuexprettygirlsapi",
  storageBucket: "vuevuexprettygirlsapi.appspot.com",
  messagingSenderId: "187458410833"
};

let firebaseApp = Firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
const settings = {
  timestampsInSnapshots: true
};

firestore.settings(settings);

export default {
  firebaseApp,
  firestore
}