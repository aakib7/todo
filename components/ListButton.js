import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import { Ionicons } from "@expo/vector-icons"

const ListButton = ({title,color,navigation,onDelete,onOptions}) => {
    
    return(
        <TouchableOpacity 
            // pass params to the next screen. and pass as props to the next screen(ToDoList) in main navigation stack
        onPress={()=>{navigation.navigate("ToDoList",{title:title,color:color})}} 
        style={[styles.itemContainer,{backgroundColor:color}]}>
            <View>
                <Text style={styles.itemTitle}>{title}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={onOptions}>
                    <Ionicons name="options-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}


export default ListButton
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