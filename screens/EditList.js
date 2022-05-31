import { View, Text,TextInput,StyleSheet,SafeAreaView,TouchableOpacity,FlatList } from 'react-native'
import React,{useState} from 'react'
import { CommonActions } from '@react-navigation/native';
import Colors from '../constants/Colors';
import ColorSelector from '../components/ColorSelector';
import Button from '../components/Button';
const colorList = [
    "blue",
    "teal",
    "green",
    "olive",
    "yellow",
    "orange",
    "red",
    "pink",
    "purple",
    "blueGray",
];

const EditList = ({navigation,route}) =>{
    const [title, setTitle] = useState(route.params.title || "");
    const [color, setColor] = useState(route.params.color || Colors.blue);
    const [isValid, setValidity] = useState(true);
    return(
        <SafeAreaView style={styles.container}>
            <View >
                <View style={{flexDirection:"row"}}>
                    {!isValid && <Text style={styles.errorText}>*List Can't be Empty</Text>}
                </View>
                <Text style={styles.label}>List Name</Text>
                <TextInput
                    underlineColorAndroid={"transparent"}
                    selectionColor={"transparent"}
                    autoFocus={true}
                    value={title}
                    onChangeText={(text) => {
                        setTitle(text);
                        setValidity(true);
                    }}
                    placeholder={"New List Name"}
                    maxLength={30}
                    style={[styles.input, { outline: "none" }]}
                />
                <Text style={styles.label}>Select Color</Text>
                <ColorSelector 
                    onSelect={(color)=>{
                        setColor(color);
                        navigation.dispatch(CommonActions.setParams({color:color}))
                    }}
                    selectedColor = {color}
                    colorOption = {colorList}
                    />
            </View>
            <Button 
                text={"Save"}
                onPress={()=>{
                    if(title.length>1){
                        route.params.saveChanges({title,color});
                        navigation.dispatch(CommonActions.goBack())
                    }else{
                        setValidity(false)
                    }
                }}
                />
            
        </SafeAreaView>
    );
}

export default EditList;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 5,
        justifyContent: "space-between",
    },
    input: {
        color: Colors.darkGray,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        padding: 3,
        height: 30,
        fontSize: 24,
    },
    saveButton: {
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
    errorText:{
        color: Colors.red,
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8,
    }
});

