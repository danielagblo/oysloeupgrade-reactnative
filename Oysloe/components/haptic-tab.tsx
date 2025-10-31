
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';import { jsx as _jsx } from "react/jsx-runtime";

export function HapticTab(props: any) {
  return (
    _jsx(PlatformPressable, { ...
      props,
      onPressIn: (ev: any) => {
        if (process.env.EXPO_OS === 'ios') {

          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      } }
    ));

}