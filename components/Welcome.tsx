import React from "react";
import { View, StyleSheet, Platform, StatusBar, Image } from "react-native";
import { Text } from "react-native-svg";
import AppButton from "./AppButton";
import AppAnchor from "./AppAnchor";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/Logo.png")}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <AppButton title="Calculate" onPress={() => console.log("clicked")} />
          <AppButton title="Log In" onPress={() => console.log("clicked")} />
        </View>
        <View style={styles.anchorContainer}>
          <AppAnchor
            title="Create New Account"
            onPress={() => console.log("clicked")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    height: "100%",
    marginEnd: 30,
    marginStart: 30,
  },
  logoContainer: {
    flex: 15,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
  footer: {
    // height: 250,
    flex: 5,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  anchorContainer: {
    flex: 1,
    alignItems: "center",
    fontSize: 100,
  },
});
