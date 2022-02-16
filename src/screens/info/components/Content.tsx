import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function Content() {
  return (
    <View
      style={{
        width: '100%',
        height: '50%',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      }}>
      <View
        style={{
          width: '100%',
          height: '70%',
          // backgroundColor: '#eee',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{width: '60%', height: '70%', backgroundColor: 'pink'}}></View>
      </View>

      <View
        style={{
          width: '100%',
          height: '30%',
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 50,
          paddingRight: 50,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 15,
            backgroundColor: '#fa8',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18}}>👑 Gold 곤듀님</Text>
        </View>
      </View>
    </View>
  );
}

export default Content;
