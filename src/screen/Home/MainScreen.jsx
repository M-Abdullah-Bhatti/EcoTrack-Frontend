import React, { useState, useEffect } from "react";
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
import { MaterialCommunityIcons, MaterialIcons, Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setEmissions, setGoals } from '../../redux/userSlice';
import SetGoalModal from "../../components/SetGoalModal";

const MainScreen = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoriesNeedingGoals, setCategoriesNeedingGoals] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  
  const { user, token, goals, emissions } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      try {
        const emissionData = await axios.get(
          `https://ecotrack-dev.vercel.app/api/emission/weekly/${user._id}`, config
        );
        dispatch(setEmissions(emissionData.data.result));
      } catch (error) {
        console.error("Error fetching emissions data:", error);
      }

      try {
        const goalsData = await axios.get(
          `https://ecotrack-dev.vercel.app/api/goal/weekly/${user._id}`, config
        );
        dispatch(setGoals(goalsData.data));
      } catch (error) {
        console.error("Error fetching goals data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (emissions && goals) {
      checkEmissions();
    }
  }, [emissions, goals]);

  const checkEmissions = () => {
    const goalCategories = goals.map(goal => goal.category);
    const newCategoriesNeedingGoals = emissions
      .map(emission => emission.category)
      .filter(category => !goalCategories.includes(category));
    
    setCategoriesNeedingGoals(newCategoriesNeedingGoals);

    if (newCategoriesNeedingGoals.length > 0) {
      setCurrentCategory(newCategoriesNeedingGoals[0]);
      setModalOpen(true);
    }
  };

  const handleSetGoal = async (percentage) => {
    const category = categoriesNeedingGoals[currentCategoryIndex];
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        userId: user._id,
        category,
        percentage,
        startDate,
        endDate,
        goalAchieved: false,
      };

      console.log("ADD GOAL BODY: ", body)

      await axios.post('https://ecotrack-dev.vercel.app/api/goal/add/', body, config);

      if (currentCategoryIndex < categoriesNeedingGoals.length - 1) {
        setCurrentCategoryIndex(currentCategoryIndex);
        setCurrentCategory(categoriesNeedingGoals[currentCategoryIndex]);
      } else {
        setModalOpen(false);
      }

      // Fetch updated goals
      const updatedGoals = await axios.get(
        `https://ecotrack-dev.vercel.app/api/goal/weekly/${user._id}`, config
      );
      dispatch(setGoals(updatedGoals.data));
    } catch (error) {
      console.error("Error setting goal:", error);
    }
  };

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
              onPress={() => setModalOpen(true)}
            >
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
              <MaterialCommunityIcons size={30} color="black" name="foot-print" />
              <Text style={styles.itemText}>Emissions</Text>
            </TouchableOpacity>
          </View>
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
              <MaterialCommunityIcons size={30} color="black" name="database-sync" />
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
      <SetGoalModal
        isVisible={modalOpen}
        hideModal={() => setModalOpen(false)}
        category={currentCategory}
        onSetGoal={handleSetGoal}
      />
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
  marginLeft: 12
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
  paddingVertical: "4%",
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
