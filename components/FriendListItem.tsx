import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppInput from "./AppInput";
import Screen from "./Screen";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "./Themed";
import AppMoreButton from "./AppMoreButton";
import { FriendListData } from "./CalculateScreen";

export type onDataUpdate = (data: FriendListData) => void;

interface FriendListItemProps {
  numb: string;
  initialData: FriendListData[];
  onDataUpdate: onDataUpdate;
}

export default function FriendListItem({
  numb,
  initialData,
  onDataUpdate,
}: FriendListItemProps) {
  // const handleDataFileds = (fieldsData: FriendListData) => {
  // console.log({ ...prevData, ...data });
  // let res = [prevData, data].reduce((acc: any, x: any) => {
  //   Object.keys(x).forEach((key) => {
  //     acc[key] = { ...acc[key], ...x[key] };
  //   });
  //   return acc;
  // }, {});
  // };

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          style={styles.avatar}
          source={require("../assets/images/avatar.png")}
        />
        {/* <View style={styles.avatarBg} /> */}
        {/* <MaterialIcons name="person" size={42} color="black" /> */}
      </View>
      <View style={styles.inputWrapper}>
        <AppInput
          placeholder={`Your Name ${numb}`}
          styles={styles.input}
          inputStyles={{ fontSize: 10 }}
          getCurrentValue={(text: string) =>
            onDataUpdate({ [numb]: { name: text } })
          }
          defaultValue={(initialData[+numb]?.name as string) || ""}
        />
        <AppMoreButton
          onPress={() => console.log("more")}
          key={numb}
          numb={numb}
          // onDataUpdate={(fieldsData) => handleDataFileds(fieldsData)}
          onDataUpdate={onDataUpdate}
          initialData={initialData}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // backgroundColor: "black",
    alignItems: "center",
  },
  avatarWrapper: {
    width: "100%",
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  inputWrapper: {
    flex: 1,
    marginEnd: 40,
    marginStart: 40,
    // backgroundColor: "green",
    marginBottom: 24,
  },
  avatar: {
    height: 36,
    resizeMode: "contain",
  },
  avatarBg: {
    position: "absolute",
    // backgroundColor: "red",
    height: 36,
    width: 36,
    borderRadius: 50,
  },
  input: {
    width: 128,
    zIndex: 1, // works on ios
    elevation: 1, // works on android
  },
});
