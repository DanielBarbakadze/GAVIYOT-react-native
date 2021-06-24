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
          <CalculateScreen />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
