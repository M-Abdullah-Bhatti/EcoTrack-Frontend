import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AddScreen = ({ navigation }) => {
  const categories = [
    {
      image: "",
      text: "Transportation",
    },
    {
      image: "",
      text: "Food",
    },
    {
      image: "",
      text: "Streaming",
    },
    {
      image: "",
      text: "Electricity",
    },
    {
      image: "",
      text: "Purchase",
    },
    {
      image: "",
      text: "Fashion",
    },
    {
      image: "",
      text: "Scan Product",
    },
    {
      image: "",
      text: "Custom",
    },
  ];

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
            flexDirection: "column",
            gap: 15,
          }}
        >
          {categories.map((item, key) => (
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
              }}
              // onPress={() => navigation.navigate("/AddEmission")}
            >
              <View>
                <Text>{item.text}</Text>
              </View>
              <View>
                <Text>{arrow}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddScreen;
