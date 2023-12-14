import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  TextInput,
  Button,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const Signup = ({ navigation }) => {
  const imgSrc = require("../../../assets/logo-text.png");
  const bot = require("../../../assets/profileicon.png");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [imgPreview, setImgPreview] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log("result", result);

    if (!result.canceled) {
      setImageUri(result?.assets[0]?.uri);
      setImgPreview(result?.assets[0]?.uri);
    }
  };
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const handleSignup = async ({ navigation }) => {
    if (!username || !email || !password) {
      alert("Please fill in all the fields");
      return;
    }

    try {
      const response = await fetch(
        "https://ecotrack-dev.vercel.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: username,
            email: email,
            password: password,
            image: imageUri,
          }),
        }
      );

      if (response.ok) {
        alert("Signup successful!");
        navigation.replace("Home");
      } else {
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.message}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : }
      style={{ flex: 1 }}
    >
      <ScrollView
        // style={styles.container}
        contentContainerStyle={{
          flexDirection: "column",
          paddingTop:
            Platform.OS == "android" ? StatusBar.currentHeight : "0px",
          backgroundColor: "white",
          paddingBottom: 30,
        }}
      >
        <View style={styles.headerDiv}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              width: 135,
              height: 135,
              borderRadius: 135 / 2,
              marginTop: 25,
            }}
          >
            <Image source={require("../../../assets/mainLogo.png")} />
          </View>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image source={imgSrc} height={47} style={{ marginTop: 60 }} />
        </View>
        <View>
          <View style={styles.uploadFileContainer}>
            <TouchableOpacity
              style={{ position: "relative" }}
              onPress={pickImage}
            >
              <View
                style={{
                  backgroundColor: "white",
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  position: "absolute",
                  right: -5,
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "black",
                  borderWidth: 2,
                  // marginLeft: 10,
                }}
              >
                <Image
                  style={styles.addIconPic}
                  source={require("../../../assets/addIcon.png")}
                />
              </View>
              <Image
                style={styles.uploadFileContainerImg}
                source={imgPreview != null ? { uri: imgPreview } : bot}
                alt="Profile Pic"
              />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setUsername(value)}
            value={username}
            placeholder="Enter Your Username..."
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
            value={email}
            placeholder="Enter Your Email..."
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setPassword(value)}
            value={password}
            placeholder="Enter Your Password..."
          />
          <TouchableOpacity style={styles.loginBtn} onPress={handleSignup}>
            <Text style={styles.loginTExt}>SIGNUP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.breakPoint}>
          <View style={styles.item}></View>
          <Text style={styles.bpText}>OR</Text>
          <View style={styles.item}></View>
        </View>
        <TouchableOpacity style={styles.googleLoginBtn} onPress={onPress}>
          <Image source={require("../../../assets/googlelogo.png")} />
          <Text style={styles.loginTExt}>CONTINUE WITH GOOGLE</Text>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>
            Already have an account?{" "}
            <Text
              onPress={() => navigation.navigate("Login")}
              style={{ marginLeft: 3, color: "#096151", fontWeight: "700" }}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : "0px",
    backgroundColor: "white",
    // paddingBottom: 200,
  },
  headerDiv: {
    height: 90,
    backgroundColor: "#2DBAA0",
    alignItems: "center",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#cacaca",
  },
  loginBtn: {
    // width: 393,
    height: 50,
    margin: 12,
    backgroundColor: "#2DBAA0",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginTExt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  breakPoint: {
    // backgroundColor: "black",
    margin: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    width: "45%",
    backgroundColor: "black",
    height: 1.5,
    shadowColor: "black",
    shadowOffset: 20,
  },
  bpText: {
    fontSize: 20,
    color: "black",
  },
  googleLoginBtn: {
    height: 50,
    margin: 12,
    backgroundColor: "#2DBAA0",
    flexDirection: "row",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  uploadFileContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadFileContainerImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addIconPic: {
    width: 20,
    height: 20,
    zIndex: 40,
  },
});

export default Signup;
