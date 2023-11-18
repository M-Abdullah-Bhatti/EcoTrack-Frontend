import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStacks } from "./AllStack";
import Home from "../screen/Home";
import BottomTab from "./BottomTab";
import SetBudget from "../screen/SetBudget";
import AddEmission from "../screen/Home/AddEmission";

const Routes = () => {
  const MainStackNavigator = createNativeStackNavigator();
  const navOptionHandler = () => ({
    headerShown: false,
  });

  return (
    <>
      <MainStackNavigator.Navigator initialRouteName="Home">
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
            title: "Monthly Budget",
          }}
        />
        <MainStackNavigator.Screen
          name="AddEmission"
          component={AddEmission}
          options={{
            title: "Add Emission",
          }}
        />
      </MainStackNavigator.Navigator>
    </>
  );
};

export default Routes;
