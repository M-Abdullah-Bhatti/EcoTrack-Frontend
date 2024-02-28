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
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess } from "../../redux/userSlice";

const Login = ({ navigation }) => {
  const imgSrc = require("../../../assets/logo-text.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
  
    try {
      // dispatch(loginStart());
      const response = await fetch("https://ecotrack-dev.vercel.app/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        const responseData = await response.json(); // Parse the response body as JSON
        alert("Login successful!");
        dispatch(loginSuccess(responseData)); // Use responseData instead of response.data
        navigation.replace('Home');
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };
  
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
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
              marginTop: 60,
            }}
          >
            <Image source={require("../../../assets/mainLogo.png")} />
          </View>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image source={imgSrc} height={47} style={{ marginTop: 80 }} />
        </View>
        <View>
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
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginTExt}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.breakPoint}>
          <View style={styles.item}></View>
          <Text style={styles.bpText}>OR</Text>
          <View style={styles.item}></View>
        </View>
        <TouchableOpacity style={styles.googleLoginBtn}>
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
            Don’t have an account?{" "}
            <Text
              onPress={() => navigation.navigate("SignUp")}
              style={{ marginLeft: 3, color: "#096151", fontWeight: "700" }}
            >
              Signup
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
  },
  headerDiv: {
    height: 125,
    backgroundColor: "#2DBAA0",
    alignItems: "center",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#acacac",
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
});

export default Login;
