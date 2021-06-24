import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
  Text,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";
import AppInput from "./AppInput";

import { Portal, Text as TextRNP } from "react-native-paper";
import { onDataUpdate } from "./FriendListItem";
import { FriendListData } from "./CalculateScreen";

export default function AppButton({
  onDataUpdate,
  onPress,
  style,
  numb,
  initialData,
}: {
  onDataUpdate: onDataUpdate;
  onPress: any;
  style?: ViewStyle;
  numb: string;
  initialData: FriendListData[];
}) {
  const [press, setPress] = useState(false);

  return (
    <View style={[styles.buttonContainer, style]}>
      <TouchableHighlight
        underlayColor={Colors.appGray}
        style={styles.button}
        // onPress={() => {
        //   onPress();
        //   setPress(!press);
        // }}
        onPressIn={() => {
          onPress();
          setPress(!press);
        }}
      >
        <>
          <Text style={styles.text}>{press ? "-" : "+"}</Text>

          {press && (
            <Portal>
              <TouchableHighlight
                underlayColor={Colors.appGray}
                style={styles.portalContainer}
                onPressIn={() => {
                  onPress();
                  setPress(!press);
                }}
              >
                <View style={styles.options}>
                  <View style={styles.option}>
                    <AppInput
                      placeholder={"Paid"}
                      getCurrentValue={(text: string) =>
                        onDataUpdate({ [numb]: { paid: parseInt(text) } })
                      }
                      defaultValue={
                        initialData[+numb]?.paid
                          ? JSON.stringify(initialData[+numb]?.paid)
                          : ""
                      }
                    />
                  </View>
                  <View style={styles.option}>
                    <AppInput
                      placeholder={"Date"}
                      getCurrentValue={(text: string) =>
                        onDataUpdate({ [numb]: { date: text } })
                      }
                      defaultValue={
                        initialData[+numb]?.date
                          ? JSON.stringify(initialData[+numb]?.date)
                          : ""
                      }/>
                  </View>
                  <View style={styles.option}>
                    <AppInput
                      placeholder={"Type"}
                      getCurrentValue={(text: string) =>
                        onDataUpdate({ [numb]: { type: text } })
                      }
                      defaultValue={
                        initialData[+numb]?.type
                          ? JSON.stringify(initialData[+numb]?.type)
                          : ""
                      }
                    />
                  </View>
                  <View style={styles.option}>
                    <AppInput
                      placeholder={"Bank"}
                      getCurrentValue={(text: string) =>
                        onDataUpdate({ [numb]: { bank: text } })
                      }
                      defaultValue={
                        initialData[+numb]?.bank
                          ? JSON.stringify(initialData[+numb]?.bank)
                          : ""
                      }
                    />
                  </View>
                </View>
              </TouchableHighlight>
            </Portal>
          )}
        </>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    // backgroundColor: "yellow",
    position: "absolute",
    zIndex: 1, // works on ios
    elevation: 1, // works on android
    height: 24,
    width: 24,
    top: 9,
    right: -9,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.appLightBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: 18,
    width: 18,
  },
  text: {
    color: Colors.primaryColor,
    fontSize: 16,
    position: "relative",
    top: -1,
  },
  options: {
    position: "absolute",
    width: "50%",
    // width: 128,
  },
  option: {
    marginBottom: 10,
  },
  portalContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
