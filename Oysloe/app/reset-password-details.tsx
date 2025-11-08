import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';

const { width } = Dimensions.get('window');

export default function ResetPasswordDetailsScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const canLogin = name && email && phone && password && confirm && password === confirm;

  const handleLogin = () => {
    if (!canLogin) return;
    router.replace('/login');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Reset password</Text>

          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/Auth/name.png')} style={styles.inputIcon} contentFit="contain" />
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#999999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/Auth/email.png')} style={styles.inputIcon} contentFit="contain" />
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
            <Image source={require('@/oysloe-assets/Auth/phone.png')} style={styles.inputIcon} contentFit="contain" />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#999999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/Auth/passwordkey.png')} style={styles.inputIcon} contentFit="contain" />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#999999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/Auth/passwordkey.png')} style={styles.inputIcon} contentFit="contain" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999999"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity style={[styles.loginButton, !canLogin && styles.loginDisabled]} disabled={!canLogin} onPress={handleLogin}>
            <Text style={[styles.loginButtonText, !canLogin && styles.loginTextDisabled]}>Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  content: { flexGrow: 1, paddingHorizontal: 30, justifyContent: 'center', paddingVertical: 24 },
  title: { fontSize: 24, fontWeight: '500', color: '#333333', textAlign: 'center', marginBottom: 24 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 25, paddingHorizontal: 20, paddingVertical: 18, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  inputIcon: { width: 20, height: 20, marginRight: 15, tintColor: '#999999' },
  input: { flex: 1, fontSize: 16, color: '#333333' },
  loginButton: { backgroundColor: '#66FF99', borderRadius: 25, paddingVertical: 18, alignItems: 'center', marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  loginDisabled: { backgroundColor: '#CCCCCC', opacity: 0.7 },
  loginButtonText: { color: '#999999', fontSize: 18, fontWeight: '400' },
  loginTextDisabled: { color: '#777777' }
});


