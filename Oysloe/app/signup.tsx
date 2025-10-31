import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const { width } = Dimensions.get('window');

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = () => {

    console.log('Sign up with:', { name, email, phone, password, retypePassword, agreedToTerms });
    router.replace('/(tabs)');
  };

  const handleGoogleSignUp = () => {

    console.log('Google sign up');
    router.replace('/(tabs)');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handlePrivacyPolicy = () => {

    console.log('Privacy policy');
  };

  const handleTermsConditions = () => {

    console.log('Terms & conditions');
  };

  return (
    _jsx(SafeAreaView, { style: styles.container, children:
      _jsxs(View, { style: styles.content, children: [

        _jsx(Text, { style: styles.title, children: "Get Started" }),


        _jsxs(View, { style: styles.inputContainer, children: [
          _jsx(Image, {
            source: require('@/oysloe-assets/Auth/name.png'),
            style: styles.inputIcon,
            contentFit: "contain" }
          ),
          _jsx(TextInput, {
            style: styles.input,
            placeholder: "Name",
            placeholderTextColor: "#666666",
            value: name,
            onChangeText: setName,
            autoCapitalize: "words",
            autoCorrect: false }
          )] }
        ),


        _jsxs(View, { style: styles.inputContainer, children: [
          _jsx(Image, {
            source: require('@/oysloe-assets/Auth/email.png'),
            style: styles.inputIcon,
            contentFit: "contain" }
          ),
          _jsx(TextInput, {
            style: styles.input,
            placeholder: "Email Address",
            placeholderTextColor: "#666666",
            value: email,
            onChangeText: setEmail,
            keyboardType: "email-address",
            autoCapitalize: "none",
            autoCorrect: false }
          )] }
        ),


        _jsxs(View, { style: styles.inputContainer, children: [
          _jsx(Image, {
            source: require('@/oysloe-assets/Auth/phone.png'),
            style: styles.inputIcon,
            contentFit: "contain" }
          ),
          _jsx(TextInput, {
            style: styles.input,
            placeholder: "+233",
            placeholderTextColor: "#666666",
            value: phone,
            onChangeText: setPhone,
            keyboardType: "phone-pad",
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
            placeholderTextColor: "#666666",
            value: password,
            onChangeText: setPassword,
            secureTextEntry: true,
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
            placeholder: "Retype Password",
            placeholderTextColor: "#666666",
            value: retypePassword,
            onChangeText: setRetypePassword,
            secureTextEntry: true,
            autoCapitalize: "none",
            autoCorrect: false }
          )] }
        ),


        _jsx(View, { style: styles.termsContainer, children:
          _jsxs(View, { style: styles.termsRow, children: [
            _jsx(Text, { style: [styles.termsText, { backgroundColor: 'transparent' }], children: "I have agreed to the " }),
            _jsx(Text, { onPress: handlePrivacyPolicy, style: [styles.linkText1, { backgroundColor: 'transparent' }], children: "Privacy policy" }),
            _jsx(Text, { style: [styles.termsText, { backgroundColor: 'transparent' }], children: " and " }),

            _jsx(TouchableOpacity, {
              onPress: () => setAgreedToTerms(!agreedToTerms),
              style: [styles.inlineCheckbox, agreedToTerms && styles.checkboxChecked], children:

              agreedToTerms &&
              _jsx(Image, {
                source: require('@/oysloe-assets/login/tick.png'),
                style: styles.tickIcon,
                contentFit: "contain" }
              ) }

            ),

            _jsx(Text, { onPress: handleTermsConditions, style: styles.linkText2, children: " terms & conditions" })] }
          ) }
        ),


        _jsx(TouchableOpacity, { style: styles.signUpButton, onPress: handleSignUp, children:
          _jsx(Text, { style: styles.signUpButtonText, children: "Sign up" }) }
        ),


        _jsxs(TouchableOpacity, { style: styles.googleButton, onPress: handleGoogleSignUp, children: [
          _jsx(Image, {
            source: require('@/oysloe-assets/login/google.png'),
            style: styles.googleIcon,
            contentFit: "contain" }
          ),
          _jsx(Text, { style: styles.googleButtonText, children: "sign up with google" })] }
        ),


        _jsxs(View, { style: styles.loginContainer, children: [
          _jsx(Text, { style: styles.loginText, children: "I have an account already? " }),
          _jsx(TouchableOpacity, { onPress: handleLogin, children:
            _jsx(Text, { style: styles.loginLink, children: "Login" }) }
          )] }
        )] }
      ) }
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
    fontWeight: 500,
    color: 'grey',
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
    marginRight: 12,
    tintColor: '#333333'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333'
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 4
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  termsText: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
    marginRight: 4,
    flexShrink: 1
  },
  linkText1: {
    color: '#333333',
    fontWeight: '600',
    marginBottom: 0,
    backgroundColor: 'red'
  },
  linkText2: {
    color: '#333333',
    fontWeight: '600'
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4
  },
  inlineCheckbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6
  },
  checkboxChecked: {
    backgroundColor: '#333333',
    borderColor: '#333333'
  },
  tickIcon: {
    width: 12,
    height: 12,
    tintColor: '#FFFFFF'
  },
  signUpButton: {
    backgroundColor: '#4DFF88',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
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
  signUpButtonText: {
    color: 'grey',
    fontSize: 18,
    fontWeight: 700
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
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
    color: '#333333',
    fontSize: 16,
    fontWeight: '400'
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    fontSize: 14,
    color: '#666666'
  },
  loginLink: {
    fontSize: 14,
    color: 'grey',
    fontWeight: 'bold'
  }
});