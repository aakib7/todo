import react,{useState,useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Screens from './navigation/Screens'
import Login from "./screens/Login";
import { auth } from "./config";



const AuthStack = createStackNavigator();

export default function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    if (auth.currentUser) {
        setIsAuthenticated(true);
    }
    auth.onAuthStateChanged((user) => {
      console.log("Checking auth state...");
      if (user) {
          setIsAuthenticated(true);
      } else {
          setIsAuthenticated(false);
      }
  });
}, []);
    

  
  return (
    <NavigationContainer>
      {isAuthenticated ? <Screens /> : <AuthScreens />}
    </NavigationContainer>
  );
}


// auth

const AuthScreens = ()=>{
  return(
    <AuthStack.Navigator>
      <AuthStack.Screen name="login" component={Login}/>
    </AuthStack.Navigator>
  )
}



// fire base

const firebaseConfig = {
  apiKey: "AIzaSyASk2G4W5li97ZHLHHkQ3DyaVfBV6wbvVA",
  authDomain: "firetodo-62b5b.firebaseapp.com",
  projectId: "firetodo-62b5b",
  storageBucket: "firetodo-62b5b.appspot.com",
  messagingSenderId: "922924080456",
  appId: "1:922924080456:web:a14ffa0fde12da8c89a77d"
};

// // Initialize Firebase
