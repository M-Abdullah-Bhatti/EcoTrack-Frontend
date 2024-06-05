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
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  FontAwesome,
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import Svg, { Path, Rect } from "react-native-svg";
import { loginStart, loginSuccess } from "../../redux/userSlice";
import ErrorModal from "../../components/Shared/ErrorModal";
import SuccessModal from "../../components/Shared/SuccessModal";
import { toastShow } from "../../utils/helpers";
import baseUrl from "../../utils/baseUrl";

const ForgotPassword = ({ navigation }) => {
  const imgSrc = require("../../../assets/logo-text.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { width, height } = Dimensions.get("screen");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const AnimatedRect = Animated.createAnimatedComponent(Rect);
  const animatedVal = React.useRef(new Animated.Value(0)).current;
  const [keyboardPadding, setKeyboardPadding] = useState(0);
  const [loader, setLoader] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [error, setError] = useState("");

  const toggleErrorModal = () => {
    setShowErrorModal(!showErrorModal);
  };

  const validateForm = () => {
    let errors = {};
    if (!email) errors.email = "Email is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const handleFocus = () => {
    Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardPadding(e.endCoordinates.height);
    });
  };

  const handleBlur = () => {
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardPadding(0);
    });
  };

  const chartWidth = width;
  const chartHeight = 225;

  const start = `0, ${chartHeight - 10}`;
  const controlPointA = `${chartWidth / 150} ${chartHeight / 2}`;
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
    if (!validateForm()) {
      return; // Exit if the form is not valid
    }

    try {
      setLoader(true);
      // dispatch(loginStart());
      const response = await fetch(`${baseUrl}/api/users/forgotPassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        setLoader(false);
        const responseData = await response.json(); // Parse the response body as JSON
        console.log("responseData: ", responseData);
        navigation.navigate("VerificationCode", { email });
      } else {
        setLoader(false);

        const errorData = await response.json();
        setError(`Login failed: ${errorData.message}`);
        toggleErrorModal();
      }
    } catch (error) {
      setError(`An error occurred. Please try again.`);
      toggleErrorModal();
      setLoader(false);
    }
  };

  return (
    <View
      // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      // behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        flex: 1,
        // paddingBottom: -keyboardPadding,

        // backgroundColor: "red",
      }}
    >
      <ScrollView
        style={[styles.container]}
        // contentContainerStyle={{ paddingBottom: keyboardPadding }}
      >
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
          <Text style={{ fontSize: 14, color: "black", marginBottom: 30 }}>
            Forgot your password
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
            {/* <Ionicons
                name="mail"
                size={17}
                style={{ paddingLeft: 11 }}
                color="#04753E"
              /> */}
            <MaterialIcons
              name="email"
              size={20}
              style={{ marginLeft: 13 }}
              color="#04753E"
            />

            <TextInput
              style={styles.input}
              onChangeText={(value) => setEmail(value)}
              value={email}
              placeholder="Enter Your Email..."
              placeholderTextColor="#04753E"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            {loader ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.loginTExt}>Send Mail</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Error Modal */}
        {showErrorModal && (
          <ErrorModal
            isVisible={showErrorModal}
            hideModal={toggleErrorModal}
            modalText={error}
            buttonText={"Continue"}
          />
        )}
      </ScrollView>
    </View>
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
    margin: 5,

    // padding: 10,
    borderRadius: 8,
    borderColor: "#acacac",
    width: "78%",
    // borderWidth: 1,

    fontSize: 13,
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
    marginTop: 10,
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
    justifyContent: "space-around",
    position: "relative",
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

export default ForgotPassword;
