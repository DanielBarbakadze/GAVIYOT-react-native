import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import AppButton from "./AppButton";
import Screen from "./Screen";
import Colors from "../constants/Colors";
import AppAnchor from "./AppAnchor";
import { Text } from "./Themed";
import FriendListItem from "./FriendListItem";
import { FlatList } from "react-native-gesture-handler";
import { Portal } from "react-native-paper";
import { TouchableHighlight } from "react-native";
import Toast from "react-native-simple-toast";

type FriendListDataItem = {
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
  cashBack?: [
    {
      name?: string;
      bank?: string;
      amount?: number;
    }
  ];
};

export type FriendListData = {
  [id: string]: FriendListDataItem;
};

export default function SignUpScreen() {
  const data = [{ numb: "1" }, { numb: "2" }, { numb: "3" }, { numb: "4" }];

  const testingData = {
    "1": {
      name: "Daniel",
      paid: 1000,
      date: "13.07.21",
      type: "საწვავი",
      bank: "GE77TB0011222233334444",
    },
    "2": {
      name: "Zaza",
      paid: 700,
      date: "14.07.21",
      type: "საკვები",
      bank: "GE77BG440000441122335566",
    },
    "3": {
      name: "Sandro",
      paid: 200,
      date: "12.07.21",
      type: "გართობა",
      bank: "GE77TB0099888877776666",
    },
    "4": {
      name: "Temuri",
      paid: 500,
      date: "15.07.21",
      type: "სხვა",
      bank: "GE77TB0000555511114444",
    },
  };

  const [friendListData, setfriendListData] = useState<Array<FriendListData>>(
    testingData as any
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
  }, [friendListData]);

  const [calculateResult, setcalculateResult] = useState<FriendListDataItem[]>(
    []
  );

  const [resultOne, setResultOne] = useState<any>([]);
  const [resultTwo, setResultTwo] = useState<FriendListDataItem>();

  const calculate = () => {
    setResultTwo(null as any);
    setResultOne([]);

    let data = { ...friendListData };

    let receiver: FriendListDataItem = { paid: 0 };
    let sumOfPaids: number = 0;

    // @ts-ignore
    let dataValues: FriendListDataItem[] = Object.values(data);

    dataValues.forEach((person) => {
      if (person.paid !== undefined && receiver.paid !== undefined) {
        if (person.paid > receiver.paid) {
          receiver = person;
        }
        sumOfPaids += person.paid;
      }
    });

    receiver.cashBack = [{}];

    let updatedList = dataValues;
    updatedList.forEach((person) => {
      if (person.name !== receiver.name && person.paid !== undefined) {
        let amount = sumOfPaids / updatedList.length - person.paid;
        if (amount < 0) {
          if (receiver.cashBack !== undefined) {
            receiver.cashBack.push({
              name: person.name,
              bank: person.bank,
              amount: -amount,
            });
          }
        }
        person.mustpay = {
          name: receiver.name,
          bank: receiver.bank,
          amount,
        };
      }
    });

    updatedList.forEach((person) => {
      if (person.name === receiver.name) {
        person = receiver;
      }
    });

    setcalculateResult(updatedList);
    setPopup(true);

    setResultTwo(receiver);
    // console.log({ receiver });
    updatedList.map(({ name, mustpay }) =>
      setResultOne((prevState: any) => {
        return [...prevState, { name, mustpay }];
      })
    );
  };

  const [popup, setPopup] = useState(false);

  return (
    <Screen StatusBarColor={Colors.dodgeViolet}>
      <View style={styles.container}>
        {popup && (
          <TouchableHighlight
            style={styles.resultPoupWrapper}
            onPressIn={() => setPopup(false)}
          >
            <View style={styles.resultPoup}>
              <ScrollView>
                <View>
                  {resultTwo?.cashBack && resultTwo?.cashBack?.length > 1 && (
                    <View
                      style={{
                        backgroundColor: Colors.white,
                        borderRadius: 10,
                        marginBottom: 10,
                      }}
                    >
                      <View style={styles.receiverWrapper}>
                        <Text style={styles.receiverTitle}>
                          დაბრუნების სქემა:
                        </Text>
                        <View style={styles.receiverContentHACK}>
                          <Text style={styles.receiverSubtitleHACK} />
                          <Text style={styles.receiverNameHACK} />
                        </View>
                        <View style={styles.receiverContent}>
                          <Text style={styles.receiverSubtitle}>
                            დამბრუნებელი:{" "}
                          </Text>
                          <Text style={styles.receiverName}>
                            {resultTwo?.name}
                          </Text>
                        </View>
                      </View>

                      <View>
                        {resultTwo.cashBack.map((item, idx) => (
                          <View key={`two${idx}`} style={styles.cashBackPeope}>
                            {item?.name && (
                              <View style={styles.cashBackContentWrapper}>
                                <View style={styles.cashBackHeader}>
                                  <View style={styles.cashBackTitle}>
                                    <Text>მიმღები: </Text>
                                    <Text style={styles.cashBackPerson}>
                                      {item.name}
                                    </Text>
                                  </View>
                                  <View>
                                    <Text style={styles.cashBackMoney}>
                                      {item.amount} ₾
                                    </Text>
                                  </View>
                                </View>
                                <View style={styles.ibanWrapper}>
                                  <Text>IBAN:</Text>
                                  <Text style={styles.ibanNumber}>
                                    {item.bank}
                                  </Text>
                                </View>
                              </View>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  {!resultOne
                    .slice(1)
                    .every((item: any) => item.mustpay.amount === 0) && (
                    <View style={styles.equalingWrapper}>
                      <Text style={styles.equalingTitle}>
                        გათანაბრების სქემა:
                      </Text>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "center",
                          marginTop: 10,
                          marginBottom: 10,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{ textAlign: "center", color: Colors.white }}
                        >
                          მიმღები:{" "}
                        </Text>
                        <Text
                          style={{
                            color: Colors.white,
                            fontWeight: "bold",
                            fontSize: 20,
                          }}
                        >
                          {resultTwo?.name}
                        </Text>
                      </View>

                      {resultOne.map((item: any, idx: number) => (
                        <View key={`ro${idx}`}>
                          {item.mustpay !== undefined &&
                            item.mustpay.amount > 0 && (
                              <View style={styles.equalingContent}>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Text style={{ color: Colors.white }}>
                                      გამგზავნი:{" "}
                                    </Text>
                                    <Text
                                      style={{
                                        color: Colors.white,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {item.name}
                                    </Text>
                                  </View>

                                  <View>
                                    <Text style={styles.mustPayMoney}>
                                      {item.mustpay.amount} ₾
                                    </Text>
                                  </View>
                                </View>

                                <View style={styles.ibanWrapper}>
                                  <Text style={{ color: Colors.white }}>
                                    IBAN:
                                  </Text>
                                  <Text style={styles.ibanNumber}>
                                    {item.mustpay.bank}
                                  </Text>
                                </View>
                              </View>
                            )}
                        </View>
                      ))}
                    </View>
                  )}

                  {resultOne
                    .slice(1)
                    .every((item: any) => item.mustpay.amount === 0) &&
                    resultTwo?.cashBack &&
                    resultTwo?.cashBack?.length <= 1 && (
                      <View>
                        <Text style={{ color: Colors.white, marginTop: 225 }}>
                          არ საჭიროებს გაყოფას
                        </Text>
                      </View>
                    )}
                </View>
              </ScrollView>
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
            <AppButton
              title="Log In"
              onPress={() => Toast.show("Log In page")}
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
    flex: 1,
    elevation: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blackTransparent,
  },
  resultPoup: {
    height: "70%",
    width: "70%",
    // backgroundColor: Colors.appWhite,
    backgroundColor: Colors.primaryColor,
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  cashBackPeope: {
    marginLeft: 10,
    marginRight: 10,
  },
  cashBackContentWrapper: { marginBottom: 20 },
  cashBackHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cashBackTitle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cashBackPerson: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.secondaryColor,
  },
  cashBackMoney: {
    color: Colors.white,
    fontWeight: "bold",
    backgroundColor: Colors.moneyRed,
    padding: 4,
    borderRadius: 3,
    fontSize: 12,
  },
  ibanWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  ibanNumber: {
    width: "80%",
    textAlign: "center",
    fontSize: 12,
    backgroundColor: Colors.appLightBlue,
    padding: 4,
    borderRadius: 30,
    marginLeft: 4,
  },
  mustPayMoney: {
    color: Colors.white,
    fontWeight: "bold",
    backgroundColor: Colors.moneyGreen,
    padding: 4,
    borderRadius: 3,
    fontSize: 12,
  },
  receiverWrapper: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  receiverTitle: {
    marginTop: 20,
    fontWeight: "bold",
  },
  receiverContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  receiverSubtitle: {
    fontSize: 14,
  },
  receiverName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.appBlue,
  },
  receiverContentHACK: {
    width: "100%",
    flexDirection: "row",
  },
  receiverSubtitleHACK: {
    width: "50%",
    height: 0,
  },
  receiverNameHACK: {
    width: "50%",
    height: 0,
  },
  equalingWrapper: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.primaryColor,
  },
  equalingTitle: {
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
  },
  equalingContent: {
    marginBottom: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    borderRadius: 4,
  },
});
