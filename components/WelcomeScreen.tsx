import React from "react";
import { View, StyleSheet, Platform, StatusBar, Image } from "react-native";
import AppButton from "./AppButton";
import AppAnchor from "./AppAnchor";
import Screen from "./Screen";
import { StackNavigationProp } from "@react-navigation/stack";

// type RootStackParamList = {
//   Home: undefined;
//   Profile: { userId: string };
//   Feed: { sort: 'latest' | 'top' } | undefined;
// };

// type ProfileScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'Profile'
// >;

// type Props = {
//   navigation?: ProfileScreenNavigationProp;
// };

export default function WelcomeScreen({ navigation }: any) {
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
            <AppButton
              title="Calculate"
              onPress={() => navigation.navigate("CalculateScreen")}
            />
            <AppButton
              title="Log In"
              onPress={() => navigation.navigate("SignUpScreen")}
            />
          </View>
          <View style={styles.anchorContainer}>
            <AppAnchor
              title="Create New Account"
              onPress={() => navigation.navigate("SignUpScreen")}
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
