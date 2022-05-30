import { StyleSheet, SafeAreaView,Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const ColorSelector = ({colorOption,onSelect,selectedColor}) => {
  return (
    <SafeAreaView style={styles.container}>
      {colorOption.map((colorName)=>{
          return(<ColorButton
            onPress={()=>onSelect(colorName)}
            color={Colors[colorName]}
            isSelected = {colorName == selectedColor}
            
        />);
      })}
    </SafeAreaView>
  )
}

export default ColorSelector

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flex: 1,
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    },
    colorButton: {
        height: 32,
        width: 32,
        borderColor:Colors.lightGray,
        borderRadius: 24,
        margin: 10,
    }
  });

  const ColorButton = ({onPress,isSelected,color})=>{
      return(
          <TouchableOpacity
            style={[
                styles.colorButton,
                {borderWidth: isSelected ? 3 : 0,backgroundColor:color},
            ]}
            onPress={onPress}>

          </TouchableOpacity>
      )
  }