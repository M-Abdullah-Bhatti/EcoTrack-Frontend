import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
const RedemptionDetail = () => {
  const totalUserWinPrice = 100;
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
    {
      id: 3,
      name: "Discount Voucher - Eco-Friendly Clothing Store",
      description:
        "Receive a 20% discount voucher for your next purchase at an eco-friendly clothing store.",
      points: 200,
      category: "Voucher",
      stock: "In stock",
      quantity: 13,
      imageUrl:
        "https://www.printlab.my/uploads/6/7/2/0/6720900/gift-voucher-discount-voucher-2-01_orig.jpg",
      redeemed: true,
      redeemedDate: "2024-03-21",
    },

    // Add more products as needed
  ];

  return (
    <ScrollView
      style={{
        // flex: 1,
        backgroundColor: "white",
        display: "flex",
        marginHorizontal: "2%",
        width: "96%",
        marginTop: 10,
      }}
      contentContainerStyle={{ paddingBottom: 550 }}
    >
      {redemptionProducts.map((rp, i) => (
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
              // borderRadius: 20,
              zIndex: 3,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              {rp.category}
            </Text>
          </View>
          <Image
            src={rp.imageUrl}
            style={{ width: "100%", height: 100, objectFit: "fill" }}
          />
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
              <View>
                <Text>Quantity</Text>
                <Text style={{ fontWeight: "bold" }}>{rp.quantity}</Text>
              </View>
              <View>
                <Text>Prize/{rp.category}</Text>
                <Text style={{ fontWeight: "bold" }}>{rp.quantity}</Text>
              </View>
            </View>
            <View style={styles.redeemedInfo}>
              <Text style={styles.redeemedText}>
                Redeemed on {rp.redeemedDate}
              </Text>
            </View>
          </View>
          <View></View>
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
