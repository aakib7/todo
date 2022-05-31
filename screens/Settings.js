import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { auth } from '../config'
import { signOut } from "firebase/auth"
const Settings = () => {
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
        <Button 
            text={"Logut"}
            onPress={()=>{
                signOut(auth).then(() => {
                    console.log("Success fully Logout")
                  }).catch((error) => {
                    console.log(error)
                  });
            }}
        />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})