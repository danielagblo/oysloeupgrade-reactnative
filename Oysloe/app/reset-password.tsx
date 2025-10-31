import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Modal } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const { width } = Dimensions.get('window');

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = () => {

    console.log('Reset password for:', email);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleOTPLogin = () => {
    router.push('/otp-login');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    _jsxs(SafeAreaView, { style: styles.container, children: [
      _jsxs(View, { style: styles.content, children: [

        _jsx(Text, { style: styles.title, children: "Reset password" }),


        _jsxs(View, { style: styles.inputContainer, children: [
          _jsx(Image, {
            source: require('@/oysloe-assets/Auth/email.png'),
            style: styles.inputIcon,
            contentFit: "contain" }
          ),
          _jsx(TextInput, {
            style: styles.input,
            placeholder: "Email Address",
            placeholderTextColor: "#999999",
            value: email,
            onChangeText: setEmail,
            keyboardType: "email-address",
            autoCapitalize: "none",
            autoCorrect: false }
          )] }
        ),


        _jsx(Text, { style: styles.instructionText, children: "We'll send you a link to the email provided to reset your password." }

        ),


        _jsx(TouchableOpacity, { style: styles.submitButton, onPress: handleSubmit, children:
          _jsx(Text, { style: styles.submitButtonText, children: "Submit" }) }
        ),


        _jsx(Text, { style: styles.cantLoginText, children: "Cant Login?" }),

        _jsxs(View, { style: styles.helpButtonsContainer, children: [
          _jsx(TouchableOpacity, { style: styles.helpButton, onPress: handleLogin, children:
            _jsx(Text, { style: styles.helpButtonText, children: "Login" }) }
          ),

          _jsx(TouchableOpacity, { style: styles.helpButton, onPress: handleOTPLogin, children:
            _jsx(Text, { style: styles.helpButtonText, children: "OTP Login" }) }
          )] }
        ),


        _jsxs(View, { style: styles.signUpContainer, children: [
          _jsx(Text, { style: styles.signUpText, children: "Don't have an account ? " }),
          _jsx(TouchableOpacity, { onPress: handleSignUp, children:
            _jsx(Text, { style: styles.signUpLink, children: "Sign up" }) }
          )] }
        )] }
      ),


      _jsx(Modal, {
        visible: showPopup,
        transparent: true,
        animationType: "fade",
        onRequestClose: handleClosePopup, children:

        _jsx(View, { style: styles.modalOverlay, children:
          _jsxs(View, { style: styles.popupContainer, children: [

            _jsx(Image, {
              source: require('@/gifs/mail.gif'),
              style: styles.popupIcon,
              contentFit: "contain" }
            ),


            _jsx(Text, { style: styles.popupMessage, children: "Reset link sent to your email" }),


            _jsx(TouchableOpacity, { style: styles.closeButton, onPress: handleClosePopup, children:
              _jsx(Text, { style: styles.closeButtonText, children: "Close" }) }
            )] }
          ) }
        ) }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 40
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: '#999999'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333'
  },
  instructionText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 20
  },
  submitButton: {
    backgroundColor: '#66FF99',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  submitButtonText: {
    color: 'grey',
    fontSize: 18,
    fontWeight: '600'
  },
  cantLoginText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16
  },
  helpButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40
  },
  helpButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flex: 0.48,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  helpButtonText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '500'
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpText: {
    fontSize: 16,
    color: '#333333'
  },
  signUpLink: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600'
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  popupContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
    minWidth: 320,
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8
  },
  popupIcon: {
    width: 80,
    height: 80,
    marginBottom: 24
  },
  popupMessage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22
  },
  closeButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 80,
    alignItems: 'center'
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333'
  }
});