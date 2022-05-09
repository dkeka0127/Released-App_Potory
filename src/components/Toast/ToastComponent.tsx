import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import {ifIphoneX} from 'react-native-iphone-x-helper';

const ToastComponent = forwardRef((props, ref) => {
  const [message, setMessage] = useState('');
  const toastOpacity = useSharedValue(0);
  const [isShowed, setShowed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: toastOpacity.value,
    };
  }, []);

  useImperativeHandle(ref, () => ({
    show: show,
  }));

  const turnOnIsShow = useCallback(() => {
    setShowed(false);
  }, []);

  const show = msg => {
    cancelAnimation(toastOpacity);
    setShowed(true);
    setMessage(msg);

    toastOpacity.value = withSequence(
      withTiming(1, {duration: 300}),
      withTiming(1, {duration: 1200}),
      withTiming(0, {duration: 300}, isSuccess => {
        if (isSuccess) {
          runOnJS(turnOnIsShow)();
        }
      }),
    );
  };

  useEffect(() => {
    if (props.message) {
      show(props.message);
    }
  }, []);

  if (!isShowed) return null;

  return (
    <View style={[styles.defaultStyle]} pointerEvents="box-none">
      <Animated.View
        style={[styles.rootContainer, animatedStyle]}
        pointerEvents="none">
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  defaultStyle: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  rootContainer: {
    width: '100%',
    opacity: 0.8,
    backgroundColor: '#333333',
    paddingVertical: 22,
    paddingBottom: ifIphoneX(40, 19),
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    letterSpacing: -0.32,
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default ToastComponent;
