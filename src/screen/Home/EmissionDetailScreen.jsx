import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const EmissionDetailScreen = () => {
  const route = useRoute();
  const dataOfEmission = route.params?.data;
  const [textOfMitigation, settextOfMitigation] = useState(
    "This emission hasn't been mitigated"
  );
  console.log("data", dataOfEmission);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  function formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }
  const today = new Date();
  const formattedDate = formatDate(today);
  const detailsHeadingToBeShown = [
    {
      id: 1,
      heading: "Type",
      text: dataOfEmission.category,
      text2: dataOfEmission.type,
    },
    {
      id: 2,

      heading: "Quantity",
      text: dataOfEmission.carbon,
    },
    {
      id: 3,

      heading: "Mitigation",
      textOfMitigation,
      switchBtn: true,
    },
    {
      id: 4,

      heading: "Date",
      text: formattedDate,
    },
  ];
  return (
    <View style={styles.container}>
      {/* <Text>EmissionDetailScreen</Text> */}
      <View>
        {detailsHeadingToBeShown.map((d) => (
          <View style={{ paddingVertical: 15 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {d.heading}
            </Text>
            <Text style={{ fontSize: 14, opacity: 0.5, marginTop: 10 }}>
              {d.text && d.text}
              {d.text2 && ` - ${d.text2}`}
              {d.textOfMitigation && d.textOfMitigation}
            </Text>
            {d.switchBtn && (
              <Switch
                trackColor={{ false: "#767577", true: "#048a73" }}
                // thumbColor={isEnabled ? "#048a73" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ alignSelf: "flex-start", marginLeft: -10 }}
              />
            )}
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#c43b0e",
          width: "100%",
          height: 50,
          borderRadius: 30,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
          Delete
        </Text>
        <Ionicons name="trash-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : "0px",
    backgroundColor: "white",
    borderTopColor: "#2DBAA0",
    borderTopWidth: 1,
    // justifyContent: "flex-start",
    // alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
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
export default EmissionDetailScreen;
