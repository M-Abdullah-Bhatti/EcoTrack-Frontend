import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import axios from "axios";
import { useSelector } from "react-redux";

const UserDashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  console.log("year", new Date().getFullYear());

  const { user, token } = useSelector((state) => state.user);

  const renderTitle = () => {
    return (
      <View style={{ marginVertical: 3 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 7,
            marginBottom: 10,
            width: "100%",
            paddingLeft: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#177AD5",
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 20,
                color: "black",
              }}
            >
              Diet
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#ED6665",
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 110,
                height: 20,
                color: "black",
              }}
            >
              Electricity
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#46A667",
                marginRight: 10,
              }}
            />
            <Text
              style={{
                width: 110,
                height: 20,
                color: "black",
              }}
            >
              Transportation
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const [CarbonData, setCarbonData] = useState([]);
  const [CarbonDataToBeShown, setCarbonDataToBeShown] = useState([]);
  const [LineChartData, setLineChartData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const { width } = Dimensions.get("screen");

  const fetchEmissionData = async () => {
    try {
      setLoading(true);
      const emissionData = await axios.get(
        `https://ecotrack-dev.vercel.app/api/emission/${user._id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (emissionData.data) {
        setCarbonData(emissionData.data);
        setCarbonDataToBeShown(transformData(emissionData.data));
        setLineChartData(transformDataForLineChart(emissionData.data));
      }
      setLoading(false);
    } catch (error) {
      console.log("error while getting emissions", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchEmissionData();
  }, []);

  const transformData = (fetchedData) => {
    const transformedData = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let i = 0; i < 12; i++) {
      const month = monthNames[i];
      const monthData = fetchedData.filter((item) => {
        const date = new Date(item.createdAt);
        return date.getFullYear() === year && date.getMonth() === i;
      });

      const categoryValues = {
        Electricity: 0,
        Food: 0,
        Transportation: 0,
      };

      monthData.forEach((item) => {
        if (item.category === "Food" || item.category === "Meal") {
          categoryValues.Food += item.carbonEmitted;
        } else {
          categoryValues[item.category] += item.carbonEmitted;
        }
      });

      const hasNonZeroEmissions = Object.values(categoryValues).some(
        (value) => value > 0
      );
      transformedData.push({
        value: categoryValues.Food == 0 ? 1 : categoryValues.Food,
        label: month,
        spacing: 4,
        labelWidth: 30,
        labelTextStyle: { color: "gray" },
        frontColor: "#177AD5",
      });
      transformedData.push({
        value: categoryValues.Electricity == 0 ? 1 : categoryValues.Electricity,
        frontColor: "#ED6665",
        spacing: 4,
      });
      transformedData.push({
        value:
          categoryValues.Transportation == 0
            ? 1
            : categoryValues.Transportation,
        frontColor: "#46A667",
      });
      // if (categoryValues.Food > 0) {

      // }
      // if (categoryValues.Food > 0) {

      // } else {
      //   if (categoryValues.Electricity > 0) {
      //     transformedData.push({
      //       value: categoryValues.Electricity,
      //       frontColor: "#ED6665",
      //       label: month,
      //       spacing: 2,
      //       labelTextStyle: { color: "gray" },
      //     });
      //   }
      // }

      // if (categoryValues.Food > 0 || categoryValues.Electricity > 0) {

      // } else {
      //   transformedData.push({
      //     value: categoryValues.Transportation,
      //     frontColor: "#46A667",
      //     label: month,
      //     labelWidth: 30,
      //     labelTextStyle: { color: "gray" },
      //   });
      // }
    }
    console.log("barrr data", transformedData);

    return transformedData;
  };

  const transformDataForLineChart = (fetchedData) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const data = {
      Electricity: [],
      Food: [],
      Transportation: [],
    };

    for (let i = 0; i < 12; i++) {
      const month = monthNames[i];
      const monthData = fetchedData.filter((item) => {
        const date = new Date(item.createdAt);
        return date.getFullYear() === year && date.getMonth() === i;
      });

      const categoryValues = {
        Electricity: 0,
        Food: 0,
        Transportation: 0,
      };

      monthData.forEach((item) => {
        if (item.category === "Food" || item.category === "Meal") {
          categoryValues.Food += item.carbonEmitted;
        } else {
          categoryValues[item.category] += item.carbonEmitted;
        }
      });

      data.Electricity.push({
        value: categoryValues.Electricity,
        label: month,
      });
      data.Food.push({
        value: categoryValues.Food,
        label: month,
      });
      data.Transportation.push({
        value: categoryValues.Transportation,
        label: month,
      });
    }

    return data;
  };

  const handleDecreaseYear = () => {
    if (year > 2023) {
      setYear(year - 1);
    }
  };

  useEffect(() => {
    setCarbonDataToBeShown(transformData(CarbonData));
    setLineChartData(transformDataForLineChart(CarbonData));
  }, [year]);

  const handleIncreaseYear = () => {
    setYear(year + 1);
  };

  const [selectedOpt, setSelectedOpt] = useState("Electricity");

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={styles.header}>
        <View
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 13,
          }}
        >
          <TouchableOpacity
            style={{
              height: 32,
              width: 32,
              backgroundColor: "white",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-circle" size={30} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              marginTop: 2,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Data Analysis
          </Text>
        </View>
        <View
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            height: 60,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          onPress={() => alert("Aziz")}
        >
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20 }}>
            <Image
              source={require("../../../assets/prof.png")}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          paddingVertical: 20,
          marginVertical: 15,
          height: "auto",
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : CarbonDataToBeShown.length === 0 ? (
          <>
            <View
              style={{
                width: "100%",
                height: 40,
                marginVertical: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 20,
              }}
            >
              <TouchableOpacity onPress={handleDecreaseYear}>
                <AntDesign name="leftcircleo" size={24} color="black" />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: "700" }}>{year}</Text>
              <TouchableOpacity onPress={handleIncreaseYear}>
                <AntDesign name="rightcircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                marginVertical: 10,
              }}
            >
              No data available for {selectedOpt} and year: {year}
            </Text>
          </>
        ) : (
          <View>
            <View
              style={{
                width: "100%",
                height: 40,
                marginVertical: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 20,
              }}
            >
              <TouchableOpacity onPress={handleDecreaseYear}>
                <AntDesign name="leftcircleo" size={24} color="black" />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: "700" }}>{year}</Text>
              <TouchableOpacity onPress={handleIncreaseYear}>
                <AntDesign name="rightcircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {renderTitle()}
            <View
              style={{
                paddingHorizontal: 2,
                borderTopColor: "black",
                borderTopWidth: 1,
                marginTop: 20,
              }}
            >
              <Text style={{ marginLeft: 8, marginBottom: 7 }}>kg CO2</Text>

              <BarChart
                barWidth={8}
                noOfSections={12}
                barBorderRadius={4}
                frontColor="lightgray"
                // showLine

                // data={barData}
                data={CarbonDataToBeShown}
                // yAxisThickness={0}
                // xAxisThickness={0}
                // labelWidth={150}
                initialSpacing={10}
                yAxisLabelWidth={50}
                height={250}
                spacing={30}
                maxValue={800}
                xAxisLabelTextStyle
              />
            </View>

            <View
              style={{
                paddingHorizontal: 2,
                borderTopColor: "black",
                borderTopWidth: 1,
                marginTop: 20,
              }}
            >
              <Text style={{ marginLeft: 8, marginBottom: 7 }}>kg CO2</Text>
              <LineChart
                data={LineChartData.Food}
                data2={LineChartData.Electricity}
                data3={LineChartData.Transportation}
                height={250}
                // showVerticalLines
                yAxisLabelWidth={50}
                spacing={44}
                noOfSections={10}
                initialSpacing={20}
                maxValue={800}
                color1="#177AD5"
                color2="#ED6665"
                color3="#46A667"
                textColor1="blue"
                textColor2="red"
                textColor3="purple"
                dataPointsHeight={6}
                dataPointsWidth={6}
                dataPointsColor1="blue"
                dataPointsColor2="red"
                dataPointsColor3="green"
                textShiftY={-2}
                textShiftX={-5}
                textFontSize={13}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 12,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    position: "fixed",
  },
  optionsContainer: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  optionButton: {
    borderWidth: 2,
    borderRadius: 20,
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  selectedOption: {
    backgroundColor: "#46A667",
    borderWidth: 0,
  },
  optionText: {
    color: "black",
  },
  selectedOptionText: {
    color: "white",
  },
  goalModal: {
    width: "96%",
    height: "auto",
    backgroundColor: "white",
    marginHorizontal: "2%",
    display: "flex",
    marginTop: 200,
    alignItems: "center",
    gap: 10,
    paddingBottom: 27,
    paddingTop: 5,
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    display: "none",
    zIndex: 10,
  },
  overlayVisible: {
    display: "flex",
  },
});

export default UserDashboard;
