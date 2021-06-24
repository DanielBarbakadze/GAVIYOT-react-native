import React from "react";
import { View, StyleSheet, Platform, StatusBar, Image } from "react-native";
import AppButton from "./AppButton";
import AppAnchor from "./AppAnchor";
import Screen from "./Screen";

export default function WelcomeScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/Logo.png")}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.buttonsContainer}>
            <AppButton title="Calculate" onPress={() => console.log("calc")} />
            <AppButton title="Log In" onPress={() => console.log("Log In")} />
          </View>
          <View style={styles.anchorContainer}>
            <AppAnchor
              title="Create New Account"
              onPress={() => console.log("clicked")}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
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
