import React, { useState, useEffect } from "react";
import { Text, View, Button, Alert } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./src/pages/Home";
import Sorteio from "./src/pages/Sorteio";
import Grupos from "./src/pages/Grupos";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Copa do Mundo" component={Home} />
        <Stack.Screen name="Grupos" component={Grupos} />
        <Stack.Screen name="Sorteio" component={Sorteio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
