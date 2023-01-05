import react,{useState,useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Screens from './navigation/Screens'
import Login from "./screens/Login";
import { auth } from "./config";

//dd

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
