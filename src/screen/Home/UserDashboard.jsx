import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { BarChart } from "react-native-gifted-charts";

import { Ionicons } from "@expo/vector-icons";

import { EmissionData } from "../../dummyEmissionData";

const UserDashboard = ({ navigation }) => {
  const options = ["Electricity", "Food", "Transport"];
  const screenWidth = Dimensions.get("window").width;
  const data = {
    labels: ["Completed", "Not Completed"],
    data: [0.7, 0.3],
    colors: ["rgba(70, 166, 103, 1)", "rgba(242, 166, 73, 1)"],
  };
  const { width } = Dimensions.get("screen");

  const [selectedOpt, setSelectedOpt] = useState("Electricity");

  const handleSelectedOption = async (opt) => {
    setSelectedOpt(opt);
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={styles.header}>
        <View
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 13,
            // backgroundColor: "red",
          }}
        >
          <TouchableOpacity
            style={{
              height: 32,
              width: 32,
              backgroundColor: "white",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-circle" size={30} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              marginTop: 2,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Data Analysis
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: "50%",
            // backgroundColor: "red",
            display: "flex",
            flexDirection: "row",
            height: 60,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          onPress={() => alert("Aziz")}
        >
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20 }}>
            <Image
              source={require("../../../assets/prof.png")}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: "white",
          paddingVertical: 20,
          marginVertical: 15,
          height: "auto",
        }}
      >
        <View style={styles.optionsContainer}>
          {options.map((option, i) => (
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOpt === option && styles.selectedOption,
              ]}
              onPress={() => handleSelectedOption(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOpt === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <BarChart
          barWidth={22}
          noOfSections={3}
          barBorderRadius={4}
          frontColor="lightgray"
          data={EmissionData[selectedOpt]}
          yAxisThickness={0}
          xAxisThickness={0}
          width={screenWidth}
          xAxisLabelTexts={["Months", "Months"]}
          height={250}
        />
      </View>
      <View>
        <Text>Track Your Goals</Text>
        <ProgressChart
          data={data}
          width={width}
          height={250}
          strokeWidth={15}
          hasLegend={true}
          withCustomBarColorFromData={true}
          radius={35}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
            decimalPlaces: 2,
            useShadowColorFromDataset: false,
          }}
          style={{ paddingVertical: 8 }}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : "0px",
    // backgroundColor: "white",
    // position: "relative",
    // paddingBottom: 200,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 12,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    // backgroundColor: "",
    position: "fixed",
  },
  optionsContainer: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  optionButton: {
    borderWidth: 2,
    borderRadius: 20,
    //   padding: 10,
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  selectedOption: {
    backgroundColor: "#46A667",
    borderWidth: 0,
  },
  optionText: {
    color: "black",
  },
  selectedOptionText: {
    color: "white",
  },
});
export default UserDashboard;
