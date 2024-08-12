// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA87aFOxbDFh_zrKL4PfTit9Ss5OoPYm8g',
  authDomain: 'mmo-project-e9133.firebaseapp.com',
  databaseURL: 'https://mmo-project-e9133-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'mmo-project-e9133',
  storageBucket: 'mmo-project-e9133.appspot.com',
  messagingSenderId: '780903480800',
  appId: '1:780903480800:web:f9b1c392719cfe8510bf85'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export { app, auth }
