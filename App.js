import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import ToDoList from "./screens/ToDoList";
import EditList from "./screens/EditList";


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen 
          name="ToDoList" 
          component={ToDoList}
          options={({route})=>{
            return({
              title:route.params.title,
              headerStyle:{
                backgroundColor:route.params.color,
              },
              headerTintColor:"white", // header color
            })
          }}
          />
        <Stack.Screen 
        name="Edit" 
        component={EditList}
        options={({route})=>{
          return({
            title:route.params.title ? `Edit ${route.params.title} List`:"Create new list",
            headerStyle:{
              backgroundColor:route.params.color,
            },
            headerTintColor:route.params.title ?"white":"black", // header color
          })
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


