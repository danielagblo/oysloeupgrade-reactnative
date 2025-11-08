import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, router, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Network from 'expo-network';
import React from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SlidingPanelProvider from '@/components/SlidingPanelProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  React.useEffect(() => {
    let isMounted = true;
    const subscribe = setInterval(async () => {
      try {
        const state = await Network.getNetworkStateAsync();
        const isOffline = !state.isConnected || !state.isInternetReachable;
        const onNoInternet = pathname?.includes('/(tabs)/no-internet');
        if (isOffline && !onNoInternet) {
          router.push('/(tabs)/no-internet');
        } else if (!isOffline && onNoInternet) {
          router.back();
        }
      } catch (e) {

      }
    }, 2000);
    return () => {
      isMounted = false;
      clearInterval(subscribe);
    };
  }, [pathname]);

  return (
    _jsx(GestureHandlerRootView, { style: { flex: 1 }, children:
      _jsxs(ThemeProvider, { value: colorScheme === 'dark' ? DarkTheme : DefaultTheme, children: [
        _jsx(SlidingPanelProvider, { children:
          _jsxs(Stack, { children: [
          _jsx(Stack.Screen, { name: "index", options: { headerShown: false } }),
          _jsx(Stack.Screen, { name: "onboarding", options: { headerShown: false } }),
          _jsx(Stack.Screen, { name: "login", options: { headerShown: false } }),
          _jsx(Stack.Screen, { name: "signup", options: { headerShown: false } }),
          _jsx(Stack.Screen, { name: "reset-password", options: { headerShown: false } }),
          _jsx(Stack.Screen, { name: "ad-details", options: { headerShown: false } }),
          _jsx(Stack.Screen, { name: "setup", options: { headerShown: false } }),
          _jsx(Stack.Screen, { name: "setup-payment", options: { headerShown: false } }),
          _jsx(Stack.Screen, { name: "edit-profile", options: { headerShown: false } }),
          _jsx(Stack.Screen, { name: "account", options: { headerShown: false } }),
          _jsx(Stack.Screen, { name: "post-ad-form", options: { headerShown: false } }),
          _jsx(Stack.Screen, { name: "(tabs)", options: { headerShown: false } }),
          _jsx(Stack.Screen, { name: "modal", options: { presentation: 'modal', title: 'Modal' } })] }) }),
        _jsx(StatusBar, { style: "auto" })] }
      ) }
    ));

}