import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StarIcon } from './StarIcon';

export const ReviewStars = ({
  count,
  bgColor = "transparent",
  paddingLeft,
  offColor = "white",
}) => {
  return (
    <View
      style={[
        styles.reviewContainer,
        { backgroundColor: bgColor },
        paddingLeft ? { paddingLeft } : {},
      ]}
    >
      {Array.from({ length: 5 }).map((_, idx) => (
        <StarIcon key={idx} color={idx < count ? "#374957" : offColor} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: '#d9d9d9',
    paddingVertical: 5,
    paddingHorizontal: 16, // replaces --content-padding
    borderRadius: 8, // replaces --radius-md
    flexDirection: 'row',
  },
});
