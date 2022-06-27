import React from "react";
import { Text, View, Button, Image, StyleSheet,ImageBackground } from "react-native";

import Logo from '../../../arquivos/FIFA.png';
import Campo from '../../../arquivos/Campo.png'
import { StatusBar } from "expo-status-bar";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={Campo} style={styles.background} resizeMode="cover">
        <Image source={Logo} style={styles.image} resizeMode="center"/>
        <Button title="Sorteio" onPress={() => navigation.navigate("Sorteio")}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: '100%',
    height: 360,
  },
  background: {
    flex: 1,
    justifyContent: 'center'
  },

})
