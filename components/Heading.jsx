import { View, Text } from 'react-native'
import React from 'react'

const Heading = ({ text1 = "SAINI", text2 = "Products", }) => {
  return (
    
    <View style={{ position:"absolute",
    right:135,
    top:50,
    zIndex:10,}}>
    <Text style={{ fontSize: 20,fontWeight: "600" }}>{text1} {text2}</Text>
   
  </View>
  )
}

export default Heading