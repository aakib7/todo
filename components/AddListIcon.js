import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons"


// called in home
const AddListIcon = ({navigation,addItem}) => {
    return(
        <View style={{flexDirection:"row"}}>
            <TouchableOpacity 
                onPress={()=>{
                navigation.navigate("Edit",{saveChanges:addItem})
                }}
            >
                <Text style={styles.icon}>+</Text>
            </TouchableOpacity>            
            <TouchableOpacity 
                style={{marginTop:15,marginHorizontal:10}}
                onPress={()=>{
                navigation.navigate("settings")
                }}
            >
                <Ionicons name={"settings"} size={30}/>
                {/* <Text style={styles.icon}>+</Text> */}
            </TouchableOpacity>
        </View>

    )
}

export default AddListIcon

const styles = StyleSheet.create({
    icon: {
        padding: 5,
        fontSize: 38,
    },
})