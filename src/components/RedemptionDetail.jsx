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
    },
    {
      id: 4,
      quantity: 50,
      name: "Digital E-Book - Sustainable Living Guide",
      description:
        "Download a comprehensive guide to sustainable living, packed with tips and advice for reducing your environmental footprint.",
      points: 30,
      category: "Download",
      stock: "Out of stock",
      imageUrl:
        "https://i0.wp.com/blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEga_xC0wojUoZfoWA4PNWidJhxm0Eh6MyYZRoqor0oe0vuUjOms3aKDGOhh1SEVrQ4oH7j2mMAuDeyVrn56ngRwLk7bqhawQkY_MTexw6IabhN5ZjvdiZSZ_P9PxbFC5I4qHl0hnCphBKRf-NDiNjqwcSpaDi0rl2kjlAHjVAFDDrA069XwKslXOZIEX-0/s3000/pexels-perfecto-capucine-1329571.jpg?ssl=1",
    },
    {
      id: 5,
      quantity: 83,
      name: "Donation to Reforestation Project",
      description:
        "Support a reforestation project by redeeming points to plant trees and restore ecosystems.",
      points: 16,
      category: "Cause",
      stock: "In stock",
      imageUrl:
        "https://images.mid-day.com/images/images/2022/jul/TreePlantation_d.jpg",
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
            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    rp.stock == "In stock" && totalUserWinPrice > rp.points
                      ? "#0c856e"
                      : "grey",
                  paddingVertical: 8,
                  borderRadius: 20,
                  paddingHorizontal: 16,
                },
              ]}
              disabled={rp.stock != "In stock" || totalUserWinPrice < rp.points}
            >
              <Text style={{ color: "white" }}>Redeem</Text>
            </TouchableOpacity>
          </View>
          <View>
            {totalUserWinPrice < rp.points && rp.stock == "In stock" && (
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
            {totalUserWinPrice > rp.points && rp.stock == "In stock" && (
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
            {rp.stock !== "In stock" && (
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
});
