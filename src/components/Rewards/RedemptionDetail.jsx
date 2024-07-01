import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const RedemptionDetail = ({ navigation }) => {
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
          `https://ecotrack-dev.vercel.app/api/voucher/allVouchersOfUser?userId=${user._id}`,
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

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        display: "flex",
        marginHorizontal: "2%",
        width: "96%",
        marginTop: 10,
      }}
      contentContainerStyle={{ paddingBottom: 570 }}
    >
      {vouchers.length == 0 ? (
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 20,
            backgroundColor: "white",
            height: "100%",
            paddingTop: 80,
            flex: 1,
          }}
        >
          <Text>You have not redeemed any reward yet</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Community")}
            style={{
              display: "flex",
              alignItems: "center",
              height: 50,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#a8a5a5",
                fontSize: 14,
                marginRight: 10,
              }}
            >
              Contribute to community to earn rewards
            </Text>
            <AntDesign name="arrowright" size={16} color="#a8a5a5" />
          </TouchableOpacity>
        </View>
      ) : (
        vouchers.map((voucher, i) => (
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
              <Text
                style={{ fontWeight: "800", fontSize: 16, marginBottom: 4 }}
              >
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
                  <MaterialIcons
                    name="error-outline"
                    size={20}
                    color="#ffc53d"
                  />

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
                  <MaterialIcons
                    name="error-outline"
                    size={20}
                    color="#ffc53d"
                  />

                  <Text style={{ fontSize: 14, color: "#ffc53d" }}>
                    In Stock
                  </Text>
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
                  <MaterialIcons
                    name="error-outline"
                    size={20}
                    color="#ffc53d"
                  />

                  <Text style={{ fontSize: 14, color: "#ffc53d" }}>
                    Out of stock
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))
      )}
      {}
    </ScrollView>
  );
};

export default RedemptionDetail;
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
    height: 200,
    position: "relative",
  },
  redeemButtonText: {
    color: "white",
  },
  redeemedInfo: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  redeemedText: {
    fontWeight: "bold",
    fontSize: 10,
  },
});
