import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,FlatList } from 'react-native'
import React,{useState,useLayoutEffect} from 'react'
import Colors from '../constants/Colors';
import { Ionicons } from "@expo/vector-icons";
// import AddListIcon from '../components/AddListIcon';
import TodoItem from '../components/TodoItem';

const ToDoList = ({navigation}) => {
  const [todoItems,setTodoItems] = useState([]);


  // adding a new item
  const addItemToList = (item) => {
    setTodoItems([...todoItems,item]);
}

// deleting an item
const deleteItemFromList = (index) => {
    todoItems.splice(index,1);
    setTodoItems([...todoItems]);
}

const updateItem = (index,item) => {
  todoItems[index] = item;
  setTodoItems([...todoItems]);
}

  

useLayoutEffect(()=>{
    navigation.setOptions({
        headerRight: ()=>(
            // pass addItemToList function as props 
            <AddListIcon addItem={addItemToList}/>
        )})
    });
    
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todoItems}
        renderItem={({item:{text,isChecked,isNewItem},index}) => {
          return(<TodoItem 
                  text={text} 
                  isChecked={isChecked}
                  isNewItem={isNewItem}
                  // get the current item and change the isChecked value
                  onChecked={()=>{
                    const todoitm = todoItems[index];
                    todoitm.isChecked = !isChecked;
                    updateItem(index,todoitm);
                  }}
                  onChangeText={(new_text)=>{
                    const todoitm = todoItems[index];
                    todoitm.text = new_text;
                    updateItem(index,todoitm);
                  }}
                  onDelete={()=>{
                    deleteItemFromList(index)
                  }}
                  />)
        }}
      />
    </SafeAreaView>
  )
}

export default ToDoList

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },
    icon:{
        padding:5,
        fontSize:32,
        color:"white",
    },
})



// components
const AddListIcon = ({addItem}) => {
  return(
      <TouchableOpacity 
          onPress={()=>{
              addItem({text:"",isChecked:false,isNewItem:true})}}
      >
          <Text style={styles.icon}>+</Text>
      </TouchableOpacity>
  )
}