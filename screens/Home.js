import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,FlatList } from 'react-native'
import React,{useLayoutEffect,useState} from 'react'
import Colors from '../constants/Colors';
import { Ionicons } from "@expo/vector-icons"
import ListButton from '../components/ListButton';
import AddListIcon from '../components/AddListIcon';


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
    
    // adding a new item
    const addItemToList = (item) => {
        setItem([...items,item]);
    }

    // deleting an item
    const deleteItemFromList = (id) => {
        items.splice(id,1);
        setItem([...items]);
    }
    // update item
    const updateItemFromList = (index,item)=>{
        items[index] = item;
        setItem([...items])
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
            renderItem={({item:{title,color},index})=>{
                return(
                    <ListButton 
                        title={title} 
                        color={color}
                        onOptions={()=>{
                            navigation.navigate("Edit",
                            {
                                title:title,
                                color:color,
                                saveChanges:(item)=>updateItemFromList(index,item)
                            })}} 
                        navigation={navigation}
                        onDelete={()=>deleteItemFromList(index)}
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