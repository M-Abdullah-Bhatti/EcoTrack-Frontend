import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";





const ProfileScreen = ({ navigation }) => {

  const [userData, setUserData] = useState({});

  
const { user } = useSelector((state) => state.user);

// Function to fetch user profile data
const getProfile = async () => {
  try {
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      'https://ecotrack-dev.vercel.app/api/users/profile',
      config
    );

    const resData = response.data.user;
    console.log("res data ", resData)

    setUserData(resData)

  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};

useEffect(() => {
  const user = getProfile();
  setUserData(user)
}, []);

const data = [
  {
    "title": "Name",
    "value": userData.name,
    "icon": <Feather size={22} color="black" name="user"/>
  },
  {
    "title": "Email",
    "value": userData.email,
    "icon": <Fontisto size={20} color="black" name="email"/>
  },
  {
    "title": "Contact",
    "value": userData.contact,
    "icon": <FontAwesome5 size={20} color="black" name="phone"/>
  },
  {
    "title": "Rewards",
    "value": userData.rewards,
    "icon": <EvilIcons size={22} color="black" name="trophy"/>
  },
  
]


  return (
    <View style={styles.container}>
      <Image
        style={styles.profImage}
        source={user.image ? { uri: user.image } : require("../../../assets/prof.png")}
      />
      {data.map((obj, index) => (
        <View style={styles.infoContainer} key={index}>
          <View style={styles.leftInfo}>
            <TouchableOpacity>
              {obj.icon}
            </TouchableOpacity>
            <Text style={styles.boldText}>{obj.title} </Text>
            
          </View>

          <View style={styles.rightInfo}>
            <Text style={styles.lightText}> {obj.value}</Text>
          </View>
        </View>
      ))}

<TouchableOpacity
        style={styles.btn}
        onPress={()=> navigation.navigate("EditProfile")}
      >
        <FontAwesome5 name="user-edit" color="#FFF" size={24} />
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
          Edit Profile
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : "0px",
    backgroundColor: "white",
    alignItems: "center",
  },
  profImage: {
    height: "15%",
    width: "25%",
    borderRadius: 200,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "2%",
    width: "85%",
    marginTop: "5%",
    borderBottomColor: "#2DBAA0",
    borderTopColor: "#2DBAA0",
    borderBottomWidth: 0.3,
    borderTopWidth: 0.3,
    paddingVertical: 10,
    borderCurve: 5,
  
  },
  leftInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightInfo: {
    alignItems: "flex-end",
    flexDirection: 'row'
  },
  boldText: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: "8%" // Adjust margin as needed
  },
  lightText: {
    fontSize: 15,
  },
  btn: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#46A667",
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
    borderRadius: 12,
    justifyContent: "center",
  }
});

export default ProfileScreen;
