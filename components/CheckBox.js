import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity, } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';


// any other props than (isChecked,ocChecked) goes to props
const CheckBox = ({isChecked, onChecked, ...props}) => {
  return (
    <TouchableOpacity style={styles.checkbox} onPress={onChecked}>
        <Text style={{color: Colors.lightGray}}>{isChecked ? "✓" : ""}</Text>
    </TouchableOpacity>
  );
}

export default CheckBox

const styles = StyleSheet.create({
    checkbox:{
        width:20,
        height:20,
        margin:3,
        backgroundColor:"#fff0",
        color:Colors.green,
        borderWidth:1,
        borderRadius:3,
        borderColor:Colors.lightGray,
        justifyContent:"center",
        alignItems:"center",
        fontWeight:"900",
    }
})