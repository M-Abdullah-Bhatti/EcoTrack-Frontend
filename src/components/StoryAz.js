import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";

const StoryAz = () => {
  return (
    <View style={styles.stories}>
        <FlatList
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
            showsHorizontalScrollIndicator={false}
            style={{ height: 130, gap: 30 }}
            data={stories}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.singleStory}>
                <View
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                >
                  <Image
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                    source={item.story}
                  />
                </View>
                {item.user != "LoggedIn" && (
                  <Text
                    style={{ textAlign: "center", marginTop: 10, fontSize: 12 }}
                  >
                    {item.user}
                  </Text>
                )}

                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    height: 24,
                    width: 24,
                    bottom: -10,
                    borderRadius: 12,
                    alignSelf: "center",
                    marginTop: 40,
                    zIndex: 20,
                  }}
                >
                  {item.icon ? (
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 24,
                        width: 24,
                      }}
                    >
                      {item.icon}
                    </View>
                  ) : (
                    <Image
                      source={item.pic}
                      style={{
                        height: 24,
                        width: 24,
                        borderRadius: 12,
                      }}
                    />
                  )}
                </View>
                {item.user != "LoggedIn" && (
                  <View
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      borderRadius: 10,
                      zIndex: 2,
                    }}
                  ></View>
                )}
              </TouchableOpacity>
            )}
        />
    </View>
  )
};

const styles = StyleSheet.create({
    stories: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      gap: 20,
      paddingHorizontal: 10,
      marginTop: 2,
      position: "relative",
    },
    singleStory: {
      width: 70,
      height: 100,
      position: "relative",
    },
});

export default StoryAz;
