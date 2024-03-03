import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const Dot = ({ delay }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 600,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation, delay]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          opacity: animation,
        },
      ]}
    />
  );
};

const ThreeDotLoader = () => (
  <View style={styles.container}>
    <Dot delay={0} />
    <Dot delay={200} />
    <Dot delay={400} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    marginLeft: 10,
  },
  dot: {
    backgroundColor: "#000",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 2,
  },
});

export default ThreeDotLoader;
