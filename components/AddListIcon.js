import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'


// called in home
const AddListIcon = ({navigation,addItem}) => {
    return(
        <TouchableOpacity 
            onPress={()=>{
                navigation.navigate("Edit",{saveChanges:addItem})
            }}
        >
            <Text style={styles.icon}>+</Text>
        </TouchableOpacity>
    )
}

export default AddListIcon

const styles = StyleSheet.create({
    icon: {
        padding: 5,
        fontSize: 24,
    },
})