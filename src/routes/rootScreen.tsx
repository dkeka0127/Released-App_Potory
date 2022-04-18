import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Navigation
import BottomTabNavigation from './BottomTabNavigator';

// Home

// Photo
import AddPhotoScreen from '../screens/tab2/container/AddPhotoScreen';
import EditPhotoScreen from '../screens/tab2/container/EditPhotoScreen';

// Info
import SettingScreen from '../screens/tab3/container/SettingScreen';
import Notice from '../screens/tab3/container/Notice';
import FrequecyQuestion from '../screens/tab3/container/FrequecyQuestion';
import ServiceTOS from '../screens/tab3/container/ServiceTOS';
import LocationTOS from '../screens/tab3/container/LocationTOS';
import PrivacyPolicy from '../screens/tab3/container/PrivacyPolicy';

const Stack = createNativeStackNavigator();

function RootScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigation}
        options={{headerShown: false}}
      />
      {/*--------------------- Home ---------------------*/}

      {/*--------------------- Photo ---------------------*/}
      <Stack.Screen
        name="AddPhotoScreen"
        component={AddPhotoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPhotoScreen"
        component={EditPhotoScreen}
        options={{headerShown: false}}
      />

      {/*--------------------- MyPage ---------------------*/}
      <Stack.Screen
        name="설정"
        component={SettingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="공지사항"
        component={Notice}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="자주 묻는 질문"
        component={FrequecyQuestion}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="서비스 이용약관"
        component={ServiceTOS}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="위치정보 이용약관"
        component={LocationTOS}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="개인정보 처리방침"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootScreen;
