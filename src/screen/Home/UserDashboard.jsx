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
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { BarChart } from "react-native-gifted-charts";
import { PieChart } from "react-native-gifted-charts";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Ionicons,
  FontAwesome,
  Fontisto,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";

import { EmissionData } from "../../dummyEmissionData";
import { GetAllMyEmissions } from "../../axios/NetworkCalls";
import axios from "axios";
import { useSelector } from "react-redux";
const UserDashboard = ({ navigation }) => {
  const options = ["Electricity", "Food", "Transport"];
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [completedGoals, setcompletedGoals] = useState(0);
  const [IncompletedGoals, setIncompletedGoals] = useState(0);
  const boxShadowStyle = Platform.select({
    ios: {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  });

  const [loadingForGoals, setLoadingForGoals] = useState(false);
  const [CarbonData, setCarbonData] = useState([]);
  const [goalsData, setgoalsData] = useState([]);
  const [CarbonDataToBeSHown, setCarbonDataToBeSHown] = useState([]);
  const [ModalVisibleForGoal, setModalVisibleForGoal] = useState(false);
  const [modalGoalId, setModalGoalId] = useState(null);
  const [loadingGoalId, setLoadingGoalId] = useState(null);
  const [year, setyear] = useState(2023);
  const { width } = Dimensions.get("screen");

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
  const fetchGoalsOfUserData = async () => {
    try {
      setLoadingForGoals(true);
      const goalsDataFromApi = await axios.get(
        "https://ecotrack-dev.vercel.app/api/goal",
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (goalsDataFromApi.data) {
        setgoalsData(goalsDataFromApi.data);
        // console.log("Data from goals api is", goalsData);
        // setCarbonDataToBeSHown(
        //   transformData(
        //     CarbonData.filter(
        //       (item) => item.category.toLowerCase() == selectedOpt.toLowerCase()
        //     )
        //   )
        // );
      }
      setLoadingForGoals(false);
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };
  const fetchGoalById = async (id) => {
    try {
      const { data } = await axios.get(
        `https://ecotrack-dev.vercel.app/api/goal/${id}`,
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Update the goals data with the updated goal
      setgoalsData((prevGoalsData) =>
        prevGoalsData.map((goal) => (goal._id === id ? data : goal))
      );
    } catch (error) {
      console.error("Error fetching goal:", error);
      // Handle error appropriately, such as displaying an error message
    }
  };

  const totalGoals = completedGoals + IncompletedGoals;
  const completedPercentage = (completedGoals / totalGoals) * 100;
  useEffect(() => {
    fetchEmissionData();
    fetchGoalsOfUserData();
  }, []);
  useEffect(() => {
    setCarbonDataToBeSHown(
      transformData(
        CarbonData.filter(
          (item) =>
            item.category.toLowerCase() === selectedOpt.toLowerCase() &&
            item.year == year
        )
      )
    );
    console.log("Data from api is", CarbonData);
    let completedCount = 0;
    let incompletedCount = 0;
    goalsData.forEach((goal) => {
      if (goal.goalStatus === "Incomplete") {
        incompletedCount++;
      } else {
        completedCount++;
      }
    });
    setIncompletedGoals(incompletedCount);
    setcompletedGoals(completedCount);
    console.log("now goals are", goalsData.length);
  }, [CarbonData, selectedOpt, goalsData, year]);

  const handleCompleteGoal = async (id) => {
    try {
      setLoadingGoalId(id);
      const { data } = await axios.put(
        `https://ecotrack-dev.vercel.app/api/goal/${id}`,
        {
          goalStatus: "complete",
          dateWhenGoalCompleted: new Date().toISOString(),
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("now data is", data);
      // Fetch goals again after completion
      fetchGoalById(id);
    } catch (error) {
      console.error("Error completing goal:", error);
      // Handle error appropriately, such as displaying an error message
    } finally {
      setLoadingGoalId(null); // Reset loading state
    }
  };
  const handleDecreaseYear = () => {
    if (year > 2023) {
      setyear(year - 1);
    }
  };

  const handleIncreaseYear = () => {
    setyear(year + 1);
  };

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
    // console.log("now array is", transformedArray);

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

  const pieData = [
    {
      value: completedGoals,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      // focused: true,
    },
    {
      value: IncompletedGoals,
      color: "#93FCF8",
      gradientCenterColor: "#3BE9DE",
    },
  ];

  const [selectedOpt, setSelectedOpt] = useState("Electricity");

  const handleSelectedOption = async (opt) => {
    setSelectedOpt(opt);
    setyear(2023);
    setCarbonDataToBeSHown(
      transformData(
        CarbonData.filter(
          (item) =>
            item.category.toLowerCase() === opt.toLowerCase() &&
            item.year == year
        )
      )
    );
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View
        style={[styles.overlay, modalGoalId !== null && styles.overlayVisible]}
      ></View>
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
            <ActivityIndicator size="large" color="#00ff00" />
          ) : CarbonDataToBeSHown.length == 0 ? (
            <>
              <View
                style={{
                  width: "100%",
                  height: 40,
                  marginVertical: 10,
                  // backgroundColor: "red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <TouchableOpacity onPress={handleDecreaseYear}>
                  <AntDesign name="leftcircleo" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "700" }}>{year}</Text>
                <TouchableOpacity onPress={handleIncreaseYear}>
                  <AntDesign name="rightcircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  marginVertical: 10,
                }}
              >
                No data available for {selectedOpt} and year:{year}
              </Text>
            </>
          ) : (
            <View>
              <View
                style={{
                  width: "100%",
                  height: 40,
                  marginVertical: 10,
                  // backgroundColor: "red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <TouchableOpacity onPress={handleDecreaseYear}>
                  <AntDesign name="leftcircleo" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "700" }}>{year}</Text>
                <TouchableOpacity onPress={handleIncreaseYear}>
                  <AntDesign name="rightcircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
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
            </View>
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
        <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>
          Track Your Goals
        </Text>
        {loadingForGoals ? (
          <Text
            style={{ textAlign: "center", marginVertical: 10, fontSize: 10 }}
          >
            <ActivityIndicator size="large" color="#00ff00" />
          </Text>
        ) : goalsData.length == 0 ? (
          <Text>No data available for your goals</Text>
        ) : (
          <>
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
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {completedPercentage.toFixed(0)}% Goals
                    </Text>
                    <Text style={{ fontSize: 14, color: "white" }}>
                      Achieved
                    </Text>
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
                <Text style={{ color: "black" }}>
                  Not Completed: {IncompletedGoals}
                </Text>
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
                <Text style={{ color: "black" }}>
                  Completed: {completedGoals}
                </Text>
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
              {goalsData.map((goal, i) => (
                <View
                  key={goal._id}
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
                  {modalGoalId === goal._id && (
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalGoalId === goal._id}
                    >
                      <View style={styles.goalModal}>
                        <TouchableOpacity
                          onPress={() => setModalGoalId(null)}
                          style={{ alignSelf: "flex-end", marginRight: 10 }}
                        >
                          <Entypo
                            name="circle-with-cross"
                            size={20}
                            color="black"
                          />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                          Goal number: {i + 1}
                        </Text>
                        <Text
                          style={{
                            width: "90%",
                            textAlign: "center",
                            fontSize: 14,
                            fontWeight: "600",
                          }}
                        >
                          {goal.goalText}
                        </Text>
                        <Text style={{ fontWeight: "bold" }}>
                          Created On:
                          <Text style={{ fontWeight: "normal" }}>
                            {goal.createdAt.substr(0, 10)}
                          </Text>
                        </Text>
                        <Text style={{ fontWeight: "bold" }}>
                          Status:
                          <Text style={{ fontWeight: "normal" }}>
                            {goal.goalStatus}{" "}
                            {goal.goalStatus !== "Incomplete" ? (
                              <FontAwesome
                                name="check-circle"
                                size={14}
                                color="green"
                              />
                            ) : (
                              <Entypo
                                name="circle-with-cross"
                                size={14}
                                color="red"
                              />
                            )}
                          </Text>
                        </Text>
                        {goal.goalStatus != "Incomplete" && (
                          <Text style={{ fontWeight: "bold" }}>
                            Completed On:
                            <Text style={{ fontWeight: "normal" }}>
                              {goal.dateWhenGoalCompleted.substr(0, 10)}
                            </Text>
                          </Text>
                        )}
                      </View>
                    </Modal>
                  )}
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor:
                        goal.goalStatus == "Incomplete" ? "#fc5a42" : "#52b36c",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: 12,
                      width: "60%",
                      height: "auto",
                      textDecorationLine:
                        goal.goalStatus == "complete" ? "line-through" : "none",
                    }}
                  >
                    {goal.goalText}
                  </Text>
                  {/* <TouchableOpacity
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
              </TouchableOpacity> */}
                  <TouchableOpacity onPress={() => setModalGoalId(goal._id)}>
                    <AntDesign name="upcircleo" size={22} color="black" />
                  </TouchableOpacity>
                  {goal.goalStatus !== "Incomplete" ? (
                    <FontAwesome name="check-circle" size={24} color="green" />
                  ) : loadingGoalId == goal._id ? (
                    <ActivityIndicator size="small" color="#00ff00" />
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleCompleteGoal(goal._id)}
                    >
                      <Fontisto
                        name="checkbox-passive"
                        size={22}
                        color="black"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : "0px",
    // backgroundColor: "white",
    position: "relative",
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
  goalModal: {
    width: "96%",
    height: "auto",
    backgroundColor: "white",
    marginHorizontal: "2%",
    display: "flex",
    marginTop: 200,
    alignItems: "center",
    gap: 10,
    paddingBottom: 27,
    paddingTop: 5,
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    display: "none",
    zIndex: 10,
  },
  overlayVisible: {
    display: "flex",
  },
});
export default UserDashboard;
