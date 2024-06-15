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
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const MainScreen = ({ navigation }) => {
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
          <Text style={styles.subHeading}>Guide to Sustainable Future</Text>
        </View>
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
        <Text style={{ fontFamily: "PoppinsMedium", fontSize: 15, marginLeft: 14 }}>
          More with EcoTrack
        </Text>
        <View style={styles.secondCard}>
          {/* First Row */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.item}>
              <AntDesign size={30} color="black" name="areachart" />
              <Text style={styles.itemText}>Set Goal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("Community")}
            >
              <Ionicons size={30} color="black" name="people-sharp" />
              <Text style={styles.itemText}>Social Community</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("Emissions")}
            >
              <MaterialCommunityIcons
                size={30}
                color="black"
                name="foot-print"
              />
              <Text style={styles.itemText}>Emissions</Text>
            </TouchableOpacity>
          </View>

          {/* Second Row */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("RewardScreen")}
            >
              <Entypo size={30} color="black" name="trophy" />
              <Text style={styles.itemText}>Check Rewards</Text>
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
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("GoalsScreen")}
            >
              <MaterialIcons size={30} color="black" name="article" />
              <Text style={styles.itemText}>Read Blogs</Text>
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
    // paddingHorizontal: 20,
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
    borderBottomLeftRadius: 150, // Adjust the value for more curve
    borderBottomRightRadius: 30, // No curve on the right
    overflow: "hidden",
    flexDirection: "row", // Ensures children don't overflow
  },
  leftContent: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20, // Add some left padding
  },
  rightContent: {
    marginLeft: "5%",
    flex: 4, // Takes 70% of the curved container
    justifyContent: "center", // Center the image vertically
    alignItems: "flex-start", // Align the image to the right
    paddingRight: 20, // Add some right padding
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
    borderRadius: 50, // Make it circular
  },
  heading2: {
    marginTop: "3%",
    fontSize: 18,
    color: "black",
    fontFamily: "PoppinsMedium",
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
    height: 220,
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
    paddingVertical: "5%",
    borderRadius: 10,
    width: "28%",
  },
  itemText: {
    marginTop: 5,
    textAlign: "center",
    fontFamily: "PoppinsRegular",
  },
});

export default MainScreen;
