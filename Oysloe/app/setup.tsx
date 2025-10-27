import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function SetupScreen() {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Set up</Text>
        <View style={styles.placeholder} />
      </View>

      {}
      <View style={styles.progressSection}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>
        </View>
        <Text style={styles.progressText}>You are only 60%</Text>
        <Text style={styles.progressSubtext}>Complete your account to upload your first ad.</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {}
        <View style={styles.imageUploadContainer}>
          <TouchableOpacity style={styles.imageUpload}>
            <View style={styles.imageUploadCircle}>
              <Image
                source={require('@/oysloe-assets/account set up/upload.png')}
                style={styles.uploadIcon}
                contentFit="cover"
                onError={() => {}}
              />
            </View>
            <Text style={styles.imageUploadText}>Profile image</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageUpload}>
            <View style={styles.imageUploadCircle}>
              <Image
                source={require('@/oysloe-assets/account set up/upload.png')}
                style={styles.uploadIcon}
                contentFit="cover"
                onError={() => {}}
              />
            </View>
            <Text style={styles.imageUploadText}>Business logo</Text>
          </TouchableOpacity>
        </View>

        {}
        <View style={styles.formSection}>
          <Text style={styles.label}>Name *</Text>
          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/Auth/name.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Ex. John Agblo"
              placeholderTextColor="#999"
            />
          </View>

          <Text style={styles.label}>Business name</Text>
          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/account set up/business name.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={businessName}
              onChangeText={setBusinessName}
              placeholder="Add your business name?"
              placeholderTextColor="#999"
            />
          </View>

          <Text style={styles.label}>First number</Text>
          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/Auth/phone.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={firstNumber}
              onChangeText={setFirstNumber}
              placeholder="First number"
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.label}>Second number</Text>
          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/Auth/phone.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={secondNumber}
              onChangeText={setSecondNumber}
              placeholder="Number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.label}>Add national ID *</Text>
          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/account set up/id number.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={idNumber}
              onChangeText={setIdNumber}
              placeholder="ID number"
              placeholderTextColor="#999"
            />
          </View>

          {}
          <View style={styles.idUploadContainer}>
            <View style={styles.idUploadSection}>
              <Text style={styles.idUploadLabel}>Front</Text>
              <TouchableOpacity style={styles.idUploadButton}>
                <Image source={require('@/oysloe-assets/Ad details screen/front.png')} style={styles.idUploadIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.idUploadSection}>
              <Text style={styles.idUploadLabel}>Back</Text>
              <TouchableOpacity style={styles.idUploadButton}>
                <Image source={require('@/oysloe-assets/Ad details screen/back.png')} style={styles.idUploadIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {}
          <View style={styles.emailVerificationBox}>
            <Text style={styles.emailVerificationTitle}>Please verify your email*</Text>
            <Text style={styles.emailVerificationText}>
              We will send an email to agblod27@gmail.com{'\n'}
              Click the link in the email to verify your account
            </Text>
            <TouchableOpacity style={styles.sendLinkButton} onPress={() => setShowModal(true)}>
              <Text style={styles.sendLinkButtonText}>Send link</Text>
            </TouchableOpacity>
          </View>

          {}
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={() => router.push('/setup-payment')}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={require('@/gifs/mail.gif')} style={styles.modalIcon} />
            <Text style={styles.modalText}>Verification link</Text>
            <Text style={styles.modalText}>has been sent</Text>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 50,
  },
  progressSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  progressBarContainer: {
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#66FF99',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  progressSubtext: {
    fontSize: 14,
    color: '#666',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  imageUpload: {
    alignItems: 'center',
    width: (width - 60) / 2,
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
    marginBottom: 10,
  },
  uploadIcon: {
    width: 50,
    height: 50,
  },
  imageUploadText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  formSection: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#666',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  idUploadContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 15,
  },
  idUploadSection: {
    flex: 1,
  },
  idUploadLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  idUploadButton: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  idUploadIcon: {
    width: 60,
    height: 60,
  },
  emailVerificationBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  emailVerificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emailVerificationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  sendLinkButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  sendLinkButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  nextButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  modalCloseButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
});

