import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useSelector } from "react-redux";

const RedemptionDetail = () => {

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
  
  const redemptionProducts = [
    {
      id: 1,
      name: "Reusable Bamboo Utensil Set",
      description:
        "A set of reusable utensils made from sustainable bamboo, including a fork, knife, spoon, and carrying case.",
      points: 51, // Points required for redemption
      imageUrl:
        "https://www.bambooswitch.com/cdn/shop/products/6pc-bamboo-kitchen-utensil-holder-set-249467.jpg?v=1688603513",
      category: "Product",
      stock: "In stock",
      quantity: 38,
      redeemed: true,
      redeemedDate: "2024-04-25",
    },
    {
      id: 2,
      name: "Organic Cotton Tote Bag",
      description:
        "A durable tote bag made from organic cotton, perfect for shopping or carrying essentials.",
      points: 350,
      imageUrl:
        "https://www.oneworld-zerowaste.com/cdn/shop/products/IMG_4830.jpg?v=1544563046",
      category: "Product",
      stock: "Out of stock",
      quantity: 30,
      redeemed: true,
      redeemedDate: "2023-12-25",
    },
  ];

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
