
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyASk2G4W5li97ZHLHHkQ3DyaVfBV6wbvVA",
  authDomain: "firetodo-62b5b.firebaseapp.com",
  projectId: "firetodo-62b5b",
  storageBucket: "firetodo-62b5b.appspot.com",
  messagingSenderId: "922924080456",
  appId: "1:922924080456:web:a14ffa0fde12da8c89a77d"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);