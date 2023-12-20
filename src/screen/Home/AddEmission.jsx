import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

const AddEmission = ({ navigation, route }) => {
  const [distance, setDistance] = useState(0);
  const [electricity, setElectricity] = useState(0);
  const [foodQuantity, setFoodQuantity] = useState(0);
  const [mealQuantity, setMealQuantity] = useState(0);

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);

  const { params } = route;

  useFocusEffect(
    React.useCallback(() => {
      setSubCategory(params?.subCategory?.text);
      setCategory(params?.category);
    }, [])
  );

  return (
    <View style={styles.container}>
      {category == "Transportation" && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transport</Text>
            <Text>{subCategory}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Distance</Text>
            <Text>{distance} Kilometer(s)</Text>
          </View>

          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={250}
              minimumTrackTintColor="#46A667"
              maximumTrackTintColor="#000000"
              thumbTintColor="#46A667"
              onValueChange={(x) => setDistance(Math.ceil(x))}
            />
          </View>

          {!isCalculated ? (
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  setIsCalculated(true);
                }}
              >
                <Text style={styles.addButtonText}>Calculate Emission</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalValue}>10.2 kgCO2eq</Text>
              </View>

              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate("Emissions")}
                >
                  <Text style={styles.addButtonText}>Add this emission</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}

      {category == "Electricity" && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Electricity</Text>
            <Text>Custom</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Electricity consumption</Text>
            <Text>{electricity} kWh - WORLD</Text>
          </View>

          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={250}
              minimumTrackTintColor="#46A667"
              maximumTrackTintColor="#000000"
              thumbTintColor="#46A667"
              onValueChange={(x) => setElectricity(Math.ceil(x))}
            />
          </View>

          {!isCalculated ? (
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  setIsCalculated(true);
                }}
              >
                <Text style={styles.addButtonText}>Calculate Emission</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalValue}>10.2 kgCO2eq</Text>
              </View>

              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate("Emissions")}
                >
                  <Text style={styles.addButtonText}>Add this emission</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}

      {category == "Food" && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Food</Text>
            <Text>{subCategory}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <Text>{foodQuantity} (g)</Text>
          </View>

          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={2000}
              minimumTrackTintColor="#46A667"
              maximumTrackTintColor="#000000"
              thumbTintColor="#46A667"
              onValueChange={(x) => setFoodQuantity(Math.ceil(x))}
            />
          </View>

          {!isCalculated ? (
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  setIsCalculated(true);
                }}
              >
                <Text style={styles.addButtonText}>Calculate Emission</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalValue}>10.2 kgCO2eq</Text>
              </View>

              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate("Emissions")}
                >
                  <Text style={styles.addButtonText}>Add this emission</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}

      {category == "Meal" && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Meal</Text>
            <Text>{subCategory}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Distance</Text>
            <Text>{mealQuantity} meal(s)</Text>
          </View>

          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={20}
              minimumTrackTintColor="#46A667"
              maximumTrackTintColor="#000000"
              thumbTintColor="#46A667"
              onValueChange={(x) => setMealQuantity(Math.ceil(x))}
            />
          </View>

          {!isCalculated ? (
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  setIsCalculated(true);
                }}
              >
                <Text style={styles.addButtonText}>Calculate Emission</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalValue}>10.2 kgCO2eq</Text>
              </View>

              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate("Emissions")}
                >
                  <Text style={styles.addButtonText}>Add this emission</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}
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
    fontSize: 18,
    color: "#000",
    marginTop: 10,
    fontWeight: "bold",
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
