import React from 'react';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Pages
import MainHome from '../screens/home/MainHome';
import MainPhoto from '../screens/photo/MainPhoto';
import MainInfo from '../screens/info/MainInfo';
import SettingScreen from '../screens/info/container/SettingScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// BottomTabNavigation Function
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
        name="MyPage"
        component={MainInfo}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

// StackNavigation Function
function RootScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen name="설정" component={SettingScreen} />
    </Stack.Navigator>
  );
}

export default RootScreen;
