import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStacks } from "./AllStack";
import Home from "../screen/Home";
import BottomTab from "./BottomTab";

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
            title: ''
          }}
        />
      </MainStackNavigator.Navigator>
    </>
  );
};

export default Routes;
