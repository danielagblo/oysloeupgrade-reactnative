import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const vw = (percent: number) => (width * percent) / 100;
const vh = (percent: number) => (height * percent) / 100;

export default function MakeReviewScreen() {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const commentInputRef = useRef<TextInput>(null);

  const ratingLabels = ['', 'Poor', 'Average', 'Good', 'Very Good', 'Excellent'];

  const handleSendReview = () => {
    if (comment.trim() && selectedRating > 0) {
      setShowSuccessModal(true);
    }
  };

  const renderStar = (index: number) => {
    const isFilled = index < selectedRating;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => setSelectedRating(index + 1)}
        style={styles.starButton}
      >
        <Image
          source={require('@/oysloe-assets/Ad details screen/star.png')}
          style={[styles.starIcon, !isFilled && styles.starIconEmpty]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backText}>←</Text>
              <Text style={styles.backLabel}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Review</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.mainTitle}>Make a review</Text>

            {/* Star Rating */}
            <View style={styles.starsContainer}>
              {[0, 1, 2, 3, 4].map((index) => renderStar(index))}
            </View>

            {/* Rating Label */}
            <Text style={styles.ratingLabel}>
              {selectedRating > 0 ? ratingLabels[selectedRating] : ''}
            </Text>

            {/* Verification Notice */}
            <View style={styles.verificationNotice}>
              <Image
                source={require('@/oysloe-assets/Ad details screen/Shield2.png')}
                style={styles.shieldIcon}
              />
              <Text style={styles.verificationText}>Reviews are verified before seen public</Text>
            </View>

            {/* Comment Input */}
            <TextInput
              ref={commentInputRef}
              style={styles.commentInput}
              placeholder="Comment"
              placeholderTextColor="#9CA3AF"
              value={comment}
              onChangeText={setComment}
              multiline
              textAlignVertical="top"
              onFocus={() => {
                setTimeout(() => {
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 100);
              }}
            />

            {/* Send Review Button */}
            <TouchableOpacity style={styles.sendButton} onPress={handleSendReview}>
              <Text style={styles.sendButtonText}>Send review</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContent}>
            <Image
              source={require('@/oysloe-assets/Ads/success.png')}
              style={styles.successIcon}
            />
            <Text style={styles.submittedText}>Submitted</Text>
            
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity 
                style={styles.reviewsButton}
                onPress={() => {
                  setShowSuccessModal(false);
                  router.back();
                }}
              >
                <Text style={styles.reviewsButtonText}>Reviews</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => {
                  setShowSuccessModal(false);
                  setSelectedRating(0);
                  setComment('');
                }}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: vh(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(4),
    paddingVertical: vh(2),
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: vw(6),
    color: '#374957',
    marginRight: vw(1),
  },
  backLabel: {
    fontSize: vw(4),
    color: '#374957',
    fontWeight: '400',
  },
  headerTitle: {
    fontSize: vw(4.5),
    color: '#9CA3AF',
    fontWeight: '500',
    marginLeft: vw(20),
  },
  content: {
    flex: 1,
    paddingHorizontal: vw(6),
    paddingTop: vh(5),
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: vw(6),
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: vh(4),
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: vh(2),
  },
  starButton: {
    padding: vw(2),
  },
  starIcon: {
    width: vw(10),
    height: vw(10),
  },
  starIconEmpty: {
    opacity: 0.3,
  },
  ratingLabel: {
    fontSize: vw(4),
    color: '#9CA3AF',
    fontWeight: '400',
    marginBottom: vh(6),
    minHeight: vh(3),
  },
  verificationNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(4),
  },
  shieldIcon: {
    width: vw(5),
    height: vw(5),
    marginRight: vw(2),
  },
  verificationText: {
    fontSize: vw(3.5),
    color: '#9CA3AF',
    fontWeight: '400',
  },
  commentInput: {
    width: '100%',
    height: vh(20),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: vw(4),
    paddingVertical: vh(2),
    fontSize: vw(4),
    color: '#374957',
    marginBottom: vh(4),
  },
  sendButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: vh(2),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sendButtonText: {
    fontSize: vw(4.5),
    color: '#374957',
    fontWeight: '600',
  },
  
  // Success Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: vw(8),
    alignItems: 'center',
    width: vw(80),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  successIcon: {
    width: vw(20),
    height: vw(20),
    marginBottom: vh(2),
  },
  submittedText: {
    fontSize: vw(5.5),
    fontWeight: '600',
    color: '#374957',
    marginBottom: vh(3),
  },
  modalButtonsRow: {
    flexDirection: 'row',
    gap: vw(3),
  },
  reviewsButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: vh(1.5),
    borderRadius: 12,
    alignItems: 'center',
  },
  reviewsButtonText: {
    fontSize: vw(4),
    color: '#374957',
    fontWeight: '500',
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: vh(1.5),
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: vw(4),
    color: '#374957',
    fontWeight: '500',
  },
});
