import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BudgetScreen from '../screen/Home/BudgetScreen';
import EmissionsScreen from '../screen/Home/EmissionsScreen';
import ActScreen from '../screen/Home/ActScreen';
import SettingsScreen from '../screen/Home/SettingsScreen';
import AddScreen from '../screen/Home/AddScreen';

import { Ionicons, Foundation } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: StatusBar.currentHeight - 4,
        },
        tabBarActiveTintColor: '#46A667'
      }}
    >
      <Tab.Screen name="Budget" component={BudgetScreen} 
        options={{
          title: 'Carbon Budget',
          tabBarIcon: ({color, size}) => (<Ionicons name="calculator" color={color} size={size}/>),
      }}   
      />
      <Tab.Screen name="Emissions" component={EmissionsScreen} 
        options={{ 
          tabBarIcon: ({color, size}) => (<Foundation name="graph-bar" color={color} size={size}/>) 
        }}
      />
      <Tab.Screen name="Add" component={AddScreen} 
        options={{ 
          tabBarIcon: ({color, size}) => (<Ionicons name="add-circle-sharp" color={color} size={size}/>) 
        }}
      />
      <Tab.Screen name="Act" component={ActScreen} 
        options={{ 
          tabBarIcon: ({color, size}) => (<Ionicons name="hand-left" color={color} size={size}/>) 
        }}
      />
      <Tab.Screen name="Community" component={SettingsScreen} 
        options={{ 
          tabBarIcon: ({color, size}) => (<Ionicons name="people" color={color} size={size}/>) 
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab