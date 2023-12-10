import { StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BudgetScreen from "../screen/Home/BudgetScreen";
import EmissionsScreen from "../screen/Home/EmissionsScreen";
import CommunityScreen from "../screen/Home/CommunityScreen";
import AddScreen from "../screen/Home/AddScreen";

import { Ionicons, Foundation } from "@expo/vector-icons";
import FoodGuide from "../screen/FoodGuide";
import HabitsGuide from "../screen/HabitsGuide";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function TopTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Food" component={FoodGuide} />
      <TopTab.Screen name="Habits" component={HabitsGuide} />
    </TopTab.Navigator>
  );
}

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "#46A667",
      }}
    >
      <Tab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          title: "Carbon Budget",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator" color={color} size={size} />
          ),
          headerStyle: {
            height: 75,
          },
        }}
      />
      <Tab.Screen
        name="Emissions"
        component={EmissionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="graph-bar" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-sharp" color={color} size={size} />
          ),
          headerStyle: {
            height: 75,
          },
        }}
      />
      <Tab.Screen
        name="Act"
        component={TopTabs}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hand-left" color={color} size={size} />
          ),
          headerStyle: {
            height: 75,
          },
          title: "Sustainable Guide",
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
          headerTransparent: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
