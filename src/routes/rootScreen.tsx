import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Pages
import MainHome from '../screens/home/MainHome';
import MainPhoto from '../screens/photo/MainPhoto';
import MainShop from '../screens/shop/MainShop';
import MainInfo from '../screens/info/MainInfo';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function RootScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Memory') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'Shop') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'MyPage') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Map"
          component={MainHome}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Memory"
          component={MainPhoto}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Shop"
          component={MainShop}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="MyPage"
          component={MainInfo}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default RootScreen;
