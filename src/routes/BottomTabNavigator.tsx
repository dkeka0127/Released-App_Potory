import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import MainHome from '../screens/home/MainHome';
import MainPhoto from '../screens/photo/MainPhoto';
import MainInfo from '../screens/info/MainInfo';

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Map') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Memory') {
            iconName = focused ? 'images' : 'images-outline';
          } else if (route.name === 'MyPage') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Ionicons
              style={{paddingTop: 10}}
              name={iconName}
              size={25}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#111',
        tabBarInactiveTintColor: '#111',
      })}>
      <Tab.Screen
        name="Map"
        component={MainHome}
        options={{headerShown: false, tabBarLabel: ''}}
      />
      <Tab.Screen
        name="Memory"
        component={MainPhoto}
        options={{headerShown: false, tabBarLabel: ''}}
      />
      <Tab.Screen
        name="MyPage"
        component={MainInfo}
        options={{headerShown: false, tabBarLabel: ''}}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
