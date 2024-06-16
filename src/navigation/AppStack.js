import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';

import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';

import BottomTab from './BottomTab';
import RewardScreen from '../screen/RewardScreen';
import EditProfileScreen from '../screen/Home/EditProfile';
import GoalsStatusScreen from '../screen/Home/GoalsStatusScreen';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#04753E',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={BottomTab}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="GoalsDetails"
        component={GoalsStatusScreen}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="Trophy" size={24} color={color} />
          ),
          headerShown: true,
          title: 'My Goals'
        }}
      />
      <Drawer.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
          headerShown: true
        }}
      />
      <Drawer.Screen
        name="Rewards"
        component={RewardScreen}
        options={{
          drawerIcon: ({color}) => (
            <Feather name="award" size={22} color={color} />
          ),
          headerShown: true
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;