import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ReviewStars } from './ReviewStars';
import { StarIcon } from './StarIcon';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const ReviewsBox = ({ aggregatedReviews }: any) => {
  const ratingBreakdown = (aggregatedReviews?.ratingBreakdown || {}) as Record<string, number>;
  const total = Object.values(ratingBreakdown).reduce((a, b) => a + (Number(b) || 0), 0);

  return (
    _jsxs(View, { style: styles.reviewsCard, children: [

      _jsx(Text, { style: styles.avgNumber, children: aggregatedReviews?.averageRating?.toFixed(1) || '0.0' }),
      _jsx(View, { style: { marginVertical: 6 }, children:
        _jsx(ReviewStars, {
          count: Math.round(aggregatedReviews?.averageRating || 0),
          bgColor: "transparent",
          offColor: "#d9d9d9" }
        ) }
      ),
      _jsxs(Text, { style: styles.revCount, children: [aggregatedReviews?.totalReviews || 0, " Reviews"] }),

      _jsx(View, { style: styles.breakdownCol, children:
          [5, 4, 3, 2, 1].map((star) => {
          const count = Number(ratingBreakdown[String(star)] || 0);
          const percent = total ? (count / total) * 100 : 0;
          return (
            _jsxs(View, { style: styles.barRow, children: [
              _jsx(StarIcon, { color: "#1a2235", size: 18 }),
              _jsx(Text, { style: styles.starLabel, children: star }),
              _jsx(View, { style: styles.barBg, children:
                _jsx(View, { style: [styles.barFill, { width: `${percent}%` }] }) }
              )] }, star


            ));

        }) }
      )] }
    ));

};

const styles = StyleSheet.create({
  reviewsCard: {
    backgroundColor: '#f8fafd',
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 18,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#001',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 1,
    width: '100%'
  },
  avgNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#222b37',
    textAlign: 'center',
    marginBottom: 1,
    letterSpacing: -0.5
  },
  revCount: {
    fontSize: 17,
    color: '#283444',
    marginTop: 7,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '500'
  },
  breakdownCol: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 2,
    gap: 8
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    minHeight: 23
  },
  starLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#222b37',
    width: 22,
    textAlign: 'left',
    marginLeft: 2,
    marginRight: 2
  },
  barBg: {
    flex: 1,
    height: 12,
    backgroundColor: '#e8ecf5',
    borderRadius: 30,
    marginHorizontal: 13,
    overflow: 'hidden',
    position: 'relative'
  },
  barFill: {
    backgroundColor: '#233E83',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 30,
    position: 'absolute'
  },
  percentText: {
    fontSize: 13,
    minWidth: 34,
    fontWeight: '700',
    color: '#234',
    marginLeft: 3,
    textAlign: 'right'
  }
});

export default ReviewsBox;