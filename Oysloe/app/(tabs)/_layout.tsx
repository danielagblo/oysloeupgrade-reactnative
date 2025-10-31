import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'expo-image';

import { HapticTab } from '@/components/haptic-tab';


import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    _jsxs(Tabs, {
      screenOptions: {
        tabBarActiveTintColor: '#333',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0'
        },
        headerShown: false,
        tabBarButton: HapticTab,
        cardOverlayEnabled: false
      }, children: [
      _jsx(Tabs.Screen, {
        name: "index",
        options: {
          title: 'Home',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) =>
          _jsx(Image, {
            source: require('@/oysloe-assets/bottom menu/home.png'),
            style: { width: 24, height: 24, tintColor: focused ? color : '#666' } }
          )

        } }
      ),
      _jsx(Tabs.Screen, {
        name: "explore",
        options: {
          title: 'Alerts',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) =>
          _jsx(Image, {
            source: require('@/oysloe-assets/bottom menu/alert.png'),
            style: { width: 24, height: 24, tintColor: focused ? color : '#666' } }
          )

        } }
      ),
      _jsx(Tabs.Screen, {
        name: "post-ad",
        options: {
          title: 'Post Ad',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) =>
          _jsx(Image, {
            source: require('@/oysloe-assets/bottom menu/Post.png'),
            style: { width: 24, height: 24, tintColor: focused ? color : '#666' } }
          )

        } }
      ),
      _jsx(Tabs.Screen, {
        name: "chat",
        options: {
          title: 'Inbox',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) =>
          _jsx(Image, {
            source: require('@/oysloe-assets/bottom menu/inbox.png'),
            style: { width: 24, height: 24, tintColor: focused ? color : '#666' } }
          )

        } }
      ),
      _jsx(Tabs.Screen, {
        name: "profile",
        options: {
          title: 'Profile',
          presentation: 'modal',
          animationEnabled: false,
          detachPreviousScreen: false,
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) =>
          _jsx(Image, {
            source: require('@/oysloe-assets/bottom menu/profile.png'),
            style: { width: 24, height: 24, tintColor: focused ? color : '#666' } }
          )

        } }
      ),
      _jsx(Tabs.Screen, {
        name: "favorites",
        options: {

          href: null
        } }
      ),
      _jsx(Tabs.Screen, {
        name: "ads",
        options: {

          href: null,
          headerShown: false
        } }
      ),
      _jsx(Tabs.Screen, {
        name: "subscription",
        options: {
          href: null,
          headerShown: false
        } }
      ),
      _jsx(Tabs.Screen, {
        name: "refer-earn",
        options: {
          href: null,
          headerShown: false
        } }
      ),
      _jsx(Tabs.Screen, {
        name: "feedback",
        options: {
          href: null,
          headerShown: false
        } }
      ),
      _jsx(Tabs.Screen, {
        name: "privacy-policy",
        options: {
          href: null,
          headerShown: false
        } }
      ),
      _jsx(Tabs.Screen, {
        name: "terms-and-conditions",
        options: {
          href: null,
          headerShown: false
        } }
      ),
      _jsx(Tabs.Screen, {
        name: "no-internet",
        options: {
          href: null,
          headerShown: false
        } }
      )] }
    ));

}