import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
  Text,
} from "react-native";
import Colors from "../constants/Colors";

export default function AppButton({
  title,
  onPress,
}: {
  title: string;
  onPress: any;
}) {
  const [press, setPress] = useState(false);

  return (
    <View style={styles.buttonContainer}>
      <TouchableHighlight
        // underlayColor={Colors.primaryColor}
        underlayColor={Colors.primaryColor}
        style={styles.button}
        onPress={() => {
          onPress(), setPress(!press);
        }}
        onHideUnderlay={() => setPress(false)}
        onShowUnderlay={() => setPress(true)}
      >
        <Text style={press ? styles.buttonTextPressed : styles.buttonText}>
          {title}
        </Text>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.primaryColor,

    shadowOffset: { width: 0, height: 4 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    elevation: 5,
  },
  buttonText: {
    color: Colors.primaryColor,
  },
  buttonTextPressed: {
    color: Colors.white,
  },
});
