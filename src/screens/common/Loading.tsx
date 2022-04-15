// React & Package
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';

export interface FullScreenLoadingDataType {
  size?: any;
  color?: string;
}

export interface FullScreenLoadingProps extends FullScreenLoadingDataType {
  isVisible?: boolean;
}

interface CircleIndicatorProps {
  cx?: number;
  cy?: number;
  r?: number;
  fill?: string;
  delay?: number;
}

export const CircleIndicator: React.FC<CircleIndicatorProps> = ({
  cx = 50,
  cy = 50,
  r = 2,
  fill = '#ffdd00',
  delay = 0,
}) => {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const circleSize = useSharedValue(r);
  useEffect(() => {
    const animationStart = () => {
      circleSize.value = withDelay(
        delay,
        withRepeat(withTiming(r * 2, {duration: 500}), -1, true),
      );
    };
    animationStart();
  }, [circleSize]);

  const circleProps = useAnimatedProps(() => {
    return {
      cx: cx,
      cy: cy,
      r: circleSize.value,
    };
  });
  return <AnimatedCircle animatedProps={circleProps} fill={fill} />;
};

export const FullScreenLoading: React.FC<FullScreenLoadingProps> = ({
  size = 2,
  color = '#ffdd00',
  isVisible = true,
}) => {
  const Indicator = () => {
    return (
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <CircleIndicator cx={35} r={size} fill="#e0917b" delay={0} />
        <CircleIndicator cx={45} r={size} fill="#d4e07b" delay={100} />
        <CircleIndicator cx={55} r={size} fill="#7bc0e0" delay={200} />
        <CircleIndicator cx={65} r={size} fill="#bb7be0" delay={300} />
      </Svg>
    );
  };

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}></View>
      <View
        style={{
          flex: 1,
          margin: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Indicator />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  modalContainer: {
    marginHorizontal: 16,
  },
});
