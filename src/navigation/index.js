import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStacks } from "./AllStack";
import Home from "../screen/Home";

const Routes = () => {
  const MainStackNavigator = createNativeStackNavigator();
  const navOptionHandler = () => ({
    headerShown: false,
  });

  return (
    <>
      <MainStackNavigator.Navigator initialRouteName="AuthNavigation">
        <MainStackNavigator.Screen
          name="AuthNavigation"
          component={AuthStacks}
          options={navOptionHandler}
        />
        <MainStackNavigator.Screen
          name="Home"
          component={Home}
          // options={navOptionHandler}
        />
      </MainStackNavigator.Navigator>
    </>
  );
};

export default Routes;
