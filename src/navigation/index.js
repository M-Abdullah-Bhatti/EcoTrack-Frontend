import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStacks } from "./AuthStack";
import Home from "../screen/Home";
import BottomTab from "./BottomTab";
import SetBudget from "../screen/SetBudget";
import AddScreen from "../screen/Home/AddScreen";
import AddEmissionCategory from "../screen/Home/AddEmissionCategory";
import AddEmission from "../screen/Home/AddEmission";
import SplashScreen from "../screen/SplashScreen";
import EmissionDetailScreen from "../screen/Home/EmissionDetailScreen";
import { StatusBar } from "expo-status-bar";
import UserDashboard from "../screen/Home/UserDashboard";
import ChatbotButton from "../components/Shared/ChatbotButton";
import ChatScreen from "../screen/Home/ChatScreen";

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
          name="Home"
          component={BottomTab}
          options={{
            headerTransparent: true,
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
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: true,
            title: "Chatbot",
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
      </MainStackNavigator.Navigator>
      {/* <ChatbotButton /> */}
    </>
  );
};

export default Routes;
