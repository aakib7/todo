import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Colors from '../constants/Colors'
import validator from "validator";
import Button from '../components/Button';
import LabeledInput from '../components/LabeledInput';
import { auth,db } from '../config';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { doc, setDoc,Timestamp } from "firebase/firestore"; 


const validateFields = (email, password) => {
    const isValid = {
        email: validator.isEmail(email),
        password: validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }),
    };

    return isValid;
};


const Login = () => {
    const [isCreateMode,setIsCreateMode] = useState(false)
    const [emailFeild,setEmailFeild] = useState({
        text:"",
        errorMessage:""
    });
    const [passwordFeild,setPasswordFeild] = useState({
        text:"",
        errorMessage:""
    });
    const [passwordReentryFeild,setPasswordReentryFeild] = useState({
        text:"",
        errorMessage:""
    });
    const [userName,setUserName] = useState("")

    const createAccount = (email,password) =>{
        createUserWithEmailAndPassword(auth,email,password).then(({user})=>{
            console.log("Creating user ...")
            // addDoc(collection(db, "users"),user.uid, {});
            // in firestore a users collection is created and 
            // a document with same user id that is in auth
            setDoc(doc(db, "users", user.uid), {
                //pass any data for user{user.uid}
                user_name:userName,
                address:"Lahore",
                phone:"0300",
                // date: Timestamp.fromDate(new Date()),
                // date: Timestamp.fromDate(new Date("December 10, 1815")),
            });
        })
    }
    const login = (email,password) =>{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        });

    }
  return (
    <View style={styles.container}>
        {/* header */}
        <Text style={styles.header}>ToDo</Text>
        <View style={{flex:1,marginTop:80}}>
            {/* inputs fields and login Toggle */}
            {/* email input */}
            <LabeledInput 
                lable={"Email"} 
                text={emailFeild.text}
                onChangeText={(text)=>{setEmailFeild({text})}}
                errorMessage={emailFeild.errorMessage}
                labelStyle={styles.label}
                autoCompleteType={"email"}
            />             
            {/* user name only for reg             */}

            {isCreateMode && <LabeledInput 
                lable={"User Name"} 
                text={userName}
                onChangeText={(text)=>{setUserName(text)}}
                labelStyle={styles.label}
            />}


            {/* password input */}
            <LabeledInput 
                lable={"Password"} 
                text={passwordFeild.text}
                onChangeText={(text)=>{setPasswordFeild({text})}}
                errorMessage={passwordFeild.errorMessage}
                labelStyle={styles.label}
                autoCompleteType={"password"}
                secureTextEntry={true}
            />            
            {/* Re Entry password input */}
            {isCreateMode && <LabeledInput 
                lable={"Re-enter Password"} 
                text={passwordReentryFeild.text}
                onChangeText={(text)=>{setPasswordReentryFeild({text})}}
                errorMessage={passwordReentryFeild.errorMessage}
                labelStyle={styles.label}
                secureTextEntry={true}
            />}
            
            {/* toggle */}
            <TouchableOpacity
                    onPress={() => {
                        setIsCreateMode(!isCreateMode);
                    }}
                >
                    <Text
                        style={{
                            alignSelf: "center",
                            color: Colors.blue,
                            fontSize: 16,
                            margin: 4,
                        }}
                    >
                        {isCreateMode ? "Already have an account?" : "Create new account"}
                    </Text>
                </TouchableOpacity>
        </View>
        <Button 
            text={isCreateMode ? "Create Account" : "Login"}
            onPress={()=>{
                const isValid = validateFields(emailFeild.text,passwordFeild.text);
                let isAllValid = true;
                if(!isValid.email){
                    emailFeild.errorMessage = "Please Enter A Valid Email";
                    setEmailFeild({...emailFeild});
                    isAllValid = false
                }
                if (!isValid.password) {
                    passwordField.errorMessage =
                        "Password must be at least 8 long w/numbers, uppercase, lowercase, and symbol characters";
                    setPasswordField({ ...passwordField });
                    isAllValid = false;
                }
                if( isCreateMode && 
                    passwordFeild.text != passwordReentryFeild.text ){
                        passwordReentryFeild.errorMessage = "Password Not Match";
                        setPasswordReentryFeild({...passwordReentryFeild});
                        isAllValid = false;
                    }
                if(isAllValid){
                    isCreateMode ? createAccount(emailFeild.text,passwordFeild.text) : login(emailFeild.text,passwordFeild.text)
                }
            }}
            buttonStyle={{backgroundColor : isCreateMode ? Colors.red : Colors.blue}}
        />

    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "stretch",
    },
    label: { fontSize: 16, fontWeight: "bold", color: Colors.black },
    header: { fontSize: 72, color: Colors.red, alignSelf: "center" },
    });
    
