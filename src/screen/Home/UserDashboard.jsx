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
import ModalTemplate from "../../components/Shared/ModalTemplate";
import { useFocusEffect } from "@react-navigation/native";
const UserDashboard = ({ navigation }) => {
  const options = ["Electricity", "Food", "Transportation"];
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [successWhileFetching, setsuccessWhileFetching] = useState(false);
  const [errorWhileFetching, seterrorWhileFetching] = useState(false);
  const [completedGoals, setcompletedGoals] = useState(0);
  const [IncompletedGoals, setIncompletedGoals] = useState(0);
  console.log("user in lc is", user);
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
  const renderTitle = () => {
    return (
      <View style={{ marginVertical: 3 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 7,
            marginBottom: 10,
            // backgroundColor: "yellow",
            width: "100%",
            // height: 120,

            paddingLeft: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#177AD5",
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 20,
                color: "black",
              }}
            >
              Food
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#ED6665",
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 110,
                height: 20,
                color: "black",
              }}
            >
              Electricity
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#46A667",
                marginRight: 10,
              }}
            />
            <Text
              style={{
                width: 110,
                height: 20,
                color: "black",
              }}
            >
              Transportation
            </Text>
          </View>
        </View>
      </View>
    );
  };

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
        // console.log("emm", emissionData.data);

        setCarbonDataToBeSHown(transformData(emissionData.data));
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

  // const transformData = (fetchedData, opt) => {
  //   const transformedData = {};
  //   // console.log("siuu", fetchedData);
  //   console.log("siuuc", opt);
  //   console.log("siuuc=year", year);
  //   fetchedData
  //     .filter(
  //       (item) =>
  //         item.category == opt && new Date(item.createdAt).getFullYear() == year
  //     )
  //     .forEach((item) => {
  //       console.log("2item", item);
  //       const date = new Date(item.createdAt);
  //       const month = date.getMonth() + 1; // Months are zero-based
  //       const carbonEmitted = item.carbonEmitted;

  //       if (!transformedData[month]) {
  //         transformedData[month] = {
  //           value: carbonEmitted,
  //           dataPointText: `${carbonEmitted}`,
  //         };
  //       } else {
  //         transformedData[month].value += carbonEmitted;
  //         transformedData[
  //           month
  //         ].dataPointText = `${transformedData[month].value}`;
  //       }
  //     });
  //   const monthNames = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  //   const transformedArray = Object.keys(transformedData).map((month) => ({
  //     value: transformedData[month].value,
  //     // dataPointText: transformedData[month].dataPointText,
  //     label: monthNames[month - 1],
  //   }));
  //   // setelectricityData
  //   console.log("Transformed", transformedArray);

  //   return transformedArray;
  // };
  const transformData = (fetchedData) => {
    const transformedData = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let i = 0; i < 12; i++) {
      const month = monthNames[i];
      const monthData = fetchedData.filter((item) => {
        const date = new Date(item.createdAt);
        return date.getFullYear() === year && date.getMonth() === i;
      });
      console.log("asdhff", monthData);
      // Calculate total carbon emitted for each category in this month
      const categoryValues = {
        Electricity: 0,
        Food: 0,
        Transportation: 0,
      };

      monthData.forEach((item) => {
        if (item.category == "Food" || item.category == "Meal") {
          console.log("uess", item.carbonEmitted);
          categoryValues.Food += item.carbonEmitted;
        } else {
          categoryValues[item.category] += item.carbonEmitted;
        }
      });

      // Check if any category has non-zero emissions
      const hasNonZeroEmissions = Object.values(categoryValues).some(
        (value) => value > 0
      );

      // Only add month data if any category has non-zero emissions
      if (hasNonZeroEmissions) {
        console.log("jsdsf", categoryValues.Food);
        if (categoryValues.Food > 0) {
          transformedData.push({
            value: categoryValues.Food,
            label: month,
            // spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: "gray" },
            frontColor: "#177AD5", // Customize as needed
          });
        }
        if (categoryValues.Food > 0) {
          transformedData.push({
            value: categoryValues.Electricity,
            frontColor: "#ED6665", // Customize as needed
          });
        } else {
          if (categoryValues.Electricity > 0) {
            transformedData.push({
              value: categoryValues.Electricity,
              frontColor: "#ED6665", // Customize as needed
              label: month,
              // spacing: 2,
              labelWidth: 30,
              labelTextStyle: { color: "gray" },
            });
          } else {
            transformedData.push({
              value: categoryValues.Electricity,
              frontColor: "#ED6665", // Customize as needed
            });
          }
        }

        if (categoryValues.Food > 0 || categoryValues.Electricity > 0) {
          transformedData.push({
            value: categoryValues.Transportation,
            frontColor: "#46A667", // Customize as needed
          });
        } else {
          transformedData.push({
            value: categoryValues.Transportation,
            frontColor: "#46A667", // Customize as needed
            label: month,
            // spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: "gray" },
          });
        }
      }
    }
    console.log("trrr", transformedData);
    return transformedData;
  };

  const handleCompleteGoal = async (id) => {
    try {
      setLoadingGoalId(id);
      seterrorWhileFetching(false);
      setsuccessWhileFetching(false);
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
      setsuccessWhileFetching(true);
      setModalVisibleForGoal(true);
    } catch (error) {
      setModalVisibleForGoal(true);
      console.error("Error completing goal:", error);
      seterrorWhileFetching(true);

      // Handle error appropriately, such as displaying an error message
    } finally {
      setLoadingGoalId(null);
      // seterrorWhileFetching(false);
      // Reset loading state
    }
  };
  const handleDecreaseYear = () => {
    if (year > 2023) {
      setyear(year - 1);
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //   }, [])
  // );
  useEffect(() => {
    setCarbonDataToBeSHown(transformData(CarbonData));
    console.log("uearr");
  }, [year]);
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
    console.log("select opttt", selectedOpt);
    // setyear(2023);
    // setCarbonDataToBeSHown(transformData(CarbonData, opt));
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* <ModalTemplate
        isVisible={ModalVisibleForGoal}
        hideModal={() => setModalVisibleForGoal(false)}
        success={successWhileFetching}
        error={errorWhileFetching}
        title={
          errorWhileFetching
            ? "Error"
            : successWhileFetching
            ? "Goal Completed"
            : null
        }
        description={
          errorWhileFetching
            ? "There was an error while completing the goal"
            : successWhileFetching
            ? "Congratulations! You have successfully completed a goal."
            : null
        }
      />
      <View
        style={[styles.overlay, modalGoalId !== null && styles.overlayVisible]}
      ></View> */}
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
        {/* <View style={styles.optionsContainer}>
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
        </View> */}
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
              {renderTitle()}
              <BarChart
                barWidth={8}
                noOfSections={12}
                barBorderRadius={4}
                frontColor="lightgray"
                data={CarbonDataToBeSHown}
                yAxisThickness={0}
                xAxisThickness={0}
                labelWidth={190}
                initialSpacing={20}
                // width={screenWidth}
                // xAxisLabelTexts={["Months", "Months"]}
                height={250}
                width={width}
                spacing={6}
              />
            </View>
          )

          // <Text>hehehe</Text>
        }
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

