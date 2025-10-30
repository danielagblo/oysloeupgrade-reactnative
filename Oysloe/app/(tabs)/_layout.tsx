import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'expo-image';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#333',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        headerShown: false,
        tabBarButton: HapticTab,
        cardOverlayEnabled: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/oysloe-assets/bottom menu/home.png')}
              style={{ width: 24, height: 24, tintColor: focused ? color : '#666' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/oysloe-assets/bottom menu/alert.png')}
              style={{ width: 24, height: 24, tintColor: focused ? color : '#666' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="post-ad"
        options={{
          title: 'Post Ad',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/oysloe-assets/bottom menu/Post.png')}
              style={{ width: 24, height: 24, tintColor: focused ? color : '#666' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/oysloe-assets/bottom menu/inbox.png')}
              style={{ width: 24, height: 24, tintColor: focused ? color : '#666' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          presentation: 'modal',
          animationEnabled: false,
          detachPreviousScreen: false,
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/oysloe-assets/bottom menu/profile.png')}
              style={{ width: 24, height: 24, tintColor: focused ? color : '#666' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          // Hide from the tab bar but keep bottom tabs visible when pushed
          href: null,
        }}
      />
      <Tabs.Screen
        name="ads"
        options={{
          // Hidden route that still displays the shared bottom tabs
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
