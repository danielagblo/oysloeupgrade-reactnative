import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StarIcon } from './StarIcon';import { jsx as _jsx } from "react/jsx-runtime";

export const ReviewStars = ({
  count,
  bgColor = "transparent",
  paddingLeft,
  offColor = "white"
}: { count: number; bgColor?: string; paddingLeft?: number; offColor?: string }) => {
  return (
    _jsx(View, {
      style: [
      styles.reviewContainer,
      { backgroundColor: bgColor },
      paddingLeft ? { paddingLeft } : {}], children:


      Array.from({ length: 5 }).map((_, idx) =>
      _jsx(StarIcon, { color: idx < count ? "#374957" : offColor }, idx)
      ) }
    ));

};

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: '#d9d9d9',
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row'
  }
});