import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = () => {
    // TODO: Implement sign up logic
    console.log('Sign up with:', { name, email, phone, password, retypePassword, agreedToTerms });
    router.replace('/(tabs)');
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google sign up logic
    console.log('Google sign up');
    router.replace('/(tabs)');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handlePrivacyPolicy = () => {
    // TODO: Navigate to privacy policy
    console.log('Privacy policy');
  };

  const handleTermsConditions = () => {
    // TODO: Navigate to terms & conditions
    console.log('Terms & conditions');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Get Started</Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Image
            source={require('@/oysloe-assets/Auth/name.png')}
            style={styles.inputIcon}
            contentFit="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#666666"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Image
            source={require('@/oysloe-assets/Auth/email.png')}
            style={styles.inputIcon}
            contentFit="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#666666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Image
            source={require('@/oysloe-assets/Auth/phone.png')}
            style={styles.inputIcon}
            contentFit="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="+233"
            placeholderTextColor="#666666"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoCorrect={false}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Image
            source={require('@/oysloe-assets/Auth/passwordkey.png')}
            style={styles.inputIcon}
            contentFit="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Retype Password Input */}
        <View style={styles.inputContainer}>
          <Image
            source={require('@/oysloe-assets/Auth/passwordkey.png')}
            style={styles.inputIcon}
            contentFit="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Retype Password"
            placeholderTextColor="#666666"
            value={retypePassword}
            onChangeText={setRetypePassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <View style={styles.termsRow}>
            <Text style={[styles.termsText, { backgroundColor: 'transparent' }]}>I have agreed to the </Text>
            <Text onPress={handlePrivacyPolicy} style={[styles.linkText1, { backgroundColor: 'transparent' }]}>Privacy policy</Text>
            <Text style={[styles.termsText, { backgroundColor: 'transparent' }]}> and </Text>

            <TouchableOpacity
              onPress={() => setAgreedToTerms(!agreedToTerms)}
              style={[styles.inlineCheckbox, agreedToTerms && styles.checkboxChecked]}
            >
              {agreedToTerms && (
                <Image
                  source={require('@/oysloe-assets/login/tick.png')}
                  style={styles.tickIcon}
                  contentFit="contain"
                />
              )}
            </TouchableOpacity>

            <Text onPress={handleTermsConditions} style={styles.linkText2}> terms & conditions</Text>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Google Sign Up Button */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
          <Image
            source={require('@/oysloe-assets/login/google.png')}
            style={styles.googleIcon}
            contentFit="contain"
          />
          <Text style={styles.googleButtonText}>sign up with google</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>I have an account already? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 500,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 40,
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
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: '#333333',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  termsText: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
    marginRight: 4,
    flexShrink: 1,
  },
  linkText1: {
    color: '#333333',
    fontWeight: '600',
    marginBottom: 0,
    backgroundColor: 'red',
  },
  linkText2: {
    color: '#333333',
    fontWeight: '600',
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
    marginLeft: 4,
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
    marginHorizontal: 6,
  },
  checkboxChecked: {
    backgroundColor: '#333333',
    borderColor: '#333333',
  },
  tickIcon: {
    width: 12,
    height: 12,
    tintColor: '#FFFFFF',
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
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButtonText: {
    color: 'grey',
    fontSize: 18,
    fontWeight: 700,
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
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '400',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666666',
  },
  loginLink: {
    fontSize: 14,
    color: 'grey',
    fontWeight: 'bold',
  },
});
