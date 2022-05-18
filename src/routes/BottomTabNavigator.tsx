import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/* icons */
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Tab1 from '../screens/tab1/Main';
import Tab2 from '../screens/tab2/Main';
import Tab3 from '../screens/tab3/Main';

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Tab1"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Tab1') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Tab2') {
            iconName = focused ? 'images' : 'images-outline';
          } else if (route.name === 'Tab3') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Ionicons
              style={{paddingTop: 9}}
              name={iconName}
              size={26}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#111',
        tabBarInactiveTintColor: '#111',
      })}>
      {/* Tabs */}
      <Tab.Screen
        name="Tab1"
        component={Tab1}
        options={{headerShown: false, tabBarLabel: ''}}
      />
      <Tab.Screen
        name="Tab2"
        component={Tab2}
        options={{headerShown: false, tabBarLabel: ''}}
      />
      <Tab.Screen
        name="Tab3"
        component={Tab3}
        options={{headerShown: false, tabBarLabel: ''}}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
