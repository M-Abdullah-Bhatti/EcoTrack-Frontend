import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
const { width } = Dimensions.get("screen");

const AddEmission = () => {
  const [budget, setBudget] = useState(0);

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        paddingHorizontal: 20,
        paddingTop: 10,
      }}
    >
      <View>
        <Text>Transport</Text>
        <Text>Train</Text>
      </View>

      <View>
        <Text>Distance</Text>
        <Text>150 Kilometer (s)</Text>
      </View>

      <View>
        <Slider
          style={{ width: width * 0.85, height: 40 }}
          minimumValue={1}
          maximumValue={750}
          minimumTrackTintColor="#46A667"
          maximumTrackTintColor="#000000"
          thumbTintColor="#46A667"
          onValueChange={(x) => setBudget(Math.ceil(x) / 150)}
        />
        <Text>Total</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#aaa" }}>
          {budget.toFixed(3)} kgCO2eq
        </Text>
      </View>

      <View>
        <TouchableOpacity
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 6,
            backgroundColor: "#46A667",
            paddingVertical: 14,
            alignItems: "center",
            marginTop: 40,
            borderRadius: 12,
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("SetBudget")}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
            Add this emission
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddEmission;
