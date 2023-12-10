import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AddScreen = ({ navigation }) => {
  const categories = [
    {
      image: "",
      text: "Meal",
      icon: <Ionicons name="md-fast-food-outline" size={30} color="white" />,
    },
    {
      image: "",
      text: "Transportation",
      icon: <SimpleLineIcons name="plane" size={30} color="white" />,
    },
    {
      image: "",
      text: "Food",
      icon: (
        <MaterialCommunityIcons
          name="food-drumstick-outline"
          size={30}
          color="white"
        />
      ),
    },

    {
      image: "",
      text: "Electricity",
      icon: (
        <MaterialCommunityIcons
          name="power-plug-outline"
          size={30}
          color="white"
        />
      ),
    },
  ];

  const handleNavigation = (text) => {
    if (text == "Electricity") {
      navigation.navigate("AddEmission", {
        category: "Electricity",
        subCategory: "Electricity",
      });
    } else {
      navigation.navigate("AddEmissionCategory", {
        category: text,
      });
    }
  };

  const arrow = ">";
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Select a category
        </Text>

        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 15,
          }}
        >
          {categories.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={{
                backgroundColor: "#046958",
                width: "47%",
                display: "flex",
                height: 160,
                // flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                paddingHorizontal: 10,
                paddingVertical: 15,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#2DBAA0",
                borderStyle: "solid",
              }}
              onPress={() => handleNavigation(item.text)}
            >
              <View>
                <Text
                  style={{ fontSize: 19, fontWeight: "600", color: "white" }}
                >
                  {item.text}
                </Text>
              </View>
              {/* <View>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{arrow}</Text>
              </View> */}
              {/* <Ionicons name="chevron-forward" size={24} color="white" /> */}
              <View>{item.icon}</View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddScreen;
