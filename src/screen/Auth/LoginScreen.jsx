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
  Animated,
  Easing,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { FontAwesome, AntDesign, Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import Svg, { Path, Rect } from "react-native-svg";
import { loginStart, loginSuccess } from "../../redux/userSlice";
// const AnimatedChart = () => {
//   return (
//     <View style={styles.container}>
//       <Svg width={chartWidth} height={chartHeight} style={styles.svg}>
//         <Path
//           d={`M${start} C${controlPointA} ${controlPointB} ${end} v${end}`}
//           stroke={"black"}
//           fill={"yellow"}
//           strokeWidth={3}
//         />
//         <AnimatedRect
//           x={originX}
//           y={0}
//           width={chartWidth}
//           height={chartHeight}
//           fill={"white"}
//         />
//       </Svg>
//     </View>
//   );
// };

const Login = ({ navigation }) => {
  const imgSrc = require("../../../assets/logo-text.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { width, height } = Dimensions.get("screen");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const AnimatedRect = Animated.createAnimatedComponent(Rect);
  const animatedVal = React.useRef(new Animated.Value(0)).current;
  const validateForm = () => {
    let errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const chartWidth = width;
  const chartHeight = 225;

  const start = `0, ${chartHeight}`;
  const controlPointA = `${chartWidth / 100} ${chartHeight / 2}`;
  const controlPointB = `${(chartWidth / 3) * 2} ${chartHeight}`;
  const end = `${chartWidth} ${chartHeight / 2}`;

  const originX = animatedVal.interpolate({
    inputRange: [0, 0],
    outputRange: [0, chartWidth],
  });
  React.useEffect(() => {
    Animated.timing(animatedVal, {
      toValue: 10,
      duration: 3000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }, []);
  const handleLogin = async () => {
    // if (!email || !password) {
    //   alert("Please enter both email and password");
    //   return;
    // }
    if (!validateForm()) {
      return; // Exit if the form is not valid
    }

    try {
      // dispatch(loginStart());
      const response = await fetch(
        "https://ecotrack-dev.vercel.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json(); // Parse the response body as JSON
        alert("Login successful!");
        dispatch(loginSuccess(responseData)); // Use responseData instead of response.data
        navigation.replace("Home");
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.headerDiv}>
          <Svg width={chartWidth} height={chartHeight} style={styles.svg}>
            <Path
              d={`M${start} C${controlPointA} ${controlPointB} ${end} v${end}`}
              stroke={""}
              fill={"white"} // Set the color to match your headerDiv background
              strokeWidth={0}
            />
            {/* <AnimatedRect
              x={originX}
              y={0}
              width={chartWidth}
              height={chartHeight}
              fill={"white"}
            /> */}
          </Svg>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              borderRadius: 135 / 2,
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              source={require("../../../assets/splashbg.jpg")}
            />
          </View>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 28,
              color: "#04753E",
              fontWeight: "bold",
              marginBottom: 6,
              marginTop: -10,
            }}
          >
            Eco Track
          </Text>
          <Text style={{ fontSize: 14, color: "black", marginBottom: 5 }}>
            Login To your Account
          </Text>
        </View>
        <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
          {errors.email && (
            <View style={{ width: "90%" }}>
              <Text
                style={{
                  color: "red",

                  marginBottom: -10,
                  fontSize: 12,
                  marginTop: 10,
                  textAlign: "left",
                }}
              >
                {errors.email}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.inputContainer,
              errors.email && { borderColor: "red", borderWidth: 1 },
            ]}
          >
            <FontAwesome
              name="user"
              size={20}
              style={{ marginLeft: 7 }}
              color="#04753E"
            />
            <TextInput
              style={styles.input}
              onChangeText={(value) => setEmail(value)}
              value={email}
              placeholder="Enter Your Email..."
              placeholderTextColor="#04753E"
            />
          </View>
          {errors.password && (
            <View style={{ width: "90%" }}>
              <Text
                style={{
                  color: "red",

                  marginBottom: -10,
                  marginTop: 10,
                  textAlign: "left",
                  fontSize: 12,
                }}
              >
                {errors.password}
              </Text>
            </View>
          )}

          <View
            style={[
              styles.inputContainer,
              errors.password && { borderColor: "red", borderWidth: 1 },
            ]}
          >
            <FontAwesome
              name="lock"
              size={20}
              style={{ marginLeft: 7 }}
              color="#04753E"
            />
            <TextInput
              style={styles.input}
              onChangeText={(value) => setPassword(value)}
              value={password}
              placeholder="Enter Your Password..."
              placeholderTextColor="#04753E"
              secureTextEntry={!passwordVisible ? true : false}
            />
            {passwordVisible ? (
              <TouchableOpacity
                style={{
                  marginLeft: -12,
                }}
                onPress={() => setPasswordVisible(false)}
              >
                <Feather name="eye-off" size={18} color="#04753E" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  marginLeft: -12,
                }}
                onPress={() => setPasswordVisible(true)}
              >
                <AntDesign name="eye" size={18} color="#04753E" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={{ width: "90%" }}>
            <Text
              style={{
                textAlign: "right",

                color: "#04753E",
                fontWeight: "700",
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginTExt} onPress={() => handleSubmit()}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.breakPoint}>
          <View style={styles.item}></View>
          <Text style={styles.bpText}>OR</Text>
          <View style={styles.item}></View>
        </View>
        <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <TouchableOpacity style={styles.googleLoginBtn}>
            <Image
              style={{ width: 30, height: 30, objectFit: "cover" }}
              source={require("../../../assets/googlelogo.png")}
            />
            <Text style={styles.googleloginTExt}>CONTINUE WITH GOOGLE</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.5)" }}>
            Don’t have an account?{" "}
            <Text
              onPress={() => navigation.navigate("SignUp")}
              style={{ color: "#096151", fontWeight: "700" }}
            >
              Register
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
    height: 215,
    backgroundColor: "#2DBAA0",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  input: {
    height: "100%",
    margin: 12,

    padding: 10,
    borderRadius: 8,
    borderColor: "#acacac",
    width: "82%",

    fontSize: 12,
  },
  loginBtn: {
    width: "90%",

    height: 45,

    margin: 12,
    backgroundColor: "#0B8337",
    borderRadius: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  loginTExt: {
    fontSize: 14,
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
    height: 1,
    shadowColor: "black",
    shadowOffset: 20,
  },
  bpText: {
    fontSize: 12,
    color: "black",
  },
  googleLoginBtn: {
    height: 45,
    margin: 12,
    backgroundColor: "#EBF6EF",
    flexDirection: "row",
    borderRadius: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "90%",
    borderColor: "#04753E",
    borderWidth: 0.5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
    // borderWidth: 1,
    borderRadius: 8,
    borderColor: "#acacac",
    height: 45,
    width: "90%",
    backgroundColor: "#EBF6EF",
  },
  svg: {
    position: "absolute",
    zIndex: 10,
  },
  googleloginTExt: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#04753E",
  },
});

export default Login;
