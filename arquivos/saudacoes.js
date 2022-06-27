import React from "react";
import {Text, View, StyleSheet} from 'react-native'

const Saudacao = (props) => {
    return (
        <View style ={style.center}>
                <text>Olá {props.name}! </text>
        </View> 
    );
}

const stles = StyleSheet.create({
    center:{
        alignItems: 'center'
    }
})