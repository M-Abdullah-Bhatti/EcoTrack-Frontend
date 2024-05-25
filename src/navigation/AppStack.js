import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';

import { Ionicons, Feather } from '@expo/vector-icons';

import HabitsGuide from '../screen/HabitsGuide';
import BottomTab from './BottomTab';
import RewardScreen from '../screen/RewardScreen';
import EditProfileScreen from '../screen/Home/EditProfile';

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
          // marginLeft: -25,
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
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Rewards"
        component={RewardScreen}
        options={{
          drawerIcon: ({color}) => (
            <Feather name="award" size={22} color={color} />
          ),
          headerTransparent: true,
          // title: ""
        }}
      />
      {/* <Drawer.Screen
        name="Messages"
        component={HabitsGuide}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default AppStack;