import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SignUpScreen from "./components/SignUpScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import CalculateScreen from "./components/CalculateScreen";
import Colors from "./constants/Colors";

import { Provider as PaperProvider } from "react-native-paper";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SignUpScreen"
      component={SignUpScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CalculateScreen"
      component={CalculateScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default function App() {
  const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();
  const colorScheme = "light";

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          {/* <Navigation colorScheme={colorScheme} /> */}
          {/* <StatusBar backgroundColor={Colors.primaryColor} /> */}
          {/* <WelcomeScreen /> */}
          {/* <SignUpScreen /> */}
          {/* <CalculateScreen /> */}
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
