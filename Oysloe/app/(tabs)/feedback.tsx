import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable } from
'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StarIcon } from '@/app/components/StarIcon';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function FeedbackScreen() {
  const [selectedStars, setSelectedStars] = React.useState<number>(2);
  const [comment, setComment] = React.useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = React.useState<boolean>(false);
  const scrollViewRef = React.useRef<any>(null);
  const commentInputRef = React.useRef<any>(null);

  const handleStarPress = (starIndex: number) => {
    setSelectedStars(starIndex + 1);
  };

  const handleCommentFocus = () => {

    setTimeout(() => {
      if (commentInputRef.current && scrollViewRef.current) {
        (commentInputRef.current as any).measureLayout(
          scrollViewRef.current as any,
          (x: number, y: number) => {
            (scrollViewRef.current as any).scrollTo({ y: Math.max(y - 100, 0), animated: true });
          },
          () => {}
        );
      }
    }, 100);
  };

  const getRatingText = () => {
    if (selectedStars === 1) return 'Bad';
    if (selectedStars >= 2 && selectedStars <= 3) return 'Average';
    if (selectedStars >= 4 && selectedStars <= 5) return 'Good';
    return 'Average';
  };

  const handleSendFeedback = () => {

    console.log('Feedback submitted:', { rating: selectedStars, comment });

    setShowSuccessModal(true);

  };

  const handleHome = () => {
    setShowSuccessModal(false);
    router.replace('/(tabs)');
  };

  const handleClose = () => {
    setShowSuccessModal(false);
  };

  return (
    _jsxs(SafeAreaView, { style: styles.container, children: [

      _jsxs(View, { style: styles.header, children: [
        _jsxs(TouchableOpacity, { style: styles.backButton, onPress: () => router.back(), children: [
          _jsx(Text, { style: styles.backIcon, children: "\u2190" }),
          _jsx(Text, { style: styles.backText, children: "Back" })] }
        ),
        _jsx(Text, { style: styles.headerTitle, children: "Feedback" }),
        _jsx(View, { style: { width: 60 } })] }
      ),

      _jsx(KeyboardAvoidingView, {
        style: styles.keyboardAvoidingView,
        behavior: Platform.OS === 'ios' ? 'padding' : 'height',
        keyboardVerticalOffset: Platform.OS === 'ios' ? 0 : 20, children:

        _jsx(ScrollView, {
          ref: scrollViewRef,
          style: styles.scrollView,
          contentContainerStyle: styles.content,
          showsVerticalScrollIndicator: false,
          keyboardShouldPersistTaps: "handled", children:


          _jsxs(View, { style: styles.feedbackSection, children: [
            _jsx(Text, { style: styles.feedbackTitle, children: "Feedback" }),
            _jsx(Text, { style: styles.feedbackSubtitle, children: "Help us improve on our app" }),


            _jsxs(View, { style: styles.starContainer, children: [
              _jsx(View, { style: styles.starRow, children:
                Array.from({ length: 5 }).map((_, index) =>
                _jsx(TouchableOpacity, {

                  style: styles.starButton,
                  onPress: () => handleStarPress(index),
                  activeOpacity: 0.7, children:

                  _jsx(StarIcon, {
                    color: index < selectedStars ? '#374957' : '#d0d0d0',
                    size: 32 }
                  ) }, index
                )
                ) }
              ),
              _jsx(Text, { style: styles.ratingText, children: getRatingText() })] }
            ),


            _jsx(TextInput, {
              ref: commentInputRef,
              style: styles.commentInput,
              placeholder: "Comment",
              placeholderTextColor: "#999",
              value: comment,
              onChangeText: setComment,
              onFocus: handleCommentFocus,
              multiline: true,
              textAlignVertical: "top",
              underlineColorAndroid: "transparent" }
            ),


            _jsx(TouchableOpacity, {
              style: styles.sendButton,
              onPress: handleSendFeedback,
              activeOpacity: 0.6, children:

              _jsx(Text, { style: styles.sendButtonText, children: "Send Feedback" }) }
            )] }
          ) }
        ) }
      ),


      _jsx(Modal, {
        visible: showSuccessModal,
        transparent: true,
        animationType: "fade",
        onRequestClose: handleClose, children:

        _jsx(Pressable, { style: styles.modalOverlay, onPress: handleClose, children:
          _jsxs(Pressable, { style: styles.modalContent, onPress: (e: any) => e.stopPropagation(), children: [

            _jsx(View, { style: styles.successIconContainer, children:
              _jsx(Image, {
                source: require('@/oysloe-assets/Ads/success.png'),
                style: styles.successIcon,
                contentFit: "contain" }
              ) }
            ),


            _jsx(Text, { style: styles.modalTitle, children: "Thank You!" }),


            _jsx(Text, { style: styles.modalSubtitle, children: "Your feedback has been submitted successfully." }

            ),


            _jsxs(View, { style: styles.modalButtons, children: [
              _jsx(TouchableOpacity, {
                style: styles.homeButton,
                onPress: handleHome,
                activeOpacity: 0.8, children:

                _jsx(Text, { style: styles.homeButtonText, children: "Home" }) }
              ),
              _jsx(TouchableOpacity, {
                style: styles.closeButton,
                onPress: handleClose,
                activeOpacity: 0.8, children:

                _jsx(Text, { style: styles.closeButtonText, children: "Close" }) }
              )] }
            )] }
          ) }
        ) }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backIcon: {
    fontSize: 18,
    color: '#666',
    marginRight: 4
  },
  backText: {
    fontSize: 14,
    color: '#666'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  keyboardAvoidingView: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 200,
    paddingBottom: 300,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  feedbackSection: {
    width: '100%',
    alignItems: 'center'
  },
  feedbackTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  feedbackSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 32
  },
  starContainer: {
    alignItems: 'center',
    marginBottom: 32
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  starButton: {
    padding: 4,
    marginHorizontal: 4
  },
  ratingText: {
    fontSize: 14,
    color: '#999'
  },
  commentInput: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    marginTop: 120
  },
  sendButton: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '85%',
    maxWidth: 400
  },
  successIconContainer: {
    marginBottom: 20
  },
  successIcon: {
    width: 80,
    height: 80
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center'
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  homeButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  }
});