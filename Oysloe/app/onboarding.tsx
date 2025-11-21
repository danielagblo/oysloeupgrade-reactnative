import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    animation: require('@/oysloe-assets/Boarding/User safety guarantee.json'),
    title: 'User Safety\nGuarantee',
    description: 'Buyers and sellers undergo strict checks and verification to ensure authenticity and reliability',
    colors: ['#60F7A3', '#FF6D6D'],
  },
  {
    animation: require('@/oysloe-assets/Boarding/scale to success.json'),
    title: 'Scale you\nto Success',
    description: 'Watch your business grow with our designed marketing tools, and automated processes.',
    colors: ['#FFE08C', '#FF8C8C'],
  },
  {
    animation: require('@/oysloe-assets/Boarding/journeybeginsnow.json'),
    title: 'Your journey\nbegins now',
    description: 'Optimized for all business owners with seamless experience for everyone',
    colors: ['#9AD8FF', '#846BFF'],
  },
];


export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const opacity = useSharedValue(1);

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      opacity.value = withTiming(0, { duration: 150 }, () => {
        runOnJS(setCurrentStep)(currentStep + 1);
        opacity.value = withTiming(1, { duration: 150 });
      });
    } else {
      router.replace('/login');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      opacity.value = withTiming(0, { duration: 150 }, () => {
        runOnJS(setCurrentStep)(currentStep - 1);
        opacity.value = withTiming(1, { duration: 150 });
      });
    }
  };

  const panGesture = Gesture.Pan().onEnd((event) => {
    const { translationX, velocityX } = event;
    if (translationX > 50 || velocityX > 500) {
      runOnJS(handlePrevious)();
    } else if (translationX < -50 || velocityX < -500) {
      runOnJS(handleNext)();
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    };
  });

  const currentData = onboardingData[currentStep];

  return (
    _jsx(SafeAreaView, { style: styles.container, children:
      _jsx(GestureDetector, { gesture: panGesture, children:
        _jsx(View, { style: styles.content, children:
          _jsxs(Animated.View, { style: [styles.screenContainer, animatedStyle], children: [
            _jsx(View, { style: styles.animationContainer, children:
              _jsx(LottieView, {
                source: currentData.animation,
                autoPlay: true,
                loop: true,
                style: styles.animation,
              }) }
            ),

            _jsxs(View, { style: styles.textContainer, children: [
              _jsx(Text, { style: styles.title, children: currentData.title }),
              _jsx(Text, { style: styles.description, children: currentData.description }),

              _jsx(View, { style: styles.paginationContainer, children:
                onboardingData.map((_, dotIndex) =>
                _jsx(View, { style: [styles.dot, dotIndex === currentStep && styles.activeDot] }, dotIndex)
                ) }
              ),

              _jsx(TouchableOpacity, { style: styles.button, onPress: handleNext, children:
                _jsx(Text, { style: styles.buttonText, children: currentStep === onboardingData.length - 1 ? 'Get started' : 'Next' }) }
              )] }
            )] }
          ) }
        ) }
      ) }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  animationContainer: {
    flex: 0.6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  animation: {
    width: width * 0.9,
    height: height * 0.5
  },
  textContainer: {
    flex: 0.5,
    width: '100%',
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 20
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 20
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4
  },
  activeDot: {
    backgroundColor: '#333333'
  },
  button: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333'
  }
});