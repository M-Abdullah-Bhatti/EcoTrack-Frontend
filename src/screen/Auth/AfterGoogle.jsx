import { useAuth, useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";

export default function UseAuthExample() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <Text style={{ marginTop: 100, textAlign: "center" }}>
      Hello, {userId} your current active session is {sessionId}
      Hello, {user.firstName} your currentemail is{" "}
      {user.primaryEmailAddress.emailAddress}
    </Text>
  );
}