//  <View
//    style={{
//      backgroundColor: "white",
//      paddingVertical: 20,
//      marginVertical: 7,
//      height: "auto",
//      display: "flex",
//      alignItems: "center",
//    }}
//  >
//    <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>
//      Track Your Goals
//    </Text>
//    {loadingForGoals ? (
//      <Text style={{ textAlign: "center", marginVertical: 10, fontSize: 10 }}>
//        <ActivityIndicator size="large" color="#00ff00" />
//      </Text>
//    ) : goalsData.length == 0 ? (
//      <Text>No data available for your goals</Text>
//    ) : (
//      <>
//        <PieChart
//          data={pieData}
//          donut
//          showGradient
//          sectionAutoFocus
//          radius={90}
//          innerRadius={60}
//          innerCircleColor={"#232B5D"}
//          centerLabelComponent={() => {
//            return (
//              <View style={{ justifyContent: "center", alignItems: "center" }}>
//                <Text
//                  style={{
//                    fontSize: 18,
//                    color: "white",
//                    fontWeight: "bold",
//                  }}
//                >
//                  {completedPercentage.toFixed(0)}% Goals
//                </Text>
//                <Text style={{ fontSize: 14, color: "white" }}>Achieved</Text>
//              </View>
//            );
//          }}
//        />
//        <View
//          style={{
//            flexDirection: "row",
//            justifyContent: "center",
//            marginVertical: 10,
//          }}
//        >
//          <View
//            style={{
//              flexDirection: "row",
//              alignItems: "center",
//              width: 150,
//              marginRight: 20,
//            }}
//          >
//            {renderDot("#006DFF")}
//            <Text style={{ color: "black" }}>
//              Not Completed: {IncompletedGoals}
//            </Text>
//          </View>
//        </View>
//        <View style={{ flexDirection: "row", justifyContent: "center" }}>
//          <View
//            style={{
//              flexDirection: "row",
//              alignItems: "center",
//              width: 150,
//              marginRight: 20,
//            }}
//          >
//            {renderDot("#3BE9DE")}
//            <Text style={{ color: "black" }}>Completed: {completedGoals}</Text>
//          </View>
//        </View>
//        <View
//          style={{
//            width: "100%",
//            display: "flex",
//            alignItems: "center",
//            height: "auto",
//            justifyContent: "space-around",
//            gap: 20,
//            marginTop: 20,
//          }}
//        >
//          {goalsData.map((goal, i) => (
//            <View
//              key={goal._id}
//              style={{
//                width: "94%",
//                height: 79,
//                shadowColor: "#000",
//                shadowOffset: { width: 0, height: 2 },
//                shadowOpacity: 0.25,
//                shadowRadius: 3.84,
//                elevation: 5, // This is required for shadow to appear on iOS
//                backgroundColor: "white",
//                display: "flex",
//                flexDirection: "row",
//                justifyContent: "space-around",
//                alignItems: "center",
//              }}
//            >
//              {modalGoalId === goal._id && (
//                <Modal
//                  animationType="slide"
//                  transparent={true}
//                  visible={modalGoalId === goal._id}
//                >
//                  <View style={styles.goalModal}>
//                    <TouchableOpacity
//                      onPress={() => setModalGoalId(null)}
//                      style={{ alignSelf: "flex-end", marginRight: 10 }}
//                    >
//                      <Entypo name="circle-with-cross" size={20} color="black" />
//                    </TouchableOpacity>
//                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
//                      Goal number: {i + 1}
//                    </Text>
//                    <Text
//                      style={{
//                        width: "90%",
//                        textAlign: "center",
//                        fontSize: 14,
//                        fontWeight: "600",
//                      }}
//                    >
//                      {goal.goalText}
//                    </Text>
//                    <Text style={{ fontWeight: "bold" }}>
//                      Created On:
//                      <Text style={{ fontWeight: "normal" }}>
//                        {goal.createdAt.substr(0, 10)}
//                      </Text>
//                    </Text>
//                    <Text style={{ fontWeight: "bold" }}>
//                      Status:
//                      <Text style={{ fontWeight: "normal" }}>
//                        {goal.goalStatus}{" "}
//                        {goal.goalStatus !== "Incomplete" ? (
//                          <FontAwesome
//                            name="check-circle"
//                            size={14}
//                            color="green"
//                          />
//                        ) : (
//                          <Entypo
//                            name="circle-with-cross"
//                            size={14}
//                            color="red"
//                          />
//                        )}
//                      </Text>
//                    </Text>
//                    {goal.goalStatus != "Incomplete" && (
//                      <Text style={{ fontWeight: "bold" }}>
//                        Completed On:
//                        <Text style={{ fontWeight: "normal" }}>
//                          {goal.dateWhenGoalCompleted.substr(0, 10)}
//                        </Text>
//                      </Text>
//                    )}
//                  </View>
//                </Modal>
//              )}
//              <View
//                style={{
//                  width: 12,
//                  height: 12,
//                  borderRadius: 6,
//                  backgroundColor:
//                    goal.goalStatus == "Incomplete" ? "#fc5a42" : "#52b36c",
//                }}
//              ></View>
//              <Text
//                style={{
//                  fontSize: 12,
//                  width: "60%",
//                  height: "auto",
//                  textDecorationLine:
//                    goal.goalStatus == "complete" ? "line-through" : "none",
//                }}
//              >
//                {goal.goalText}
//              </Text>
//              {/* <TouchableOpacity
//                 style={{
//                   width: "30%",
//                   paddingVertical: 10,
//                   backgroundColor:
//                     goal.status == "Incomplete" ? "#fc5a42" : "#52b36c",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   borderRadius: 10,
//                   marginRight: 3,
//                 }}
//                 disabled={goal.status == "Complete"}
//                 onPress={() => handleCompleteGoal(goal.id)}
//               >
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     color: "white",
//                   }}
//                 >
//                   {goal.status == "Incomplete" ? "Complete Now" : "Completed"}
//                 </Text>
//               </TouchableOpacity> */}
//              <TouchableOpacity onPress={() => setModalGoalId(goal._id)}>
//                <AntDesign name="upcircleo" size={22} color="black" />
//              </TouchableOpacity>
//              {goal.goalStatus !== "Incomplete" ? (
//                <FontAwesome name="check-circle" size={24} color="green" />
//              ) : loadingGoalId == goal._id ? (
//                <ActivityIndicator size="small" color="#00ff00" />
//              ) : (
//                <TouchableOpacity onPress={() => handleCompleteGoal(goal._id)}>
//                  <Fontisto name="checkbox-passive" size={22} color="black" />
//                </TouchableOpacity>
//              )}
//            </View>
//          ))}
//        </View>
//      </>
//    )}
//  </View>;
