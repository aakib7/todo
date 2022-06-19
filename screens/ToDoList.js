import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,FlatList } from 'react-native'
import React,{useState,useLayoutEffect,useEffect} from 'react'
import Colors from '../constants/Colors';
import { Ionicons } from "@expo/vector-icons";
// import AddListIcon from '../components/AddListIcon';
import TodoItem from '../components/TodoItem';
import {getData,addDoc,removeDoc,updateDoc} from '../services/collection'
import { collection } from "firebase/firestore";
import {db,auth} from '../config';



const ToDoList = ({navigation,route}) => {
  let [todoItems,setTodoItems] = useState([]);
  const [newItem, setNewItem] = useState();

  const todoRef = collection(db,
     `users/${auth.currentUser.uid}/lists/${route.params.listId}/todoItems`);


     // get real time data

     useEffect(()=>{
        getData(todoRef,
                (newToDoItems) => {
                  setTodoItems(newToDoItems);
                },
                {
                  sort: (a, b) => {
                      if (a.isChecked && !b.isChecked) {
                          return 1;
                      }
                      if (b.isChecked && !a.isChecked) {
                          return -1;
                      }
                      return 0;
                  },
              });
        },[])

  // adding a new item
  const addItemToList = () => {
    // setTodoItems([...todoItems,item]);
    setNewItem({text:"",isChecked:false,new:true})
}

// deleting an item
const deleteItemFromList = (index) => {
    todoItems.splice(index,1);
    setTodoItems([...todoItems]);
}

// const updateItem = (index,item) => {
//   todoItems[index] = item;
//   setTodoItems([...todoItems]);
// }

  

useLayoutEffect(()=>{
    navigation.setOptions({
        headerRight: ()=>(
            // pass addItemToList function as props 
            <AddListIcon addItem={addItemToList}/>
        )})
    });
    
    if(newItem){
      todoItems = [newItem,...todoItems]
    }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todoItems}
        renderItem={({item:{id,text,isChecked,...params},index}) => {
          return(<TodoItem 
                  {...params}
                  text={text} 
                  isChecked={isChecked}
                  // get the current item and change the isChecked value
                  onChecked={()=>{
                    const todoitm = todoItems[index];
                    // todoitm.isChecked = !isChecked;
                    // updateItem(index,todoitm);
                    let data = { text, isChecked: !isChecked };
                    if (id) {
                        data.id = id;
                    }
                    addDoc(todoRef, data);
                  }}
                  onChangeText={(new_text)=>{
                    // const todoitm = todoItems[index];
                    // todoitm.text = new_text;
                    // updateItem(index,todoitm);
                    if (params.new) {
                      setNewItem({
                          text: new_text,
                          isChecked,
                          new: params.new,
                      });
                  } else {
                      todoItems[index].text = new_text;
                      setTodoItems([...todoItems]);
                  }
                  }}
                  onDelete={()=>{
                    params.new ? setNewItem(null) : deleteItemFromList(index);
                    id && removeDoc(todoRef,id)
                  }}
                  onBlur = {()=>{
                      if(text.length>1){
                        let data = { text, isChecked };
                          if (id) {
                              data.id = id;
                          }
                          addDoc(todoRef, data);
                          params.new && setNewItem(null);
                        }else {
                          params.new
                              ? setNewItem(null)
                              : deleteItemFromList(index);
                        }
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
              addItem()}}
      >
          <Text style={styles.icon}>+</Text>
      </TouchableOpacity>
  )
}