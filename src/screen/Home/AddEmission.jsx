import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useFocusEffect } from "@react-navigation/native";
import { CarbonCalculationAPI } from "../../axios/NetworkCalls";
import { countries } from "../../data";
import SelectDropDown from "../../components/Shared/SelectDropDown";
import axios from "axios";
import { useSelector } from "react-redux";
import { toastShow } from "../../utils/helpers";
import baseUrl from "../../utils/baseUrl";

const { width } = Dimensions.get("screen");

const AddEmission = ({ navigation, route }) => {
  const { params } = route;

  const [distance, setDistance] = useState(0);
  const [electricity, setElectricity] = useState(0);
  const [foodQuantity, setFoodQuantity] = useState(0);
  const [mealQuantity, setMealQuantity] = useState(0);

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const [electricityCarbon, setElectricityCarbon] = useState(false);
  const [fuelCarbon, setFuelCarbon] = useState(false);
  const [foodCarbon, setFoodCarbon] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loader, setLoader] = useState(false);

  const { user } = useSelector((state) => state.user);

  const handleSelection = (selectedItem, index) => {
    setSelectedCountry(selectedItem);
  };

  const calculateCarbon = async () => {
    console.log("eletricity cons: ");
    const params = {
      country_name: selectedCountry,
      electricity_value: electricity,
      electricity_unit: "kWh",
    };

    const electricityCarbon = await CarbonCalculationAPI(
      "https://carbonsutra1.p.rapidapi.com/electricity_estimate",
      params
    );
    setElectricityCarbon(electricityCarbon?.data?.co2e_kg);

    console.log("electricityCarbon: ", electricityCarbon?.data?.co2e_kg);
    setIsCalculated(true);
  };

  const calculateFuelCarbon = async () => {
    console.log("Fuel cons: ");
    const params = {
      vehicle_type: vehicleType,
      distance_value: distance,
      distance_unit: "km",
    };

    const fuelCarbon = await CarbonCalculationAPI(
      "https://carbonsutra1.p.rapidapi.com/vehicle_estimate_by_type",
      params
    );

    setFuelCarbon(fuelCarbon?.data?.co2e_kg);

    console.log("Feul Carbon: ", fuelCarbon?.data?.co2e_kg);
    setIsCalculated(true);
  };

  const calculateFoodCarbon = async () => {
    const requestBody = {
      food: params.subCategory.label,
      kg: foodQuantity,
    };

    const response = await axios.post(`${baseUrl}/api/food/`, requestBody);

    console.log("response: ", response.data);

    setFoodCarbon(response.data.carbonFootprint);

    console.log("Food Carbon: ", response.data.carbonFootprint);
    setIsCalculated(true);
  };

  const handleAddEmission = () => {
    console.log("handle add emission called");
    setLoader(true);

    let carbonValue;
    if (category == "Food" || category == "Meal") {
      carbonValue = foodCarbon;
    }
    if (category == "Transportation") {
      carbonValue = fuelCarbon;
    } else {
      carbonValue = electricityCarbon;
    }

    const requestBody = {
      user: user?._id,
      category: category,
      subCategory: subCategory || "",
      carbonEmitted: carbonValue,
    };

    axios
      .post(`${baseUrl}/api/emission/addEmission`, requestBody, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        if (res?.data?.success) {
          setLoader(false);
          toastShow("Emission added successfully");
          navigation.navigate("Emissions");
        }
      })
      .catch((err) => {
        console.log(":err: ", err);
        toastShow("An error occurred");
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      setSubCategory(params?.subCategory?.text);
      setCategory(params?.category);
      setVehicleType(params?.subCategory?.vehicle_type);
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
              maximumValue={1000}
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
                onPress={calculateFuelCarbon}
              >
                <Text style={styles.addButtonText}>Calculate Emission</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalValue}>{fuelCarbon} kgCO2eq</Text>
              </View>

              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddEmission}
                >
                  {loader ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.addButtonText}>Add this emission</Text>
                  )}
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

          <Text style={styles.sectionTitle}>Select Country</Text>
          <View style={styles.dropDownContainer}>
            <SelectDropDown
              data={countries}
              onSelect={handleSelection}
              defaultButtonText="Select Country"
            />
          </View>

          {!isCalculated ? (
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                // onPress={() => {
                //   setIsCalculated(true);
                // }}
                onPress={calculateCarbon}
              >
                <Text style={styles.addButtonText}>Calculate Emission</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalValue}>
                  {electricityCarbon} kgCO2eq
                </Text>
              </View>

              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddEmission}
                >
                  {loader ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.addButtonText}>Add this emission</Text>
                  )}
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
            <Text>{foodQuantity} (kg)</Text>
          </View>

          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={100}
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
                onPress={calculateFoodCarbon}
              >
                <Text style={styles.addButtonText}>Calculate Emission</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalValue}>{foodCarbon} kgCO2eq</Text>
              </View>

              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddEmission}
                >
                  {loader ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.addButtonText}>Add this emission</Text>
                  )}
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
                onPress={calculateFoodCarbon}
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
                  onPress={handleAddEmission}
                >
                  {loader ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.addButtonText}>Add this emission</Text>
                  )}
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
  dropDownContainer: {
    // flex: 1,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdownStyle: {
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  dropdownRowStyle: {
    backgroundColor: "#FFF",
    borderBottomColor: "#C5C5C5",
  },
  dropdownRowTextStyle: {
    fontSize: 16,
    color: "#444",
  },
});

export default AddEmission;
