import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import axios from "axios";

import baseUrl from "../../utils/baseUrl";

const RedemptionsScreen = () => {
  const [vouchers, setVouchers] = useState([]);

  const { user, token } = useSelector((state) => state.user);

  useEffect(() => {
    const getVouchers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `https://ecotrack-dev.vercel.app/api/voucher/allVouchersForUsers?userId=${user._id}`,
          config
        );

        console.log("VOUCHERSSS: ", response.data);
        setVouchers(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    getVouchers();
  }, []);

  const redeemVoucher = async (voucherId) => {
    try {
      const requestBody = {
        userId: user?._id,
        voucherId: voucherId,
      };

      console.log("requestBody: ", requestBody);

      const response = await fetch(
        `${baseUrl}/api/voucher/assignVoucherToUser`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log("Voucher redeemed successfully!", responseData);
        Alert.alert("Success", "Voucher redeemed successfully!");
      } else {
        // throw new Error(responseData.message || "Failed to redeem voucher");
        Alert.alert(responseData.message || "Failed to redeem voucher")
      }
    } catch (error) {
      // console.error("Error redeeming voucher:", error);
      Alert.alert("Error", error.message || "There was an error redeeming the voucher. Please try again later.");
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        display: "flex",
        marginHorizontal: "2%",
        width: "96%",
        marginTop: 10,
      }}
    >
      {vouchers.map((voucher, i) => (
        <View key={i} style={styles.cardOfPrice}>
          <View
            style={{
              position: "absolute",
              left: 0,
              top: 20,
              backgroundColor: "#0c856e",
              width: "auto",
              paddingHorizontal: 10,
              paddingVertical: 4,
              zIndex: 3,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>Voucher</Text>
          </View>
          <Image
            src={voucher.image}
            style={{ width: "100%", height: 125, objectFit: "fill" }}
          />

          <View
            style={{
              display: "flex",
              marginTop: 8,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontWeight: "800", fontSize: 16, marginBottom: 4 }}>
              {voucher.name}
            </Text>
            <Text style={{ fontSize: 12 }}>{voucher.description}</Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 15,
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 30,
                alignSelf: "flex-start",
              }}
            >
              {/* <View>
                <Text>Quantity</Text>
                <Text style={{ fontWeight: "bold" }}>{voucher.quantity}</Text>
              </View> */}
              <View>
                <Text>Price</Text>
                <Text style={{ fontWeight: "bold" }}>{voucher.price}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: !voucher.disable ? "#0c856e" : "grey",
                  paddingVertical: 8,
                  borderRadius: 20,
                  paddingHorizontal: 16,
                },
              ]}
              disabled={voucher.disable}
              onPress={() => redeemVoucher(voucher._id)}
            >
              <Text style={{ color: "white" }}>Redeem</Text>
            </TouchableOpacity>
          </View>
          <View>
            {voucher.disable && (
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingHorizontal: 10,
                }}
              >
                <MaterialIcons name="error-outline" size={20} color="#ffc53d" />

                <Text style={{ fontSize: 14, color: "#ffc53d" }}>
                  Not enough points
                </Text>
              </View>
            )}
            {!voucher.disable && (
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingHorizontal: 10,
                }}
              >
                <MaterialIcons name="error-outline" size={20} color="#ffc53d" />

                <Text style={{ fontSize: 14, color: "#ffc53d" }}>In Stock</Text>
              </View>
            )}
            {voucher.disable && (
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingHorizontal: 10,
                }}
              >
                <MaterialIcons name="error-outline" size={20} color="#ffc53d" />

                <Text style={{ fontSize: 14, color: "#ffc53d" }}>
                  Out of stock
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default RedemptionsScreen;

const styles = StyleSheet.create({
  cardOfPrice: {
    backgroundColor: "white",
    width: "100%",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
    paddingBottom: 10,
  },
});
