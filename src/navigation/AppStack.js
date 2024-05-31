import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';

import { Ionicons, Feather } from '@expo/vector-icons';

import HabitsGuide from '../screen/HabitsGuide';
import BottomTab from './BottomTab';
import RewardScreen from '../screen/RewardScreen';
import EditProfileScreen from '../screen/Home/EditProfile';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setEmissions, setGoals } from '../redux/userSlice';
import { Alert } from 'react-native';

const Drawer = createDrawerNavigator();

const AppStack = () => {

  const { user, token, goals, emissions } = useSelector((state)=> state.user);
  const dispatch = useDispatch();

  useEffect(()=> {
    const getEmissionsData = async () => {
      // setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      try {
        const emissionData = await axios.get(
          `https://ecotrack-dev.vercel.app/api/emission/weekly/60c72b2f9b1d4c23d8a75b3c`, config
        );
        dispatch(setEmissions(emissionData.data.result))
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    const getGoalsData = async () => {
      // setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      try {
        const goalsData = await axios.get(
          `https://ecotrack-dev.vercel.app/api/goal/weekly/60c72b2f9b1d4c23d8a75b3c`, config
        );
        dispatch(setGoals(goalsData.data))
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    if(!emissions) {
      getEmissionsData();
    }

    if(!goals) {
      getGoalsData();
    }

    // if(emissions[0].exceedsThreshold) {
    //   Alert.alert(`${emissions[0].category} Exceeds threshold value`)
    // }

    // if(goals[0].startDate, ">>>", goals[0].endDate) {
    //   console.log(goals[0].startDate, ">>>", goals[0].endDate)
    //   Alert.alert(`Your weekly ${goals[0].category} goals not met`)
    // }

  }, []);

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