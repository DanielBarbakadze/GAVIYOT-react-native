import React from "react";
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
  return (
    <TouchableHighlight onPressIn={onPress} underlayColor={"transparent"}>
      <View style={styles.aContainer}>
        <Text style={styles.a}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  aContainer: {
    // backgroundColor: "red",
    // width: 130,
    height: 48,
  },
  a: {
    color: Colors.primaryColor,
  },
});
