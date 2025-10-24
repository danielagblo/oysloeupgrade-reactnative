import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    console.log('Login with:', { email, password });
    router.replace('/(tabs)');
  };

  const handleGoogleLogin = () => {
    
    console.log('Google login');
    router.replace('/(tabs)');
  };

  const handlePasswordReset = () => {
    router.push('/reset-password');
  };

  const handleOTPLogin = () => {
    router.push('/otp-login');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.title}>Welcome!</Text>

        
        <View style={styles.inputContainer}>
          <Image
            source={require('@/oysloe-assets/Auth/email.png')}
            style={styles.inputIcon}
            contentFit="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#999999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        
        <View style={styles.inputContainer}>
          <Image
            source={require('@/oysloe-assets/Auth/passwordkey.png')}
            style={styles.inputIcon}
            contentFit="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <Image
            source={require('@/oysloe-assets/login/google.png')}
            style={styles.googleIcon}
            contentFit="contain"
          />
          <Text style={styles.googleButtonText}>login using google</Text>
        </TouchableOpacity>

        
        <Text style={styles.cantLoginText}>Cant Login?</Text>
        
        <View style={styles.helpButtonsContainer}>
          <TouchableOpacity style={styles.helpButton} onPress={handlePasswordReset}>
            <Text style={styles.helpButtonText}>Password Reset</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.helpButton} onPress={handleOTPLogin}>
            <Text style={styles.helpButtonText}>OTP Login</Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account ? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpLink}>Sign up</Text>
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
    fontSize: 40,
    fontWeight: 500,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 40,
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
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
    tintColor: '#999999',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
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
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: '#999999',
    fontSize: 18,
    fontWeight: '400',
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
    color: '#999999',
    fontSize: 16,
    fontWeight: '400',
  },
  cantLoginText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 16,
  },
  helpButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
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
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  helpButtonText: {
    color: '#999999',
    fontSize: 14,
    fontWeight: '400',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: '#999999',
  },
  signUpLink: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
});
