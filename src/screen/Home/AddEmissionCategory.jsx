import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AddEmissionCategory = ({ navigation }) => {
  const subCategories = [
    {
      image: "",
      text: "Train",
    },
    {
      image: "",
      text: "Car",
    },
    {
      image: "",
      text: "Bus",
    },
    {
      image: "",
      text: "Plane",
    },
    {
      image: "",
      text: "Boat",
    },
    {
      image: "",
      text: "MotorBike",
    },
  ];

  const arrow = ">";
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Select a sub-category
        </Text>

        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
        >
          {subCategories.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={{
                backgroundColor: "#bcf5bc",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                paddingVertical: 15,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "green",
              }}
              onPress={() => navigation.navigate("AddEmission")}
            >
              <View>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  {item.text}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{arrow}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddEmissionCategory;
