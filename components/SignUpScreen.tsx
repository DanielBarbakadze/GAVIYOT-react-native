import React from "react";
import { View, StyleSheet, Platform, StatusBar, Image } from "react-native";
import AppButton from "./AppButton";
import Screen from "./Screen";
import Colors from "../constants/Colors";
import AppInput from "./AppInput";
import CustomSignUpWith from "./CustomSignUpWith";

export default function SignUpScreen() {
  return (
    <Screen StatusBarColor={Colors.dodgeViolet}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/Logo-white.png")}
          />
        </View>
        <View style={styles.signUpBody}>
          <View style={styles.inputsContainer}>
            <View style={styles.dualInputWrapper}>
              <AppInput placeholder={"First Name"} styles={styles.dualInput} />
              <AppInput placeholder={"Last Name"} styles={styles.dualInput} />
            </View>
            <AppInput placeholder={"Username"} styles={styles.input} />
            <AppInput placeholder={"E-Mail"} styles={styles.input} />
            <AppInput placeholder={"Password"} styles={styles.input} />
            <AppInput placeholder={"Confirm Password"} styles={styles.input} />
          </View>
          <View style={styles.footer}>
            <AppButton
              onPress={() => console.log("singup")}
              title={"Finish Sign Up"}
              style={styles.signUpButton}
            />
            <CustomSignUpWith
              onPress={() => console.log("singup")}
              title={"Continue With Facebook"}
              style={styles.customSignUpWith}
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
  },
  logoContainer: {
    width: "100%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    height: 75,
    resizeMode: "contain",
  },
  signUpBody: {
    marginLeft: 40,
    marginRight: 40,
  },
  inputsContainer: {
    // backgroundColor: Colors.secondaryColor,
    marginTop: 34,
  },
  dualInputWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  dualInput: {
    width: "48%",
    marginBottom: 24,
  },
  input: {
    marginBottom: 24,
  },
  footer: {
    marginTop: 27,
    // backgroundColor: Colors.appTextGray,
  },
  signUpButton: {
    width: "100%",
    height: 48,
  },
  customSignUpWith: {
    marginTop: 24,
    width: "100%",
    height: 48,
  },
});
