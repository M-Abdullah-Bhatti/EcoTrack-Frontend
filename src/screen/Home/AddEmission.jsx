import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Slider from "@react-native-community/slider";

const { width } = Dimensions.get("screen");

const AddEmission = ({ navigation }) => {
  const [budget, setBudget] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transport</Text>
        <Text>Train</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Distance</Text>
        <Text>150 Kilometer(s)</Text>
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={750}
          minimumTrackTintColor="#46A667"
          maximumTrackTintColor="#000000"
          thumbTintColor="#46A667"
          onValueChange={(x) => setBudget(Math.ceil(x) / 150)}
        />
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalValue}>{budget.toFixed(3)} kgCO2eq</Text>
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("SetBudget")}
        >
          <Text style={styles.addButtonText}>Add this emission</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  sliderContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  slider: {
    width: width * 0.85,
    height: 40,
  },
  totalText: {
    fontSize: 16,
    color: "#aaa",
    marginTop: 10,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#aaa",
  },
  addButtonContainer: {
    alignItems: "center",
  },
  addButton: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#46A667",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default AddEmission;
