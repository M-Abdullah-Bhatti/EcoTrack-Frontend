import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { toastShow, uploadImage } from "../utils/helpers";
import { pickVideos } from "../utils/pickImage";
import * as ImagePicker from "expo-image-picker";

const Upload = ({navigation}) => {
    const [toUploadImage, setToUploadImage] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useSelector((state) => state.user);

    const handlePostUpload = async () => {
        setIsLoading(true);
    
        try {
          const imageUrl = await uploadImage(toUploadImage);
          console.log("Image uploaded successfully:", imageUrl);
    
          const requestBody = {
            userId: user._id,
            postDescription: description,
            image: imageUrl,
          };
    
          const response = await fetch(
            "https://ecotrack-dev.vercel.app/api/posts/add/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify(requestBody),
            }
          );
    
          if (response.status === 401) Alert.alert("Unauthorized Access");
    
          if (!response.ok) {
            navigation.goBack();
            toastShow("Couldn't upload post. Try again later.");
            throw new Error("Failed to upload post. Please try again later.");
          }
    
          const responseData = await response.json();
          console.log("Post uploaded successfully!", responseData);
          setIsLoading(false);
          navigation.goBack();
          toastShow("Post uploaded successfully!");
        } catch (error) {
          navigation.goBack();
          console.error("Error uploading post:", error.message);
          toastShow("Couldn't upload post. Try again later.");
        } finally {
          setIsLoading(false);
        }
    };
    
    const pickMedia = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          console.log("result: ", result);
          console.log("result: ", result.uri);
          setToUploadImage(result.uri);
    
          // setUploadingImage(true);
          const image = await uploadImage(result.uri);
          console.log("image: ", image);
          setImage(image);
          // setUploadingImage(false);
        }
    };
  
    return (
        <View
            presentationStyle="fullScreen"
            style={{ position: "relative" }}
        >
            <TextInput
                placeholder="Say Something..."
                style={{ fontSize: 20, margin: 10, height: 60 }}
                multiline
                onChangeText={(e) => setDescription(e)}
            />
            <View style={styles.modalMediaBtns}>
            {toUploadImage ? (
                <View
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                <Image
                    source={{ uri: toUploadImage }}
                    style={{ width: "100%", height: 250 }}
                />
                <TouchableOpacity
                    style={{
                    backgroundColor: "#04753E",
                    marginTop: 20,
                    minWidth: 150,
                    alignItems: "center",
                    paddingVertical: 12,
                    borderRadius: 12,
                    }}
                    onPress={handlePostUpload}
                    disabled={isLoading}
                >
                    {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                    ) : (
                    <Text style={{ color: "white", fontSize: 18 }}>Post</Text>
                    )}
                </TouchableOpacity>
                </View>
            ) : (
                <>
                <TouchableOpacity
                    style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "46%",
                    gap: 10,
                    backgroundColor: "#f5f5f5",
                    borderColor: "#ccc",
                    borderWidth: 0.75,
                    padding: 10,
                    borderRadius: 12,
                    }}
                    onPress={pickMedia}
                >
                    <Entypo name="images" size={24} color="red" />

                    <Text>Add Images</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "46%",
                    gap: 10,
                    backgroundColor: "#f5f5f5",
                    borderColor: "#ccc",
                    borderWidth: 0.75,
                    borderRadius: 12,
                    }}
                    onPress={pickVideos}
                >
                    <Entypo name="folder-video" size={24} color="blue" />
                    <Text>Add Videos</Text>
                </TouchableOpacity>
                </>
            )}
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    modalMediaBtns: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 50,
    },
});

export default Upload;