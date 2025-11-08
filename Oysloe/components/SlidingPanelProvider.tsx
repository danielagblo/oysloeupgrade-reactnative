import React, { createContext, useContext, useMemo, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, interpolate } from 'react-native-reanimated';
const _reanimatedModule: any = Animated as any;
const useAnimatedGestureHandler: any = _reanimatedModule.useAnimatedGestureHandler ?? _reanimatedModule.useAnimatedGestureHandler;
import ProfilePanelContent from '@/app/(tabs)/profile';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PANEL_WIDTH = Math.round(SCREEN_WIDTH * 0.6);

type SlidingPanelContextType = {
  openProfile: () => void;
  closeProfile: () => void;
  toggleProfile: () => void;
};

const SlidingPanelContext = createContext<SlidingPanelContextType | null>(null);

export const useSlidingPanel = () => {
  const ctx = useContext(SlidingPanelContext);
  if (!ctx) throw new Error('useSlidingPanel must be used within SlidingPanelProvider');
  return ctx;
};

export const SlidingPanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const translateX = useSharedValue(PANEL_WIDTH);
  const overlay = useSharedValue(0);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
    overlay.value = withTiming(0.5, { duration: 300 });
    translateX.value = withTiming(0, { duration: 300 });
  };

  const close = () => {
    overlay.value = withTiming(0, { duration: 250 });
    translateX.value = withTiming(PANEL_WIDTH, { duration: 250 }, () => {
      runOnJS(setIsOpen)(false);
    });
  };

  let gestureHandler: any = null;
  try {
    if (typeof useAnimatedGestureHandler === 'function') {
      gestureHandler = useAnimatedGestureHandler({
        onStart: (_event: any, ctx: any) => {
          ctx.startX = translateX.value;
        },
        onActive: (event: any, ctx: any) => {
          const next = Math.min(Math.max(ctx.startX + event.translationX, 0), PANEL_WIDTH);
          translateX.value = next;
          overlay.value = interpolate(next, [0, PANEL_WIDTH], [0.5, 0]);
        },
        onEnd: (event: any) => {
          if (event.translationX > PANEL_WIDTH * 0.3 || event.velocityX > 800) {
            overlay.value = withTiming(0, { duration: 200 });
            translateX.value = withTiming(PANEL_WIDTH, { duration: 200 }, () => {
              runOnJS(setIsOpen)(false);
            });
          } else {
            overlay.value = withTiming(0.5, { duration: 200 });
            translateX.value = withTiming(0, { duration: 200 });
          }
        }
      });
    }
  }
  catch (e) {
    gestureHandler = null;
  }

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }), []);

  const overlayStyle = useAnimatedStyle(() => ({
    backgroundColor: 'rgba(0,0,0,' + overlay.value + ')'
  }), []);

  const value = useMemo(() => ({ openProfile: open, closeProfile: close }), []);
  const toggle = () => {
    if (isOpen) close();
    else open();
  };
  const fullValue = useMemo(() => ({ openProfile: open, closeProfile: close, toggleProfile: toggle }), [isOpen]);

  return (
  <SlidingPanelContext.Provider value={fullValue}>
      {children}

      {isOpen && (
        <GestureHandlerRootView style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <Animated.View style={[styles.overlay, overlayStyle]} pointerEvents={isOpen ? 'auto' : 'none'}>
            <Pressable style={StyleSheet.absoluteFill} onPress={close} />
          </Animated.View>

          {gestureHandler ? (
            <PanGestureHandler onGestureEvent={gestureHandler} activeOffsetX={[-5, 5]}>
              <Animated.View style={[styles.panel, { width: PANEL_WIDTH }, panelStyle]}>
                <View style={{ flex: 1 }}>
                  <ProfilePanelContent onClose={close} />
                </View>
              </Animated.View>
            </PanGestureHandler>
          ) : (
            <Animated.View style={[styles.panel, { width: PANEL_WIDTH }, panelStyle]}>
              <View style={{ flex: 1 }}>
                <ProfilePanelContent onClose={close} />
              </View>
            </Animated.View>
          )}
        </GestureHandlerRootView>
      )}
    </SlidingPanelContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 998,
  },
  panel: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 999,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    overflow: 'hidden'
  }
});

export default SlidingPanelProvider;
