import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";

interface AppInputProps {
  styles?: ViewStyle;
  inputStyles?: TextStyle;
  placeholder?: string;
  getCurrentValue?: (value: string) => void;
  defaultValue?: string;
}

export default function AppInput(props: AppInputProps) {
  const [text, setText] = useState(props.defaultValue || "");

  const handleOnChange = (text: string) => {
    setText(text);
    props.getCurrentValue && props.getCurrentValue(text);
  };

  return (
    <View style={[styles.container, props.styles]}>
      <TextInput
        style={[styles.textInput, props.inputStyles]}
        placeholder={props.placeholder}
        onChangeText={handleOnChange}
        defaultValue={text}
        placeholderTextColor={Colors.appTextGray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 30,
    backgroundColor: Colors.appWhite,
    justifyContent: "center",

    shadowOffset: { width: 0, height: 4 },
    shadowColor: Colors.appShadowGray,
    shadowOpacity: 0.7,
    elevation: 5,
  },
  textInput: {
    height: 30,
    color: Colors.appTextGray,
  },
});
