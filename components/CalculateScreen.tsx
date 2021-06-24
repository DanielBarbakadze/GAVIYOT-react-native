import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import AppButton from "./AppButton";
import Screen from "./Screen";
import Colors from "../constants/Colors";
import AppAnchor from "./AppAnchor";
import { Text } from "./Themed";
import FriendListItem from "./FriendListItem";
import { FlatList } from "react-native-gesture-handler";
import { Portal } from "react-native-paper";
import { TouchableHighlight } from "react-native";

type FriendListDataItem ={
  name?: string;
  paid?: number;
  date?: string;
  type?: string;
  bank?: string;
  mustpay?: {
    name?: string;
    bank?: string;
    amount?: number;
  };
  refundExtra?: [
    {
      name?: string;
      bank?: string;
      amount?: number;
    }
  ];
  
};

export type FriendListData = {
  [id: string]: FriendListDataItem
};

export default function SignUpScreen() {
  const data = [{ numb: "1" }, { numb: "2" }, { numb: "3" }, { numb: "4" }];

  const [friendListData, setfriendListData] = useState<Array<FriendListData>>(
    []
  );

  const handleDataUpdate = (data: FriendListData) => {
    setfriendListData((prevData) => {
      let res = [prevData, data].reduce((acc: any, x: any) => {
        Object.keys(x).forEach((key) => {
          acc[key] = { ...acc[key], ...x[key] };
        });
        return acc;
      }, {});
      return res;
    });

  };

  useEffect(() => {
    console.log("----");
    console.log("friendListData --", JSON.stringify(friendListData, null, 4));
    console.log("----");
  }, [friendListData])

  const [calculateResult, setcalculateResult] = useState<FriendListDataItem[]>([]);

  const calculate = () => {
    let data = {...friendListData};
    
    let receiver: FriendListDataItem = {paid:0};
    let sumOfPaids:number = 0;

    // @ts-ignore
    let dataValues: FriendListDataItem[] = Object.values(data);

    dataValues.forEach(
      person => 
        { 
          if(person.paid !==undefined && receiver.paid !== undefined){            
              if(person.paid > receiver.paid) { 
                  receiver = person;
              };
              sumOfPaids += person.paid;
          }
        } 
    )

    receiver.refundExtra = [{}];

    // console.log(receiver)
    let updatedList = dataValues;
    updatedList.forEach(
      person => {
          if(person.name !== receiver.name && person.paid !==undefined) {
              let amount = sumOfPaids/updatedList.length - person.paid;
                if(amount < 0) {
                  if(receiver.refundExtra !==undefined){
                    receiver.refundExtra.push({
                        name: person.name,
                          bank: person.bank,
                          amount: -amount
                      })
                  }
                }
              person.mustpay = {
                  name: receiver.name,
                    bank: receiver.bank,
                    amount
                }
            }
        }
    );

    updatedList.forEach(
      person => {
        if(person.name === receiver.name){
          person = receiver;
        } 
      }
    )

    setcalculateResult(updatedList);
    setPopup(true);
    updatedList.map(({name,mustpay}) => console.log({name, mustpay}))
  }

  const [popup, setPopup] = useState(false)

  return (
    <Screen StatusBarColor={Colors.dodgeViolet}>
      <View style={styles.container}>
        {popup && (
          <TouchableHighlight
            style={styles.resultPoupWrapper}
            onPressIn={() => setPopup(false)}
          >
              <View style={styles.resultPoup}>
                <Text>Result</Text>
              </View>
          </TouchableHighlight>
        )}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/images/Logo-white.png")}
            />
          </View>
          <View style={styles.friendsList}>
            {/* <Portal.Host> */}
            <FlatList
              numColumns={2}
              data={data}
              keyExtractor={(i) => i.numb}
              renderItem={({ item }) => (
                <FriendListItem
                  numb={item.numb}
                  onDataUpdate={handleDataUpdate}
                  initialData={friendListData}
                />
              )}
            />
            {/* </Portal.Host> */}
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.buttonsContainer}>
            <AppButton title="Calculate" onPress={calculate} />
            <AppButton title="Log In" onPress={() => console.log("Log In")} />
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
  header: {
    width: "100%",
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoContainer: {
    width: "100%",
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  friendsList: {
    width: "100%",
    flex: 11,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "gray",
    marginBottom: 40,
  },
  footer: {
    flex: 1,
    marginEnd: 40,
    marginStart: 40,
  },
  logo: {
    height: 35,
    resizeMode: "contain",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultPoupWrapper: {
    height: "100%",
    width: "100%",
    position: "absolute",
    flex:1,
    elevation: 500,
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: Colors.blackTransparent,
  },
  resultPoup: {
    height: "70%",
    width: "70%",
    backgroundColor: Colors.appWhite,
    flex:1,
    position:"absolute",
    justifyContent: "center",
    alignItems:"center",
    borderRadius: 10
  }
});
