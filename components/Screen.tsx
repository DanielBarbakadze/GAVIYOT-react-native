import React from "react";
import Constants from "expo-constants";
import { Platform, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";

export default function Screen({ children, StatusBarColor }: any) {
  return (
    <>
      <StatusBar backgroundColor={StatusBarColor || Colors.appGray} />
      <SafeAreaView style={styles.screen}>
        {console.log(Constants.statusBarHeight)}
        {children}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    // top: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    // paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});
