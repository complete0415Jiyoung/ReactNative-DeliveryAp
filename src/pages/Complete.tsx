import React, { useState }  from "react";
import { Pressable, Text, View } from "react-native";


function Complete(){

    const[count, setCount]= useState();

    return(
        <View>
            <Text>배달완료</Text>
        </View>
    ) 
}
export default Complete;