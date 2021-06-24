import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import Colors from "../constants/Colors";

import { MaterialIcons } from "@expo/vector-icons";

export default function CustomSignUpWith({
  title,
  onPress,
  style,
}: {
  title: string;
  onPress: any;
  style?: any;
}) {
  const [press, setPress] = useState(false);

  return (
    <View style={[styles.buttonContainer, style]}>
      <TouchableHighlight
        underlayColor={Colors.appLightBlue}
        style={styles.button}
        onPress={() => {
          onPress(), setPress(!press);
        }}
        onHideUnderlay={() => setPress(false)}
        onShowUnderlay={() => setPress(true)}
      >
        <>
          <MaterialIcons
            name="facebook"
            size={48}
            color={Colors.appBlue}
            // color={press ? Colors.appWhite : Colors.appBlue}
            style={styles.iconsFacebook}
          />
          <View style={styles.textWrapper}>
            <Text style={press ? styles.buttonTextPressed : styles.buttonText}>
              {title}
            </Text>
          </View>
        </>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 130,
    height: 48,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "transparent",

    shadowOffset: { width: 0, height: 4 },
    shadowColor: Colors.appShadowGray,
    shadowOpacity: 0.25,
    elevation: 5,
  },
  buttonText: {
    color: Colors.appBlue,
  },
  buttonTextPressed: {
    // color: Colors.white,
    color: Colors.appBlue,
  },
  iconsFacebook: {
    position: "absolute",
    fontSize: 56,
    left: -5,
  },
  textWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 28,
  },
});
