import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ReviewStars } from './ReviewStars';
import { StarIcon } from './StarIcon';

const ReviewsBox = ({ aggregatedReviews }) => {
  const ratingBreakdown = aggregatedReviews?.ratingBreakdown || {};
  const total = Object.values(ratingBreakdown).reduce((a, b) => a + b, 0);

  return (
    <View style={styles.reviewsCard}>
      {/* Average rating, stars, and review count centered */}
      <Text style={styles.avgNumber}>{aggregatedReviews?.averageRating?.toFixed(1) || '0.0'}</Text>
      <View style={{ marginVertical: 6 }}>
        <ReviewStars
          count={Math.round(aggregatedReviews?.averageRating || 0)}
          bgColor="transparent"
          offColor="#d9d9d9"
        />
      </View>
      <Text style={styles.revCount}>{aggregatedReviews?.totalReviews || 0} Reviews</Text>
      {/* Ratings breakdown bars */}
      <View style={styles.breakdownCol}>
        {[5, 4, 3, 2, 1].map((star) => {
          const count = ratingBreakdown[star] || 0;
          const percent = total ? (count / total) * 100 : 0;
          return (
            <View key={star} style={styles.barRow}>
              <StarIcon color="#1a2235" size={18} />
              <Text style={styles.starLabel}>{star}</Text>
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: `${percent}%` }]} />
              </View>
              {/* Omit percent text for extra clean look, or uncomment to show percentage */}
              {/* <Text style={styles.percentText}>{percent.toFixed(0)}%</Text> */}
            </View>
          );
        })}
      </View>
    </View>
  );
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
    width: '100%',
  },
  avgNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#222b37',
    textAlign: 'center',
    marginBottom: 1,
    letterSpacing: -0.5,
  },
  revCount: {
    fontSize: 17,
    color: '#283444',
    marginTop: 7,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  breakdownCol: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 2,
    gap: 8,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    minHeight: 23,
  },
  starLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#222b37',
    width: 22,
    textAlign: 'left',
    marginLeft: 2,
    marginRight: 2,
  },
  barBg: {
    flex: 1,
    height: 12,
    backgroundColor: '#e8ecf5',
    borderRadius: 30,
    marginHorizontal: 13,
    overflow: 'hidden',
    position: 'relative',
  },
  barFill: {
    backgroundColor: '#233E83',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 30,
    position: 'absolute',
  },
  percentText: {
    fontSize: 13,
    minWidth: 34,
    fontWeight: '700',
    color: '#234',
    marginLeft: 3,
    textAlign: 'right',
  },
});

export default ReviewsBox;
