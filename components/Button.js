import { View, Text,TextInput,StyleSheet,SafeAreaView,TouchableOpacity,FlatList } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';

export default ({ buttonStyle, textStyle, onPress, text }) =>{
    return(
        <TouchableOpacity 
            style={[styles.button,buttonStyle]}
            onPress={onPress} 
        >
            <Text style={[styles.buttonText,textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        borderRadius: 25,
        backgroundColor: Colors.darkGray,
        height: 48,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText:{
        color:"white",
        fontSize:24,
        fontWeight:"bold"
    },
    label: {
        color: Colors.black,
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8,
        marginTop:10
    },
});

