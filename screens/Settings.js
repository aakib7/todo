import { StyleSheet, Text, ActivityIndicator,View,Image,TouchableHighlight,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import Button from '../components/Button'
import { auth,db,storage } from '../config'
import { signOut } from "firebase/auth"
import { doc, onSnapshot } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'
import {ref,uploadBytes,getDownloadURL } from "firebase/storage";


const Settings = () => {
    const [username,setUserName] = useState();
    const [imageUri, setImageUri] = useState();
    const [imageUrl, setImageUrl] = useState('../assets/logo.jpeg');
    const [uploading,setUploading] = useState(false);
    const [downloadind,setDownloading] = useState(false);
    const fileRef = ref(storage,auth.currentUser.uid+".png");
    

    // get username
    useEffect(()=>{
      onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
        // console.log("Current data: ", doc.data());
      setUserName(doc.data().user_name)
    });
    getDownloadURL(fileRef).then((url) => {
      setImageUrl(url);
    })
    setUploading(false);
    },[]);

    // image picker
    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    };

    const upload = async()=>{
      const img = await fetch(imageUri);
      const bytes = await img.blob();

      setUploading(true);
      await uploadBytes(fileRef,bytes).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        setUploading(false);
        
        setDownloading(true);
        getDownloadURL(fileRef).then((url) => {
          setImageUrl(url);
          setDownloading(false);
        })
       
      });
    }
  
    
  
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>

            {
              downloadind ?
              <ActivityIndicator size="large" />:
                <Image
                  style={styles.profilepicture}
                  source={{uri: imageUrl}}
                />
            }
            <View style={{flexDirection:"row",marginTop:10}}>
              <TouchableHighlight onPress={pickImage}>
                  <Text style={[styles.text,{color:"blue",textDecorationLine:"underline",marginTop:9,marginLeft:30}]}>select image</Text>
                </TouchableHighlight>
                <TouchableOpacity onPress={upload}>
                    {uploading?<ActivityIndicator size="large" />
                      :<Text style={styles.uploadBtn}>Upload</Text>}
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>User Name: {username}</Text>
            <Text style={styles.text}>Email: {auth.currentUser.email}</Text>
          </View>
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
    flex:0.85,
  },
  imageContainer:{
    flex:0.6,
    justifyContent:"center",
    alignItems:'center',
    marginTop:80
    
  },
  profilepicture:{
    width:300,
    height:300,
    borderRadius:50
  },
  text:{
    color:"black",
    fontSize:"18",
    fontWeight:"700",
    marginTop:10,
  },
  uploadBtn:{
    padding:7,
    backgroundColor:"blue",
    color:"white",
    marginLeft:30,
    borderRadius:20

  },
  logOutBtnContainer:{
    flex:0.15
  }
})