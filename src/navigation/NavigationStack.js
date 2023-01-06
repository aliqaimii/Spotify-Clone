import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recommendations from "../screens/Recommendations";
import Playlist from "../screens/Playlist";
import PlayItem from "../screens/PlayItem";

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  const screenOptions = {
    headerShown: false,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="Recommendations"
      >
        <Stack.Screen name="Recommendations" component={Recommendations} />
        <Stack.Screen name="Playlist" component={Playlist} />
        <Stack.Screen name="PlayItem" component={PlayItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
