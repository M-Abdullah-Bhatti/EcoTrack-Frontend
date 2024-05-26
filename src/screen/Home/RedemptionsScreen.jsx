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
import { redemptionProducts } from "../../data";

const RedemptionsScreen = () => {
  const totalUserWinPrice = 100;

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
    height: 200,
    position: "relative",
  },
});
