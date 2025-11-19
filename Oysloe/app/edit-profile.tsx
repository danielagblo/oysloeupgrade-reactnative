import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions } from
'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const { width } = Dimensions.get('window');

export default function EditProfileScreen() {
  const { network } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [businessLogo, setBusinessLogo] = useState<string | null>(null);
  const [idFrontImage, setIdFrontImage] = useState<string | null>(null);
  const [idBackImage, setIdBackImage] = useState<string | null>(null);

  useEffect(() => {
    if (network) {
      setSelectedNetwork(Array.isArray(network) ? network[0] : network);
    }
  }, [network]);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        if (savedImage) {
          setProfileImage(savedImage);
        }
        const savedLogo = await AsyncStorage.getItem('businessLogo');
        if (savedLogo) {
          setBusinessLogo(savedLogo);
        }
      } catch (error) {
        console.log('Error loading images:', error);
      }
    };
    loadProfileImage();
  }, []);

  const pickImage = async (type: 'profile' | 'business' | 'idFront' | 'idBack') => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload images!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: type === 'profile' || type === 'business' ? [1, 1] : [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      switch (type) {
        case 'profile':
          setProfileImage(imageUri);
          await AsyncStorage.setItem('profileImage', imageUri);
          break;
        case 'business':
          setBusinessLogo(imageUri);
          await AsyncStorage.setItem('businessLogo', imageUri);
          break;
        case 'idFront':
          setIdFrontImage(imageUri);
          break;
        case 'idBack':
          setIdBackImage(imageUri);
          break;
      }
    }
  };

  return (
    _jsxs(SafeAreaView, { style: styles.container, children: [

      _jsxs(View, { style: styles.header, children: [
        _jsx(TouchableOpacity, { onPress: () => router.back(), style: styles.backButton, children:
          _jsx(Text, { style: styles.backText, children: "\u2190 Home" }) }
        ),
        _jsx(Text, { style: styles.headerTitle, children: "Edit profile" }),
        _jsx(TouchableOpacity, { children:
          _jsx(Image, { source: require('@/oysloe-assets/side menu/logout.png'), style: styles.closeIcon }) }
        )] }
      ),

      _jsxs(ScrollView, { showsVerticalScrollIndicator: false, children: [

        _jsxs(View, { style: styles.alertSection, children: [
          _jsx(TouchableOpacity, { style: styles.closeAlertButton, children:
            _jsx(Text, { style: styles.closeAlertIcon, children: "\xD7" }) }
          ),
          _jsx(View, { style: styles.progressBarContainer, children:
            _jsx(View, { style: styles.progressBar, children:
              _jsx(View, { style: [styles.progressFill, { width: '100%' }] }) }
            ) }
          ),
          _jsxs(View, { style: styles.alertContent, children: [
            _jsxs(View, { style: styles.progressInfo, children: [
              _jsx(Text, { style: styles.progressText, children: "You're set now 100%" }),
              _jsx(Text, { style: styles.alertText, children: "Congrats! Submit your first ad" })] }
            ),
            _jsxs(TouchableOpacity, { style: styles.postAdButton, children: [
              _jsx(View, { style: styles.plusIconContainer, children:
                _jsx(Text, { style: styles.plusIcon, children: "+" }) }
              ),
              _jsx(Text, { style: styles.postAdButtonText, children: "Post Ad" })] }
            )] }
          )] }
        ),


        _jsxs(View, { style: styles.imageSection, children: [
          _jsxs(TouchableOpacity, { style: styles.imageUpload, onPress: () => pickImage('profile'), children: [
            _jsx(View, { style: styles.imageUploadCircle, children:
              _jsx(Image, {
                source: profileImage ? { uri: profileImage } : require('@/oysloe-assets/side menu/profile.png'),
                style: styles.uploadIcon,
                contentFit: "cover",
                onError: () => {} }
              ) }
            ),
            _jsx(Text, { style: styles.imageUploadText, children: "Profile image" })] }
          ),

          _jsxs(TouchableOpacity, { style: styles.imageUpload, onPress: () => pickImage('business'), children: [
            _jsx(View, { style: styles.imageUploadCircle, children:
              _jsx(Image, {
                source: businessLogo ? { uri: businessLogo } : require('@/oysloe-assets/account set up/upload.png'),
                style: styles.uploadIcon,
                contentFit: "cover",
                onError: () => {} }
              ) }
            ),
            _jsx(Text, { style: styles.imageUploadText, children: "Business logo" })] }
          )] }
        ),


        _jsxs(View, { style: styles.section, children: [
          _jsx(Text, { style: styles.sectionTitle, children: "General Details" }),

          _jsx(Text, { style: styles.label, children: "Name" }),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/Auth/name.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: name,
              onChangeText: setName,
              placeholder: "John Agblo",
              placeholderTextColor: "#999" }
            )] }
          ),

          _jsxs(View, { style: styles.labelContainer, children: [
            _jsx(Text, { style: styles.labelInContainer, children: "Email" }),
            _jsx(View, { style: styles.verifiedTagContainer, children:
              _jsx(Text, { style: styles.verifiedTag, children: "verified" }) }
            )] }
          ),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/Auth/email.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: email,
              onChangeText: setEmail,
              placeholder: "agblod27@gmail.com",
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
              placeholder: "0558871870",
              placeholderTextColor: "#999",
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
              placeholder: "0558871870",
              placeholderTextColor: "#999",
              keyboardType: "phone-pad" }
            )] }
          ),

          _jsxs(View, { style: styles.labelContainer, children: [
            _jsx(Text, { style: styles.labelInContainer, children: "National ID" }),
            _jsx(View, { style: styles.verifiedTagContainer, children:
              _jsx(Text, { style: styles.verifiedTag, children: "verified" }) }
            )] }
          ),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/account set up/id number.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: idNumber,
              onChangeText: setIdNumber,
              placeholder: "AgHDKFL34658",
              placeholderTextColor: "#999" }
            )] }
          ),

          _jsxs(View, { style: styles.idUploadContainer, children: [
            _jsxs(View, { style: styles.idUploadSection, children: [
              _jsx(Text, { style: styles.idUploadLabel, children: "Front" }),
              _jsx(TouchableOpacity, { style: styles.idUploadButton, onPress: () => pickImage('idFront'), children:
                _jsx(Image, { source: idFrontImage ? { uri: idFrontImage } : require('@/oysloe-assets/Ad details screen/front.png'), style: styles.idUploadIcon }) }
              )] }
            ),
            _jsxs(View, { style: styles.idUploadSection, children: [
              _jsx(Text, { style: styles.idUploadLabel, children: "Back" }),
              _jsx(TouchableOpacity, { style: styles.idUploadButton, onPress: () => pickImage('idBack'), children:
                _jsx(Image, { source: idBackImage ? { uri: idBackImage } : require('@/oysloe-assets/Ad details screen/back.png'), style: styles.idUploadIcon }) }
              )] }
            )] }
          ),

          _jsx(Text, { style: styles.label, children: "Business name" }),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/account set up/business name.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: businessName,
              onChangeText: setBusinessName,
              placeholder: "Another Phone",
              placeholderTextColor: "#999" }
            )] }
          )] }
        ),


        _jsxs(View, { style: styles.section, children: [
          _jsx(Text, { style: styles.sectionTitle, children: "Payment Account" }),

          _jsx(Text, { style: styles.label, children: "Account name" }),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/account set up/mobile account name.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: accountName,
              onChangeText: setAccountName,
              placeholder: "Another Phone",
              placeholderTextColor: "#999" }
            )] }
          ),

          _jsx(Text, { style: styles.label, children: "Account number" }),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/account set up/account number.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: accountNumber,
              onChangeText: setAccountNumber,
              placeholder: "0552892433",
              placeholderTextColor: "#999",
              keyboardType: "numeric" }
            )] }
          ),

          _jsx(Text, { style: styles.label, children: "Mobile network" }),
          _jsxs(View, { style: styles.inputContainer, children: [
            _jsx(Image, { source: require('@/oysloe-assets/account set up/select network.png'), style: styles.inputIcon }),
            _jsx(TextInput, {
              style: styles.input,
              value: selectedNetwork,
              placeholder: "Select mobile network",
              placeholderTextColor: "#999",
              editable: false }
            )] }
          )] }
        ),

        _jsx(View, { style: { height: 100 } })] }
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
  closeIcon: {
    width: 20,
    height: 20
  },
  alertSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative'
  },
  closeAlertButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5
  },
  closeAlertIcon: {
    fontSize: 18,
    color: '#666',
    fontWeight: '300'
  },
  progressBarContainer: {
    marginVertical: 15,
    marginBottom: 20
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#66FF99',
    borderRadius: 3
  },
  alertContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressInfo: {
    flex: 1
  },
  progressText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5
  },
  alertText: {
    fontSize: 14,
    color: '#666'
  },
  postAdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginLeft: 15
  },
  plusIconContainer: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6
  },
  plusIcon: {
    fontSize: 12,
    color: '#333',
    fontWeight: '300'
  },
  postAdButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333'
  },
  imageSection: {
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
    width: '100%',
    height: '100%',
    borderRadius: 50
  },
  imageUploadText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center'
  },
  idUploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20
  },
  idUploadSection: {
    flex: 1,
    marginHorizontal: 5
  },
  idUploadLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10
  },
  idUploadButton: {
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#66FF99',
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  idUploadIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 8
  },
  labelInContainer: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333'
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 15,
    marginBottom: 8
  },
  verifiedTagContainer: {
    backgroundColor: '#4777deff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginLeft: 8
  },
  verifiedTag: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600'
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
  }
});