import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCSWfTjgJeN_xDNY3XAl9TUrnBR-N1vsvA",
  authDomain: "sinxer-49d2b.firebaseapp.com",
  projectId: "sinxer-49d2b",
  storageBucket: "sinxer-49d2b.appspot.com",
  messagingSenderId: "228946429745",
  appId: "1:228946429745:web:b0fcdbbe39902057fed210",
  measurementId: "G-GF1PSMQZLW"
};
firebase.initializeApp(firebaseConfig);
createApp(App).use(store).use(router).mount('#app');
require('@/assets/scss/color.scss');