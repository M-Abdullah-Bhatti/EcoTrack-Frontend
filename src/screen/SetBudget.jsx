import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useState } from "react";
import Slider from "@react-native-community/slider";

const { width } = Dimensions.get("screen");

const data = [
  {
    country: "United States",
    emission: "2 tCO2eq",
  },
  {
    country: "China",
    emission: "522 kgCO2eq",
  },
  {
    country: "Japan",
    emission: "900 kgCO2eq",
  },
  {
    country: "France",
    emission: "575 kgCO2eq",
  },
  {
    country: "India",
    emission: "139 kgCO2eq",
  },
  {
    country: "Ethiopia",
    emission: "8 kgCO2eq",
  },
  {
    country: "Sweden",
    emission: "595 kgCO2eq",
  },
];

const SetBudget = () => {
  const [budget, setBudget] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF", padding: 16 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Slide to set your budget
      </Text>
      <Slider
        style={{ width: width * 0.85, height: 40 }}
        minimumValue={1}
        maximumValue={750}
        minimumTrackTintColor="#46A667"
        maximumTrackTintColor="#000000"
        thumbTintColor="#46A667"
        onValueChange={(x) => setBudget(Math.ceil(x))}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#aaa",
          textAlign: "center",
        }}
      >
        {budget} kgCO2eq
      </Text>

      <View style={{ paddingVertical: 14, gap: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>
          Average monthly emissions per capita in a sample of countries
        </Text>
        <View style={{ alignItems: "center", paddingTop: 18 }}>
          {data.map((country, i) => (
            <View key={i}>
              <Text style={{ fontSize: 16, marginBottom: 12 }}>
                {country.country} : {country.emission}
              </Text>
            </View>
          ))}
        </View>
        <Text style={{ fontSize: 17, fontWeight: "400" }}>
          If you wish to respect the Paris agreement (to keep the rise in global
          average temperature below 2 degrees), set your monthly budget at 167
          kgCO2eq
        </Text>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#46A667",
            borderRadius: 12,
            paddingVertical: 12,
            alignItems: "center",
            marginTop: 18,
          }}
        >
          <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetBudget;
