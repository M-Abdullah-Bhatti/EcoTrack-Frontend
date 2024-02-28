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
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { BarChart } from "react-native-gifted-charts";
import { PieChart } from "react-native-gifted-charts";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

import { EmissionData } from "../../dummyEmissionData";
import { GetAllMyEmissions } from "../../axios/NetworkCalls";
import axios from "axios";
import { useSelector } from "react-redux";
const UserDashboard = ({ navigation }) => {
  const options = ["Electricity", "Food", "Transport"];
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [CarbonData, setCarbonData] = useState([]);
  const [CarbonDataToBeSHown, setCarbonDataToBeSHown] = useState([]);
  const [CarbonDataToBeSHownInFormat, setCarbonDataToBeSHownInFormat] =
    useState([]);

  const fetchEmissionData = async () => {
    try {
      setLoading(true);
      const emissionData = await axios.get(
        "https://ecotrack-dev.vercel.app/api/emission/allMyEmission",
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (emissionData.data) {
        setCarbonData(emissionData.data);
        console.log("Data from api is", CarbonData);
        setCarbonDataToBeSHown(
          transformData(
            CarbonData.filter(
              (item) => item.category.toLowerCase() == selectedOpt.toLowerCase()
            )
          )
        );
      }
      setLoading(false);
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchEmissionData();
  }, []);
  useEffect(() => {
    setCarbonDataToBeSHown(
      transformData(
        CarbonData.filter(
          (item) => item.category.toLowerCase() === selectedOpt.toLowerCase()
        )
      )
    );
  }, [CarbonData, selectedOpt]);

  const handleCompleteGoal = (id) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, status: "Complete" } : goal
      )
    );
  };
  const [goals, setGoals] = useState([
    {
      id: 1,
      goal: "Walk about 3 km on feet instead of using bike",
      status: "Incomplete",
    },
    {
      id: 2,
      goal: "Reduce electricity consumption by  turning off electronics when not in use",
      status: "Complete",
    },
    {
      id: 3,
      goal: "Incorporate more plant-based meals into daily diet ",
      status: "Incomplete",
    },
    {
      id: 4,
      goal: "Opt for public transportation, carpooling, or biking for commuting to work or school instead of driving alone",
      status: "Complete",
    },
  ]);
  const getColor = (val) => {
    if (val <= 200) {
      return "#40916c";
    } else if (val > 200 && val <= 500) {
      return "#A7C957";
    } else {
      return "#BC4749";
    }
  };

  const transformData = (fetchedData) => {
    const transformedData = {};

    fetchedData.forEach((item) => {
      const { month, carbonEmitted } = item;
      if (!transformedData[month]) {
        transformedData[month] = {
          value: carbonEmitted,
          label: month,
          frontColor: getColor(carbonEmitted),
        };
      } else {
        transformedData[month].value += carbonEmitted;
        transformedData[month].frontColor = getColor(
          transformedData[month].value
        );
      }
    });

    // Convert object back to array
    const transformedArray = Object.values(transformedData);
    console.log("now array is", transformedArray);

    return transformedArray;
  };

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };
  const screenWidth = Dimensions.get("window").width;

  const { width } = Dimensions.get("screen");
  const pieData = [
    {
      value: 60,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      // focused: true,
    },
    { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
  ];

  const [selectedOpt, setSelectedOpt] = useState("Electricity");

  const handleSelectedOption = async (opt) => {
    setSelectedOpt(opt);
    setCarbonDataToBeSHown(
      transformData(
        CarbonData.filter(
          (item) => item.category.toLowerCase() === opt.toLowerCase()
        )
      )
    );
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
        <View
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
        </View>
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
        {
          loading ? (
            <Text>loading....</Text>
          ) : CarbonDataToBeSHown.length == 0 ? (
            <Text>No data available</Text>
          ) : (
            <BarChart
              barWidth={22}
              noOfSections={3}
              barBorderRadius={4}
              frontColor="lightgray"
              data={CarbonDataToBeSHown}
              yAxisThickness={0}
              xAxisThickness={0}
              width={screenWidth}
              xAxisLabelTexts={["Months", "Months"]}
              height={250}
            />
          )

          // <Text>hehehe</Text>
        }
      </View>
      <View
        style={{
          backgroundColor: "white",
          paddingVertical: 20,
          marginVertical: 7,
          height: "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 20 }}>
          Track Your Goals
        </Text>

        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={"#232B5D"}
          centerLabelComponent={() => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 18, color: "white", fontWeight: "bold" }}
                >
                  40% Goals
                </Text>
                <Text style={{ fontSize: 14, color: "white" }}>Achieved</Text>
              </View>
            );
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 150,
              marginRight: 20,
            }}
          >
            {renderDot("#006DFF")}
            <Text style={{ color: "black" }}>Not Completed: 60</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 150,
              marginRight: 20,
            }}
          >
            {renderDot("#3BE9DE")}
            <Text style={{ color: "black" }}>Completed: 40</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            height: "auto",
            justifyContent: "space-around",
            gap: 20,
            marginTop: 20,
          }}
        >
          {goals.map((goal, i) => (
            <View
              key={goal.id}
              style={{
                width: "94%",
                height: 79,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, // This is required for shadow to appear on iOS
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor:
                    goal.status == "Incomplete" ? "#fc5a42" : "#52b36c",
                }}
              ></View>
              <Text
                style={{
                  fontSize: 12,
                  width: "60%",
                  height: "auto",
                  textDecorationLine:
                    goal.status == "Complete" ? "line-through" : "none",
                }}
              >
                {goal.goal}
              </Text>
              <TouchableOpacity
                style={{
                  width: "30%",
                  paddingVertical: 10,
                  backgroundColor:
                    goal.status == "Incomplete" ? "#fc5a42" : "#52b36c",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  marginRight: 3,
                }}
                disabled={goal.status == "Complete"}
                onPress={() => handleCompleteGoal(goal.id)}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: "white",
                  }}
                >
                  {goal.status == "Incomplete" ? "Complete Now" : "Completed"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
