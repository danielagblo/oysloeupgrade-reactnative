import { View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';import { jsx as _jsx } from "react/jsx-runtime";






export function ThemedView({ style, lightColor, darkColor, ...otherProps }: any) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return _jsx(View, { style: [{ backgroundColor }, style], ...otherProps });
}