import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Modal } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetPopup, setShowResetPopup] = useState(false);

  const handleLogin = () => {

    console.log('Login with:', { email, password });
    router.replace('/(tabs)');
  };

  const handleGoogleLogin = () => {

    console.log('Google login');
    router.replace('/(tabs)');
  };

  const handlePasswordReset = () => {
    setShowResetPopup(true);
  };

  const closeResetPopup = () => {
    setShowResetPopup(false);
    router.push('/reset-password');
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

        _jsx(Text, { style: styles.title, children: "Welcome!" }),


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


        _jsxs(View, { style: styles.inputContainer, children: [
          _jsx(Image, {
            source: require('@/oysloe-assets/Auth/passwordkey.png'),
            style: styles.inputIcon,
            contentFit: "contain" }
          ),
          _jsx(TextInput, {
            style: styles.input,
            placeholder: "Password",
            placeholderTextColor: "#999999",
            value: password,
            onChangeText: setPassword,
            secureTextEntry: true,
            autoCapitalize: "none",
            autoCorrect: false }
          )] }
        ),


        _jsx(TouchableOpacity, { style: styles.loginButton, onPress: handleLogin, children:
          _jsx(Text, { style: styles.loginButtonText, children: "Login" }) }
        ),


        _jsxs(TouchableOpacity, { style: styles.googleButton, onPress: handleGoogleLogin, children: [
          _jsx(Image, {
            source: require('@/oysloe-assets/login/google.png'),
            style: styles.googleIcon,
            contentFit: "contain" }
          ),
          _jsx(Text, { style: styles.googleButtonText, children: "login using google" })] }
        ),


        _jsx(Text, { style: styles.cantLoginText, children: "Cant Login?" }),

        _jsxs(View, { style: styles.helpButtonsContainer, children: [
          _jsx(TouchableOpacity, { style: styles.helpButton, onPress: handlePasswordReset, children:
            _jsx(Text, { style: styles.helpButtonText, children: "Password Reset" }) }
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

      _jsx(Modal, { transparent: true, visible: showResetPopup, animationType: "fade", onRequestClose: closeResetPopup, children:
        _jsx(View, { style: styles.modalOverlay, children:
          _jsxs(View, { style: styles.popupContainer, children: [
            _jsx(View, { style: styles.successIconContainer, children:
              _jsx(Image, { source: require('@/oysloe-assets/bottom menu/alert.png'), style: styles.promptIcon, contentFit: 'contain' })
            }),
            _jsx(Text, { style: styles.popupTitle, children: "Check your messages" }),
            _jsx(Text, { style: styles.popupMessage, children: "We\u2019ve sent a reset code via SMS. Open your Messages app to continue." }),
            _jsx(TouchableOpacity, { style: styles.closeButton, onPress: closeResetPopup, children:
              _jsx(Text, { style: styles.closeButtonText, children: "Close" })
            })] }
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
    fontSize: 40,
    fontWeight: 500,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 40
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 16,
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
    marginRight: 15,
    tintColor: '#999999'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333'
  },
  loginButton: {
    backgroundColor: '#66FF99',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  loginButtonText: {
    color: '#999999',
    fontSize: 18,
    fontWeight: '400'
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12
  },
  googleButtonText: {
    color: '#999999',
    fontSize: 16,
    fontWeight: '400'
  },
  cantLoginText: {
    fontSize: 16,
    color: '#999999',
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
    borderRadius: 25,
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
    color: '#999999',
    fontSize: 14,
    fontWeight: '400'
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpText: {
    fontSize: 16,
    color: '#999999'
  },
  signUpLink: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600'
  },
  // Modal styles (matching OTP modal aesthetics)
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  popupContainer: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 40, paddingHorizontal: 32, alignItems: 'center', minWidth: 320, maxWidth: 380, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 12 },
  successIconContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#66FF99', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  successIcon: { fontSize: 40, color: '#FFFFFF', fontWeight: 'bold' },
  popupTitle: { fontSize: 22, fontWeight: '700', color: '#333333', textAlign: 'center', marginBottom: 12 },
  popupMessage: { fontSize: 16, color: '#666666', textAlign: 'center', marginBottom: 24, lineHeight: 22, paddingHorizontal: 10 },
  closeButton: { backgroundColor: '#66FF99', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32, minWidth: 120, alignItems: 'center' },
  closeButtonText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  promptIcon: { width: 28, height: 28, tintColor: '#FFFFFF' }
});