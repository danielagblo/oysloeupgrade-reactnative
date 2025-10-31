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

import { SafeAreaView } from 'react-native-safe-area-context';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const { width } = Dimensions.get('window');

export default function SetupScreen() {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [showModal, setShowModal] = useState(false);

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
            _jsx(View, { style: [styles.progressFill, { width: '60%' }] }) }
          ) }
        ),
        _jsx(Text, { style: styles.progressText, children: "You are only 60%" }),
        _jsx(Text, { style: styles.progressSubtext, children: "Complete your account to upload your first ad." })] }
      ),

      _jsxs(ScrollView, { showsVerticalScrollIndicator: false, contentContainerStyle: styles.scrollContent, children: [

        _jsxs(View, { style: styles.imageUploadContainer, children: [
          _jsxs(TouchableOpacity, { style: styles.imageUpload, children: [
            _jsx(View, { style: styles.imageUploadCircle, children:
              _jsx(Image, {
                source: require('@/oysloe-assets/account set up/upload.png'),
                style: styles.uploadIcon,
                contentFit: "cover",
                onError: () => {} }
              ) }
            ),
            _jsx(Text, { style: styles.imageUploadText, children: "Profile image" })] }
          ),

          _jsxs(TouchableOpacity, { style: styles.imageUpload, children: [
            _jsx(View, { style: styles.imageUploadCircle, children:
              _jsx(Image, {
                source: require('@/oysloe-assets/account set up/upload.png'),
                style: styles.uploadIcon,
                contentFit: "cover",
                onError: () => {} }
              ) }
            ),
            _jsx(Text, { style: styles.imageUploadText, children: "Business logo" })] }
          )] }
        ),


        _jsxs(View, { style: styles.formSection, children: [
          _jsx(Text, { style: styles.label, children: "Name *" }),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/Auth/name.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: name,
              onChangeText: setName,
              placeholder: "Ex. John Agblo",
              placeholderTextColor: "#999" }
            )] }
          ),

          _jsx(Text, { style: styles.label, children: "Business name" }),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/account set up/business name.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: businessName,
              onChangeText: setBusinessName,
              placeholder: "Add your business name?",
              placeholderTextColor: "#999" }
            )] }
          ),

          _jsx(Text, { style: styles.label, children: "First number" }),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/Auth/phone.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: firstNumber,
              onChangeText: setFirstNumber,
              placeholder: "First number",
              keyboardType: "phone-pad" }
            )] }
          ),

          _jsx(Text, { style: styles.label, children: "Second number" }),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/Auth/phone.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: secondNumber,
              onChangeText: setSecondNumber,
              placeholder: "Number",
              placeholderTextColor: "#999",
              keyboardType: "phone-pad" }
            )] }
          ),

          _jsx(Text, { style: styles.label, children: "Add national ID *" }),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/account set up/id number.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: idNumber,
              onChangeText: setIdNumber,
              placeholder: "ID number",
              placeholderTextColor: "#999" }
            )] }
          ),


          _jsxs(View, { style: styles.idUploadContainer, children: [
            _jsxs(View, { style: styles.idUploadSection, children: [
              _jsx(Text, { style: styles.idUploadLabel, children: "Front" }),
              _jsx(TouchableOpacity, { style: styles.idUploadButton, children:
                _jsx(Image, { source: require('@/oysloe-assets/Ad details screen/front.png'), style: styles.idUploadIcon }) }
              )] }
            ),
            _jsxs(View, { style: styles.idUploadSection, children: [
              _jsx(Text, { style: styles.idUploadLabel, children: "Back" }),
              _jsx(TouchableOpacity, { style: styles.idUploadButton, children:
                _jsx(Image, { source: require('@/oysloe-assets/Ad details screen/back.png'), style: styles.idUploadIcon }) }
              )] }
            )] }
          ),


          _jsxs(View, { style: styles.emailVerificationBox, children: [
            _jsx(Text, { style: styles.emailVerificationTitle, children: "Please verify your email*" }),
            _jsxs(Text, { style: styles.emailVerificationText, children: ["We will send an email to agblod27@gmail.com",
              '\n', "Click the link in the email to verify your account"] }

            ),
            _jsx(TouchableOpacity, { style: styles.sendLinkButton, onPress: () => setShowModal(true), children:
              _jsx(Text, { style: styles.sendLinkButtonText, children: "Send link" }) }
            )] }
          ),


          _jsx(TouchableOpacity, {
            style: styles.nextButton,
            onPress: () => router.push('/setup-payment'), children:

            _jsx(Text, { style: styles.nextButtonText, children: "Next" }) }
          )] }
        )] }
      ),


      _jsx(Modal, {
        visible: showModal,
        transparent: true,
        animationType: "fade",
        onRequestClose: () => setShowModal(false), children:

        _jsx(View, { style: styles.modalOverlay, children:
          _jsxs(View, { style: styles.modalContent, children: [
            _jsx(Image, { source: require('@/gifs/mail.gif'), style: styles.modalIcon }),
            _jsx(Text, { style: styles.modalText, children: "Verification link" }),
            _jsx(Text, { style: styles.modalText, children: "has been sent" }),
            _jsx(TouchableOpacity, {
              style: styles.modalCloseButton,
              onPress: () => setShowModal(false), children:

              _jsx(Text, { style: styles.modalCloseButtonText, children: "Close" }) }
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
    paddingBottom: 20
  },
  imageUploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  imageUpload: {
    alignItems: 'center',
    width: (width - 60) / 2
  },
  imageUploadCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#66FF99',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  uploadIcon: {
    width: 50,
    height: 50
  },
  imageUploadText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center'
  },
  formSection: {
    paddingHorizontal: 20
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
  idUploadContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 15
  },
  idUploadSection: {
    flex: 1
  },
  idUploadLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8
  },
  idUploadButton: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  idUploadIcon: {
    width: 60,
    height: 60
  },
  emailVerificationBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  emailVerificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  emailVerificationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15
  },
  sendLinkButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center'
  },
  sendLinkButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666'
  },
  nextButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 30,
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    width: width * 0.85,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalIcon: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  modalText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5
  },
  modalCloseButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666'
  }
});