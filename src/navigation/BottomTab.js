import { SafeAreaView, StatusBar, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BudgetScreen from "../screen/Home/BudgetScreen";
import EmissionsScreen from "../screen/Home/EmissionsScreen";
import CommunityScreen from "../screen/Home/CommunityScreen";
import AddScreen from "../screen/Home/AddScreen";

import { Ionicons, Foundation } from "@expo/vector-icons";
import FoodGuide from "../screen/FoodGuide";
import HabitsGuide from "../screen/HabitsGuide";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function TopTabs() {
  return (
    <SafeAreaView style={{flex: 1, paddingTop: 30}}>
      <TopTab.Navigator>
        <TopTab.Screen name="Food" component={FoodGuide} />
        <TopTab.Screen name="Habits" component={HabitsGuide} />
      </TopTab.Navigator>
    </SafeAreaView>
  );
}

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#46A667",
        headerShown: false,
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
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Act"
        component={TopTabs}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hand-left" color={color} size={size} />
          ),
          // title: "Sustainable Guide",
          headerTitleStyle: {
            textAlign: "center",
          },
          // tabBarLabel: 'Act'
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          headerShown: false,
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
