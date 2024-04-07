import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import ChatbotButton from "../../components/Shared/ChatbotButton";
import axios from "axios";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { renderEmissionIcon } from "../../utils/renderIcon";
import { allEmissionItems, food } from "../../data";
import { useFocusEffect } from "@react-navigation/native";

const EmissionsScreen = ({ navigation }) => {
  const [count, setCount] = useState(0);
  const [loadingForFilteringEmissions, setloadingForFilteringEmissions] =
    useState(false);
  const [emissionsData, setemissionsData] = useState([]);
  const [filteredemissionsData, setfilteredemissionsData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const onPress = () => setCount((prevCount) => prevCount + 1);

  const [currentYear, setCurrentYear] = useState(0);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(10); // November is index 10
  const [selectedMonthYear, setSelectedMonthYear] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();
    setCurrentYear(currentYear);
    setCurrentMonthIndex(currentMonthIndex);
    setSelectedMonthYear(
      `${currentDate.toLocaleString("default", {
        month: "long",
      })} ${currentYear}`
    );
  }, []);

  const changeMonth = (increment) => {
    let newMonthIndex = currentMonthIndex + increment;
    let newYear = currentYear;
    // Ensure it doesn't go below November 2023
    if (newYear === 2023 && newMonthIndex < 10) {
      newMonthIndex = 10;
    }
    // console.log("object");

    // // // Ensure it doesn't go beyond the current month
    const currentDateCheck = new Date();
    const currentYearCheck = currentDateCheck.getFullYear();
    const currentMonthIndexCheck = currentDateCheck.getMonth();
    // console.log("cc", newMonthIndex);
    // console.log("cc", currentYearCheck);
    // // console.log("cc", newYear);
    if (
      newYear === currentYearCheck &&
      newMonthIndex > currentMonthIndexCheck
    ) {
      newMonthIndex = currentMonthIndex;
    }
    if (newMonthIndex < 0) {
      newMonthIndex = 11; // December
      newYear -= 1;
      // console.log("new year", newYear);
      // console.log("new motn", newMonthIndex);
    } else if (newMonthIndex > 11) {
      newMonthIndex = 0; // January
      newYear += 1;
    }
    setCurrentYear(newYear);
    setCurrentMonthIndex(newMonthIndex);
    setSelectedMonthYear(
      `${new Date(2023, newMonthIndex).toLocaleString("default", {
        month: "long",
      })} ${newYear}`
    );
  };

  const renderEmissionIcon = (category, subCategory) => {
    const item = allEmissionItems.find((i) => i.text == subCategory);
    return item ? (
      item.icon
    ) : (
      <MaterialCommunityIcons
        name="power-plug-outline"
        size={30}
        color="black"
      />
    );
  };

  const getAllEmissions = async () => {
    try {
      setloadingForFilteringEmissions(true);

      const response = await axios.get(
        "https://ecotrack-dev.vercel.app//api/emission/allMyEmission",
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      setemissionsData(response.data);

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const filteredData = response.data.filter((emission) => {
        const emissionDate = new Date(emission.createdAt);
        return (
          emissionDate.getMonth() === currentMonth &&
          emissionDate.getFullYear() === currentYear
        );
      });

      setfilteredemissionsData(filteredData);
      setloadingForFilteringEmissions(false);
    } catch (error) {
      console.log(
        "an error occur while getting emissions data",
        error.response
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllEmissions();
    }, [])
  );

  // console.log("objectss: ", newDate);
  // const dummyData = [];
  // const dummyData = [
  //   {
  //     id: 1,
  //     category: "Train",
  //     type: "Transport",
  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  //   {
  //     id: 2,

  //     category: "Train",
  //     type: "Transport",

  //     carbon: "19.74kgCO2eq",
  //     icon: (
  //       <MaterialCommunityIcons name="train-variant" size={24} color="black" />
  //     ),
  //   },
  // ];
  useEffect(() => {
    const filterEmissions = () => {
      const filteredEmissions = emissionsData.filter((emission) => {
        const emissionDate = new Date(emission.createdAt);
        const emissionYear = emissionDate.getFullYear();
        const emissionMonth = emissionDate.getMonth() + 1;

        return (
          `${emissionDate.toLocaleString("default", {
            month: "long",
          })} ${emissionYear}` === selectedMonthYear
        );
      });

      console.log("object");
      setfilteredemissionsData(filteredEmissions);
    };

    // Call the function to filter emissions on initial render
    filterEmissions();

    // Call the function to filter emissions whenever selectedMonthYear changes
  }, [selectedMonthYear]);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
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

      <View style={styles.emissionDataDiv}>
        <View style={styles.monthDiv2}>
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Ionicons name="chevron-back" size={24} color="#2DBAA0" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "400", color: "black" }}>
            {selectedMonthYear}
          </Text>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Ionicons name="chevron-forward" size={24} color="#2DBAA0" />
          </TouchableOpacity>
        </View>
        {loadingForFilteringEmissions ? (
          <View
            style={{
              // height: "100%",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              marginVertical: "60%",
            }}
          >
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        ) : emissionsData.length == 0 ? (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              paddingVertical: 100,
            }}
          >
            <Text>You don't have added any emissions</Text>
            <TouchableOpacity
              style={{
                display: "flex",
                alignItems: "center",
                height: 50,
                justifyContent: "center",

                flexDirection: "row",
              }}
              onPress={() => navigation.navigate("Add")}
            >
              <Text
                style={{
                  color: "#a8a5a5",
                  fontSize: 14,
                  marginRight: 10,
                }}
              >
                Add your first emission
              </Text>
              <AntDesign name="arrowright" size={16} color="#a8a5a5" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {filteredemissionsData.length > 0 ? (
              filteredemissionsData.map((data) => (
                <TouchableOpacity
                  key={data.id}
                  style={styles.singleEmissionDiv}
                  onPress={() =>
                    navigation.navigate("EmissionDetail", { data })
                  }
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
                    <View>
                      {renderEmissionIcon(data.category, data.subCategory)}
                      {/* {food[0].icon} */}
                    </View>
                    <View>
                      <Text>{data.category}</Text>
                      <Text style={{ opacity: 0.57 }}>
                        {data.carbonEmitted} kgCO2eq
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="#2DBAA0"
                    />
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingVertical: 100,
                }}
              >
                <Text>You don't have emissions for {selectedMonthYear}</Text>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 50,
                    justifyContent: "center",

                    flexDirection: "row",
                  }}
                  onPress={() => navigation.navigate("Add")}
                >
                  <Text
                    style={{
                      color: "#a8a5a5",
                      fontSize: 14,
                      marginRight: 10,
                    }}
                  >
                    Add emission
                  </Text>
                  <AntDesign name="arrowright" size={16} color="#a8a5a5" />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
      {/* <ChatbotButton /> */}
    </ScrollView>
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
