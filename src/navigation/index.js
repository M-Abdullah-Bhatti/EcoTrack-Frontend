import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStacks } from "./AuthStack";
import Home from "../screen/Home";
import BottomTab from "./BottomTab";
import SetBudget from "../screen/SetBudget";
import AddEmissionCategory from "../screen/Home/AddEmissionCategory";
import AddEmission from "../screen/Home/AddEmission";
import SplashScreen from "../screen/SplashScreen";
import EmissionDetailScreen from "../screen/Home/EmissionDetailScreen";
import { StatusBar } from "expo-status-bar";
import UserDashboard from "../screen/Home/UserDashboard";
import ChatScreen from "../screen/Home/ChatScreen";
import ProfileScreen from "../screen/Home/ProfileScreen";
import EditProfileScreen from "../screen/Home/EditProfile";
import AppStack from "./AppStack";
import Story from "../screen/Story";
import RewardScreen from "../screen/RewardScreen";
import Upload from "../screen/Upload";
import ChatbotButton from "../components/Shared/ChatbotButton";

const Routes = () => {
  const MainStackNavigator = createNativeStackNavigator();
  const navOptionHandler = () => ({
    headerShown: false,
  });

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <MainStackNavigator.Navigator initialRouteName="Splash">
        <MainStackNavigator.Screen
          name="Splash"
          component={SplashScreen}
          options={navOptionHandler}
        />
        <MainStackNavigator.Screen
          name="AuthNavigation"
          component={AuthStacks}
          options={navOptionHandler}
        />
        <MainStackNavigator.Screen
          name="Main"
          component={AppStack}
          options={{
            headerShown: false,
            title: "",
          }}
        />
        <MainStackNavigator.Screen
          name="SetBudget"
          component={SetBudget}
          options={{
            headerShown: true,
            title: "Monthly Budget",
          }}
        />

        <MainStackNavigator.Screen
          name="Upload"
          component={Upload}
          options={{
            headerShown: true,
            title: "Uplaod",
          }}
        />

        <MainStackNavigator.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: true,
            title: "Chatbot",
          }}
        />

        <MainStackNavigator.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: true,
            title: "Profile",
          }}
        />

        <MainStackNavigator.Screen
          name="Story"
          component={Story}
          options={{ headerShown: false }}
        />

        <MainStackNavigator.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerShown: true,
            title: "Edit Profile",
          }}
        />

        <MainStackNavigator.Screen
          name="AddEmissionCategory"
          component={AddEmissionCategory}
          options={{
            title: "Add Emission category",
          }}
        />

        <MainStackNavigator.Screen
          name="AddEmission"
          component={AddEmission}
          options={{
            title: "Add Emission",
          }}
        />
        <MainStackNavigator.Screen
          name="EmissionDetail"
          component={EmissionDetailScreen}
          options={{
            title: "Add Emission",
            headerShown: true,
            headerStyle: {},
          }}
        />
        <MainStackNavigator.Screen
          name="UserDashboard"
          component={UserDashboard}
          options={{
            headerShown: false,
          }}
        />
        <MainStackNavigator.Screen
          name="RewardScreen"
          component={RewardScreen}
          options={{
            headerTransparent: true,
            title: "",
          }}
        />
      </MainStackNavigator.Navigator>
      {/* <ChatbotButton /> */}
    </>
  );
};

export default Routes;
