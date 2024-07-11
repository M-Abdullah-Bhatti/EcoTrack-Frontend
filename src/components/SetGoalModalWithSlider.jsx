import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import ButtonComponent from "./Shared/ButtonComponent";
import Slider from "@react-native-community/slider";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { refreshUser } from "../redux/userSlice";
import baseUrl from "../utils/baseUrl";
import { toastShow } from "../utils/helpers";

const { width } = Dimensions.get("screen");

const SetGoalModalWithSlider = ({
  isVisible,
  hideModal,
  category,
  success,
  error,
  refetchAgain,
}) => {
  const [goalTarget, setgoalTarget] = useState(0);

  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);

  const handleSetGoal = async () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + 1); // Set endDate to one month ahead

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        userId: user._id,
        category,
        percentage: 0,
        target: goalTarget,
        startDate,
        endDate,
        goalAchieved: false,
      };

      console.log("ADD GOAL BODY: ", body);

      const addedGoal = await axios.post(
        `${baseUrl}/api/goal/add/`,
        body,
        config
      );

      console.log("GOAL ADDDEDDDD: ", addedGoal.data);
      dispatch(refreshUser(user._id));
      refetchAgain();
      hideModal();
      toastShow("Goal added succesfully!");
    } catch (error) {
      console.error("Error setting goal:", error);
      hideModal();
    }
  };

  return (
    <Modal
      hasBackdrop={true}
      onBackdropPress={hideModal}
      isVisible={isVisible}
      animationIn={"fadeInLeft"}
      animationOut={"fadeOutRight"}
      backdropColor="#c9c7c7"
    >
      <View
        style={{
          width: wp("89%"),
          minHeight: hp("40%"),
          borderRadius: wp("3%"),
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          paddingHorizontal: wp("5%"),
          paddingVertical: hp("1%"),
        }}
      >
        {error && <MaterialIcons name="error" size={24} color="#d1180a" />}
        {success && (
          <AntDesign
            name="checkcircle"
            size={24}
            color="#46A667"
            style={{ marginBottom: 10 }}
          />
        )}
        <Text
          style={{
            color: "#253551",
            fontSize: 16,
            fontWeight: "800",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Set Goal for {category} Emissions
        </Text>
        <Text
          style={{
            color: "#657389",
            fontSize: 14,
            letterSpacing: 0.24,
            marginBottom: 20,
          }}
        >
          Select a reduction percentage goal for your {category} emissions.
        </Text>
        <View style={{ width: "100%", marginBottom: 20 }}>
          <Text style={{ marginVertical: 6, marginLeft: 3 }}>
            {goalTarget} Kg CO2
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Slider
              style={{
                width: width * 0.85,
                height: 40,
              }}
              minimumValue={1}
              maximumValue={150}
              minimumTrackTintColor="#46A667"
              maximumTrackTintColor="#000000"
              thumbTintColor="#46A667"
              onValueChange={(x) => setgoalTarget(Math.ceil(x))}
            />
          </View>
        </View>
        <ButtonComponent
          spacing={{
            borderRadius: 20,
          }}
          buttonText="Done"
          onPress={handleSetGoal}
          backgroundColor={"black"}
        />
      </View>
    </Modal>
  );
};

export default SetGoalModalWithSlider;
