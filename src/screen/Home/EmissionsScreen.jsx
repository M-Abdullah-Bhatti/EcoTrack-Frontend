import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import ChatbotButton from "../../components/Shared/ChatbotButton";

const EmissionsScreen = ({ navigation }) => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount((prevCount) => prevCount + 1);
  const dummyData = [
    {
      id: 1,
      category: "Train",
      type: "Transport",
      carbon: "19.74kgCO2eq",
      icon: (
        <MaterialCommunityIcons name="train-variant" size={24} color="black" />
      ),
    },
    {
      id: 2,

      category: "Train",
      type: "Transport",

      carbon: "19.74kgCO2eq",
      icon: (
        <MaterialCommunityIcons name="train-variant" size={24} color="black" />
      ),
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.monthDiv}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "900",
            color: "#2DBAA0",
            color: "#000",
          }}
        >
          Emissions
        </Text>
      </View>
      <View style={styles.monthDiv2}>
        <Text style={{ fontSize: 18, fontWeight: "400", color: "black" }}>
          December 2023
        </Text>
        <Ionicons name="chevron-forward" size={24} color="#2DBAA0" />
      </View>
      <View style={styles.emissionDataDiv}>
        {dummyData.map((data) => (
          <TouchableOpacity
            key={data.id}
            style={styles.singleEmissionDiv}
            onPress={() => navigation.navigate("EmissionDetail", { data })}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "50%",
                gap: 10,
                alignItems: "center",
              }}
            >
              <View>{data.icon}</View>
              <View>
                <Text>{data.category}</Text>
                <Text style={{ opacity: 0.57 }}>{data.carbon}</Text>
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Ionicons name="chevron-forward" size={24} color="#2DBAA0" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <ChatbotButton />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : "0px",
    backgroundColor: "white",
  },
  monthDiv: {
    height: 60,
    // backgroundColor: "#2DBAA0",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 14,
    justifyContent: "space-between",
    borderBottomColor: "#2DBAA0",
    borderBottomWidth: 2,
  },
  monthDiv2: {
    height: 60,
    // backgroundColor: "#2DBAA0",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 14,
    justifyContent: "space-between",
    borderBottomColor: "#2DBAA0",
    borderBottomWidth: 1.4,
  },
  singleEmissionDiv: {
    // flex: 1,
    display: "flex",
    borderBottomColor: "#2DBAA0",
    borderBottomWidth: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  emissionDataDiv: {
    flex: 1,
  },
});

export default EmissionsScreen;
