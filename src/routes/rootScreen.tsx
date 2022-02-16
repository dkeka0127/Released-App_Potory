import React from 'react';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Navigation
import BottomTabNavigation from './BottomTabNavigator';

// Home

// Photo
import AddPhotoScreen from '../screens/photo/container/AddPhotoScreen';
import EditPhotoScreen from '../screens/photo/container/EditPhotoScreen';
// Info
import SettingScreen from '../screens/info/container/SettingScreen';
import Notice from '../screens/info/container/Notice';
import FrequecyQuestion from '../screens/info/container/FrequecyQuestion';
import ServiceTOS from '../screens/info/container/ServiceTOS';
import LocationTOS from '../screens/info/container/LocationTOS';
import PrivacyPolicy from '../screens/info/container/PrivacyPolicy';

const Stack = createNativeStackNavigator();

// StackNavigation Function
function RootScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigation}
        options={{headerShown: false}}
      />
      {/* Home */}
      {/* Photo */}
      <Stack.Screen name="AddPhotoScreen" component={AddPhotoScreen} />
      <Stack.Screen name="EditPhotoScreen" component={EditPhotoScreen} />
      {/* Info */}
      <Stack.Screen name="설정" component={SettingScreen} />
      <Stack.Screen
        name="공지사항"
        component={Notice}
        options={{headerShown: false}}
      />
      <Stack.Screen name="자주 묻는 질문" component={FrequecyQuestion} />
      <Stack.Screen name="서비스 이용약관" component={ServiceTOS} />
      <Stack.Screen name="위치정보 이용약관" component={LocationTOS} />
      <Stack.Screen name="개인정보 처리방침" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
}

export default RootScreen;
