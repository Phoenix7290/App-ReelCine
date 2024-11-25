// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Home from "../screens/Home";
// import Config from "../screens/Config";

// const bottomTab = createBottomTabNavigator();

// const Navigation = () => {
//   return (
//     <NavigationContainer>
//       <bottomTab.Navigator>
//         <bottomTab.Screen name="Home" component={Home} />
//         <bottomTab.Screen name="Profile" component={Config} />
//       </bottomTab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default Navigation;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import SettingsScreen from '../screens/Settings';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff4500',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
