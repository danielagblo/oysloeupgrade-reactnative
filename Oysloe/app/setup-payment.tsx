import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal } from
'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const { width } = Dimensions.get('window');

export default function SetupPaymentScreen() {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('');

  const networks = ['MTN', 'Vodafone', 'Tigo'];

  return (
    _jsxs(SafeAreaView, { style: styles.container, children: [

      _jsxs(View, { style: styles.header, children: [
        _jsx(TouchableOpacity, { onPress: () => router.back(), style: styles.backButton, children:
          _jsx(Text, { style: styles.backText, children: "\u2190 Back" }) }
        ),
        _jsx(Text, { style: styles.headerTitle, children: "Set up" }),
        _jsx(View, { style: styles.placeholder })] }
      ),


      _jsxs(View, { style: styles.progressSection, children: [
        _jsx(View, { style: styles.progressBarContainer, children:
          _jsx(View, { style: styles.progressBar, children:
            _jsx(View, { style: [styles.progressFill, { width: '80%' }] }) }
          ) }
        ),
        _jsx(Text, { style: styles.progressText, children: "You are only 80%" }),
        _jsx(Text, { style: styles.progressSubtext, children: "Complete your account to upload your first ad." })] }
      ),

      _jsxs(ScrollView, { showsVerticalScrollIndicator: false, contentContainerStyle: styles.scrollContent, children: [

        _jsx(Text, { style: styles.pageTitle, children: "Set payment account" }),


        _jsxs(View, { style: styles.formSection, children: [
          _jsx(Text, { style: styles.label, children: "Add account name" }),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/account set up/mobile account name.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: accountName,
              onChangeText: setAccountName,
              placeholder: "Account name",
              placeholderTextColor: "#999" }
            )] }
          ),

          _jsx(Text, { style: styles.label, children: "Add account number" }),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/account set up/account number.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: accountNumber,
              onChangeText: setAccountNumber,
              placeholder: "Account number",
              placeholderTextColor: "#999",
              keyboardType: "numeric" }
            )] }
          ),

          _jsx(Text, { style: styles.label, children: "Mobile network" }),
          _jsxs(TouchableOpacity, { style: styles.inputContainer, onPress: () => setShowNetworkModal(true), children: [
            _jsx(Image, { source: require('@/oysloe-assets/account set up/select network.png'), style: styles.inputIcon }),
            _jsx(Text, { style: [styles.input, !selectedNetwork && styles.placeholderText], children:
              selectedNetwork || 'Select mobile network' }
            ),
            _jsx(Ionicons, { name: "chevron-down", size: 20, color: "#666" })] }
          )] }
        ),


        _jsxs(View, { style: styles.buttonContainer, children: [
          _jsx(TouchableOpacity, {
            style: styles.skipButton,
            onPress: () => router.push('/edit-profile'), children:

            _jsx(Text, { style: styles.skipButtonText, children: "Skip" }) }
          ),
          _jsx(TouchableOpacity, {
            style: styles.nextButton,
            onPress: () => {
              if (selectedNetwork) {
                router.push(`/edit-profile?network=${selectedNetwork}`);
              } else {
                router.push('/edit-profile');
              }
            }, children:

            _jsx(Text, { style: styles.nextButtonText, children: "Next" }) }
          )] }
        )] }
      ),


      _jsx(Modal, {
        visible: showNetworkModal,
        transparent: true,
        animationType: "slide",
        onRequestClose: () => setShowNetworkModal(false), children:

        _jsx(TouchableOpacity, {
          style: styles.modalOverlay,
          activeOpacity: 1,
          onPress: () => setShowNetworkModal(false), children:

          _jsxs(View, { style: styles.modalContent, children: [
            _jsx(View, { style: styles.modalHandle }),
            networks.map((network, index) =>
            _jsx(TouchableOpacity, {

              style: [
              styles.networkOption,
              index === networks.length - 1 && { borderBottomWidth: 0 }],

              onPress: () => {
                setSelectedNetwork(network);
                setShowNetworkModal(false);
              }, children:

              _jsx(Text, { style: styles.networkOptionText, children: network }) }, network
            )
            )] }
          ) }
        ) }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  placeholder: {
    width: 50
  },
  progressSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30
  },
  progressBarContainer: {
    marginBottom: 10
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#66FF99'
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5
  },
  progressSubtext: {
    fontSize: 14,
    color: '#666'
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'medium',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15
  },
  formSection: {
    marginBottom: 10
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginTop: 15
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#666'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  placeholderText: {
    color: '#999'
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: 'center'
  },
  skipButton: {
    paddingVertical: 12,
    marginBottom: 15
  },
  skipButtonText: {
    fontSize: 16,
    color: '#666'
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20
  },
  networkOption: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  networkOptionText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '400'
  }
});