import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { auth,db } from '../config'
import { signOut } from "firebase/auth"
import { collection, addDoc } from 'firebase/firestore';
import { doc, setDoc,Timestamp } from "firebase/firestore";


const Settings = () => {

  // const create = async()=>{
  //     console.log("LLLLLLLLLLLLLLL");
  //     await setDoc(doc(db,`users/${auth.currentUser.uid}/lists`,'task'), {
  //       //pass any data for user{user.uid}
  //       user_name:"Umar Farooq Cklld",
  //       address:"Lahore",
  //       phone:"0300",
  //       // date: Timestamp.fromDate(new Date()),
  //       // date: Timestamp.fromDate(new Date("December 10, 1815")),
  //   });
  // }


  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <View style={styles.profileContainer}>

      </View>
      <View style={styles.logOutBtnContainer}>
        <Button 
              text={"Logut"}
              onPress={()=>{
                  signOut(auth).then(() => {
                      console.log("Success fully Logout")
                    }).catch((error) => {
                      console.log(error)
                    });}
              }
          />
      </View>

    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  profileContainer:{
    flex:0.9,
    backgroundColor:"lightgray"
  },
  logOutBtnContainer:{
    flex:0.1
  }
})