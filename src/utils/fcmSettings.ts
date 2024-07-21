// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_ID,
  authDomain: `${import.meta.env.VITE_FIRE_BASE_FCM_DOMAIN}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIRE_BASE_FCM_DOMAIN,
  storageBucket: `${import.meta.env.VITE_FIRE_BASE_FCM_DOMAIN}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIRE_BASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIRE_BASE_APP_ID,
  measurementId: import.meta.env.VITE_FIRE_BASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
