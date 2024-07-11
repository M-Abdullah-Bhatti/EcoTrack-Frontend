import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("screen");

const MainScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  console.log("HOME USER: ", user);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.curvedContainer}>
        <View style={styles.leftContent}>
          <Image
            source={require("../../../assets/drop.gif")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.heading}>EcoTrack</Text>
          <Text style={styles.subHeading}>Guide to a Sustainable Future</Text>
        </View>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Monthly Carbon Emission</Text>
        <Text style={styles.balanceAmount}>{(user?.totalEmissions)?.toFixed(0)} kg</Text>
        {user?.totalEmissions > 2 && (
          <Text style={styles.balanceDescription}>
            This amount of <Text style={{ fontWeight: "bold" }}>CO2</Text> would
            require{" "}
            <Text style={{ fontWeight: "bold" }}>
              {(user.totalEmissions / 1.83).toFixed(0)} Trees
            </Text>{" "}
            to absorb in a month.
          </Text>
        )}
      </View>

      <View style={styles.CardContainer}>
        <View style={styles.Card}>
          <Text style={styles.cardText}>Calculate your Carbon Footprint</Text>
          <Image
            style={styles.cardImg}
            source={require("../../../assets/foot.png")}
          />
          <TouchableOpacity
            style={styles.cardBtn}
            onPress={() => navigation.navigate("Add")}
          >
            <Text style={styles.cardBtnText}>Calculate Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Card}>
          <Text style={styles.cardText}>Get Personalized Recommendations</Text>
          <Image
            style={styles.cardImg}
            source={require("../../../assets/bot2.png")}
          />
          <TouchableOpacity
            style={styles.cardBtn}
            onPress={() => navigation.navigate("ChatScreen")}
          >
            <Text style={styles.cardBtnText}>Talk Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.heading2}>More with EcoTrack</Text>
        <View style={styles.secondCard}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("GoalsScreen")}
            >
              <MaterialCommunityIcons
                name="bullseye-arrow"
                size={30}
                color="black"
              />
              <Text style={styles.itemText}>My Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("RewardScreen")}
            >
              <Entypo size={30} color="black" name="trophy" />
              <Text style={styles.itemText}>Rewards</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("UserDashboard")}
            >
              <MaterialCommunityIcons
                size={30}
                color="black"
                name="database-sync"
              />
              <Text style={styles.itemText}>Visualize Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : "0px",
    backgroundColor: "white",
    alignItems: "center",
  },
  btn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#46A667",
    paddingVertical: 14,
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 12,
    justifyContent: "center",
  },
  curvedContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#46A667",
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    flexDirection: "row",
  },
  leftContent: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  rightContent: {
    marginLeft: "5%",
    flex: 4,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingRight: 20,
  },
  heading: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    fontFamily: "PoppinsSemiBold",
  },
  subHeading: {
    fontSize: 18,
    color: "white",
    fontFamily: "PoppinsRegular",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  heading2: {
    marginTop: "2%",
    fontSize: 18,
    color: "black",
    fontFamily: "PoppinsMedium",
    marginLeft: 12,
  },
  CardContainer: {
    marginTop: "3%",
    marginHorizontal: 5,
    display: "flex",
    flexDirection: "row",
  },
  Card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "45%",
    marginHorizontal: 3,
    borderRadius: 10,
  },
  cardImg: {
    height: 100,
    width: "40%",
  },
  cardText: {
    textAlign: "center",
    fontFamily: "PoppinsMedium",
    marginVertical: 5,
    paddingHorizontal: 6,
  },
  cardBtn: {
    height: 40,
    width: "90%",
    backgroundColor: "#46A667",
    borderRadius: 5,
    marginVertical: "10%",
    display: "flex",
    justifyContent: "center",
  },
  cardBtnText: {
    textAlign: "center",
    fontFamily: "PoppinsRegular",
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  itemContainer: {
    marginTop: "5%",
  },
  item: {
    display: "flex",
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "2%",
    paddingVertical: "6%",
    borderRadius: 10,
    width: "28%",
  },
  itemText: {
    marginTop: 5,
    textAlign: "center",
    fontFamily: "PoppinsRegular",
  },
  balanceCard: {
    width: width * 0.9,
    margin: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#34a853",
    alignItems: "center",
  },
  balanceTitle: {
    fontSize: 18,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
  },
  balanceDescription: {
    color: "#34a853",
    textAlign: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

export default MainScreen;
