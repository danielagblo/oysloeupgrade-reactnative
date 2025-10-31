
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset } from
'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const HEADER_HEIGHT = 250;






export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor
}: {
  children: React.ReactNode;
  headerImage?: React.ReactNode;
  headerBackgroundColor?: { [key: string]: string } | any;
}) {
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollOffset(scrollRef);
  const headerAnimatedStyle = useAnimatedStyle(() => {
    // cast to any to satisfy TS types for Animated styles
    return ({
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          )
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1])
        }
      ]
    } as unknown) as any;
  });

  return (
    _jsxs(Animated.ScrollView, {
      ref: scrollRef,
      style: { backgroundColor, flex: 1 },
      scrollEventThrottle: 16, children: [
      _jsx(Animated.View, {
        style: [
        styles.header,
        { backgroundColor: headerBackgroundColor[colorScheme] },
        headerAnimatedStyle], children:

        headerImage }
      ),
      _jsx(ThemedView, { style: styles.content, children: children })] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden'
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden'
  }
});