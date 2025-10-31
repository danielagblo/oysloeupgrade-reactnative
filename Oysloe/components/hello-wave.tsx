import Animated from 'react-native-reanimated';import { jsx as _jsx } from "react/jsx-runtime";

export function HelloWave() {
  return (
    _jsx(Animated.Text, {
      style: {
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] }
        },
        animationIterationCount: 4,
        animationDuration: '300ms'
      }, children: "\uD83D\uDC4B" }

    ));

}