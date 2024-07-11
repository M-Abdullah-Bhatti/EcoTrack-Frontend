import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "react-native-vector-icons";

import { toastShow, uploadImage } from "../../utils/helpers";
import { refreshUser } from "../../redux/userSlice";

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.profilePic);
  const [imageFromFirebase, setImageFromFirebase] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("ress", result.uri);
    console.log("ress", await uploadImage(result.uri));
    if (!result.canceled) {
      setImage(result.uri);
      setImageFromFirebase(await uploadImage(result.uri));
    }
  };

  // Function to handle profile update
  const handleUpdateProfile = async () => {
    console.log("object", imageFromFirebase);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const userData = {
        name,
        profilePic: imageFromFirebase ? imageFromFirebase : image,
      };

      console.log("User Data ", userData);
      const response = await axios.put(
        "https://ecotrack-dev.vercel.app/api/users/edit",
        userData,
        config
      );

      console.log("User data updated:", response.data);
      getProfile();
      navigation.goBack();
      dispatch(refreshUser(user._id));
      toastShow("Data updated successfully!");
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      if (error.response) {
        console.error(
          "Error updating user data res:",
          error.response.data.message
        );
        navigation.goBack();
        toastShow("Couldn't update user data. Try again later.");
      } else {
        console.error("Error updating user data:", error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          style={styles.profImage}
          source={image ? { uri: image } : require("../../../assets/prof.png")}
        />
        <Text style={styles.editImageText}>Edit Image</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 6,
            marginTop: 3,
            fontWeight: "600",
          }}
        >
          {email}
        </Text>
        {/* <TextInput
          style={styles.input}
          value={email}
          // onChangeText={(text) => setEmail(text)}
        /> */}
      </View>
      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View> */}
      <TouchableOpacity style={styles.btn} onPress={handleUpdateProfile}>
        <FontAwesome5 name="save" color="#FFF" size={24} />
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight + 10 : "0px",
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  editImageText: {
    color: "#2DBAA0",
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#2DBAA0",
    borderRadius: 8,
    paddingHorizontal: 10,
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
});

export default EditProfileScreen;
