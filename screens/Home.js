import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,FlatList } from 'react-native'
import React,{useLayoutEffect,useState,useEffect} from 'react'
import Colors from '../constants/Colors';
import { Ionicons } from "@expo/vector-icons"
import ListButton from '../components/ListButton';
import AddListIcon from '../components/AddListIcon';
import { doc, setDoc,collection } from "firebase/firestore";
import {db,auth} from '../config';
import {getData,addDoc,removeDoc,updateDoc} from '../services/collection'

// Components 
// const ListButton = (props) => {
//     return(
//         <TouchableOpacity onPress={()=>{}} style={styles.itemContainer}>
//             <View>
//                 <Text style={styles.itemTitle}>{props.title}</Text>
//             </View>
//             <View style={{ flexDirection: "row" }}>
//                 <TouchableOpacity onPress={()=>{}}>
//                     <Ionicons name="options-outline" size={24} color="white" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={()=>{}}>
//                     <Ionicons name="trash-outline" size={24} color="white" />
//                 </TouchableOpacity>
//             </View>
//         </TouchableOpacity>
//     )
// }

// const AddListIcom = ({addItem}) => {
//     return(
//         <TouchableOpacity 
//             onPress={()=>{
//                 addItem({title:"Title",color:'red'})
//                 }
//             }>
//                 <Text style={styles.icon}>+</Text>
//         </TouchableOpacity>
//     )
// }




const Home = ({navigation}) => {
    const [items,setItem] = useState([]);
    const listRef = collection(db, `users/${auth.currentUser.uid}/lists`);
    
    // get real time data
    useEffect(() => {
        getData(
            listRef,
            (newLists) => {
                setItem(newLists);
            },
            {
                sort: (a, b) => {
                    if (a.index < b.index) {
                        return -1;
                    }
                    if (a.index > b.index) {
                        return 1;
                    }
                    return 0;
                },
            }
        );
    }, []);





    // adding a new item
    const addItemToList = ({ title, color }) => {
        console.log("Adding new Data"+items.length)
        const index = items.length > 1 ? items[items.length - 1].index : 0;
        // console.log(parseInt(index+!))
        addDoc(listRef, { title, color, index });
    }

    // deleting an item
    const deleteItemFromList = (id) => {
        // items.splice(id,1);
        // setItem([...items]);
        console.log("Deleting Data")
        removeDoc(listRef,id);
    }
    // update item
    const updateItemFromList = (id,item)=>{
        // items[index] = item;
        // setItem([...items])
        console.log("Updating Data")
        updateDoc(listRef,id,item);
    }
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>(
                // pass addItemToList function as props 
                <AddListIcon navigation={navigation} addItem={addItemToList}/>
            ),
           
        })
    })
  return (
    <SafeAreaView style={styles.container}>
        <FlatList
            data={items}
            // destracture the data into item, and than destracture item into title and color
            renderItem={({item:{title,color,id},index})=>{
                return(
                    <ListButton 
                        title={title} 
                        color={color}
                        listId={id}
                        onOptions={()=>{
                            navigation.navigate("Edit",
                            {
                                title:title,
                                color:color,
                                saveChanges:(item)=>updateItemFromList(id,item)
                            })}} 
                        navigation={navigation}
                        onDelete={()=>deleteItemFromList(id)}
                        // onDelete={()=>deleteItemFromList(index)}
                    />
                );
            }}
        />
    </SafeAreaView>
  )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    itemTitle: { 
        fontSize: 24, 
        padding: 5, 
        color: "white" 
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 100,
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
        backgroundColor: Colors.blue,
    },
    icon: {
        padding: 5,
        fontSize: 24,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});