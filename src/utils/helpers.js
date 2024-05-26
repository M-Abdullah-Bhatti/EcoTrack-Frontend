// Import the storage service
import { Platform, ToastAndroid } from "react-native";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import required functions

export const uploadImage = async (imageUri) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
  const storageRef = ref(storage, filename); // Create a reference

  try {
    const snapshot = await uploadBytes(storageRef, blob); // Upload the blob
    const url = await getDownloadURL(snapshot.ref); // Get the download URL
    return url; // Return the URL of the uploaded file
  } catch (e) {
    console.log("error: ", e);
    throw e; // It's generally better to throw the error so the caller can handle it
  }
};

export const formatDateLikeFacebook = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    // If more than a week ago, return the full date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else if (days > 1) {
    return days + " days ago";
  } else if (days === 1) {
    return "Yesterday";
  } else if (hours > 1) {
    return hours + " hours ago";
  } else if (hours === 1) {
    return "An hour ago";
  } else if (minutes > 1) {
    return minutes + " minutes ago";
  } else if (minutes === 1) {
    return "A minute ago";
  } else {
    return "Just now";
  }
};

export function toastShow(text) {
  if (Platform.OS === "android") {
    ToastAndroid.showWithGravityAndOffset(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      75
    );
  } else if (Platform.OS === "ios") {
    Toast.showWithGravityAndOffset(text, Toast.SHORT, Toast.BOTTOM, 0, 75);
  }
}

export const groupByDate = (rewards) => {
  return rewards.reduce((acc, reward) => {
    const date = new Date(reward.createdAt).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(reward);
    return acc;
  }, {});
};
