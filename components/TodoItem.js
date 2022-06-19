import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,TextInput
} from 'react-native'
import React,{useState} from 'react'
import Colors from '../constants/Colors';
import CheckBox from './CheckBox';




const TodoItem = ({text,isChecked,onChecked,onChangeText,onDelete,onBlur,...props}) => {
    
  return (
    <SafeAreaView style={styles.container}>
        {/* Check box and text here */}
        <View style={{ flexDirection: "row", flex: 1 ,marginVertical:9}}>
            <CheckBox isChecked={isChecked} onChecked={onChecked}/>
            <EditableText text={text} isChecked={isChecked} {...props}
                        onChangeText={onChangeText} onBlur={onBlur}/>
        </View>
        <TouchableOpacity onPress={onDelete}>
            <Text style={[styles.icon,{color:Colors.red}]}>X</Text>
        </TouchableOpacity>
        {/* Remove button here */}
        {/* <View>
        </View> */}
    </SafeAreaView>
  )
}

export default TodoItem



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    icon: {
        padding: 5,
        fontSize: 16,
    },
    input: {
        color: Colors.black,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        padding: 3,
        height: 25,
        fontSize: 16,
    },
    text: {
        padding: 3,
        fontSize: 16,
    },
})

// Components
const EditableText =({text,isChecked,onChangeText,...props})=>{
    const [isEditabled,setIsEditabled] = useState(props.new);
    return( 
        <TouchableOpacity 
        style={{flex:1}}
        onPress={()=>{!isChecked && setIsEditabled(true);}}>

        {isEditabled ? 
            <TextInput
                autoFocus={true}
                underlineColorAndroid={"transparent"}
                selectionColor={"transparent"}
                value={text}
                onChangeText={onChangeText}
                placeholder={"Enter Your Task"}
                onSubmitEditing={()=>{}}
                maxLength={30}
                style={[styles.input,{outline:"none"}]}
                onBlur={()=>{
                    props.onBlur && props.onBlur()
                    setIsEditabled(false)
                }} // on blur when text is not focuesd
            />:
            <Text style={
                [   
                    styles.text,
                    {color:isChecked?Colors.lightGray:Colors.black},
                    {textDecoration:isChecked?"line-through":"none"}
                ]}>
                    {text}
            </Text>
        }
    </TouchableOpacity>
    )
}


