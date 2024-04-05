import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import ChatbotButton from "../../components/Shared/ChatbotButton";
import axios from "axios";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { renderEmissionIcon } from "../../utils/renderIcon";
import { food } from "../../data";

const EmissionsScreen = ({ navigation }) => {
  const [count, setCount] = useState(0);
  const [emissionsData, setemissionsData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const onPress = () => setCount((prevCount) => prevCount + 1);
  console.log("tokenn", user.token);
  const getAllEmissions = async () => {
    try {
      const response = await axios.get(
        "http://192.168.100.29:5000/api/emission/allMyEmission",
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      setemissionsData(response.data);
      console.log("dtaa of emsison", response.data);
    } catch (error) {
      console.log(
        "an error occur while getting emissions data",
        error.response
      );
    }
  };
  useEffect(() => {
    getAllEmissions();
  }, []);
  const dummyData = [];
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
          <Text style={{ fontSize: 18, fontWeight: "400", color: "black" }}>
            December 2023
          </Text>
          <Ionicons name="chevron-forward" size={24} color="#2DBAA0" />
        </View>
        {emissionsData.length > 0 ? (
          emissionsData.map((data) => (
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
                <View>
                  {/* {renderEmissionIcon(data.category, data.subCategory)} */}
                  {food[0].icon}
                </View>
                <View>
                  <Text>{data.category}</Text>
                  <Text style={{ opacity: 0.57 }}>
                    {data.carbonEmitted} kgCO2eq
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 5 }}>
                <Ionicons name="chevron-forward" size={24} color="#2DBAA0" />
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
            <Text>You don't have added any emissions yet!</Text>
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
        )}
      </View>
      <ChatbotButton />
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
