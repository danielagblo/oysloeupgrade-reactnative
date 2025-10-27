import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  useEffect(() => {
    if (network) {
      setSelectedNetwork(network as string);
    }
  }, [network]);

  return (
    <SafeAreaView style={styles.container}>
      {}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Home</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit profile</Text>
        <TouchableOpacity>
          <Image source={require('@/oysloe-assets/side menu/logout.png')} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {}
        <View style={styles.alertSection}>
          <TouchableOpacity style={styles.closeAlertButton}>
            <Text style={styles.closeAlertIcon}>×</Text>
          </TouchableOpacity>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '100%' }]} />
            </View>
          </View>
          <View style={styles.alertContent}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>You're set now 100%</Text>
              <Text style={styles.alertText}>Congrats! Submit your first ad</Text>
            </View>
            <TouchableOpacity style={styles.postAdButton}>
              <View style={styles.plusIconContainer}>
                <Text style={styles.plusIcon}>+</Text>
              </View>
              <Text style={styles.postAdButtonText}>Post Ad</Text>
            </TouchableOpacity>
          </View>
        </View>

        {}
        <View style={styles.imageSection}>
          <TouchableOpacity style={styles.imageUpload}>
              <View style={styles.imageUploadCircle}>
                <Image
                  source={require('@/oysloe-assets/side menu/profile.png')}
                  style={styles.uploadIcon}
                  contentFit="cover"
                  onError={() => {  }}
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Details</Text>

          <Text style={styles.label}>Name</Text>
          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/Auth/name.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="John Agblo"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.labelContainer}>
            <Text style={styles.labelInContainer}>Email</Text>
            <View style={styles.verifiedTagContainer}>
              <Text style={styles.verifiedTag}>verified</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/Auth/email.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="agblod27@gmail.com"
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
              placeholder="0558871870"
              placeholderTextColor="#999"
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
              placeholder="0558871870"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.labelContainer}>
            <Text style={styles.labelInContainer}>National ID</Text>
            <View style={styles.verifiedTagContainer}>
              <Text style={styles.verifiedTag}>verified</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/account set up/id number.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={idNumber}
              onChangeText={setIdNumber}
              placeholder="AgHDKFL34658"
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
              placeholder="Another Phone"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Account</Text>

          <Text style={styles.label}>Account name</Text>
          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/account set up/mobile account name.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={accountName}
              onChangeText={setAccountName}
              placeholder="Another Phone"
              placeholderTextColor="#999"
            />
          </View>

          <Text style={styles.label}>Account number</Text>
          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/account set up/account number.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={accountNumber}
              onChangeText={setAccountNumber}
              placeholder="0552892433"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.label}>Mobile network</Text>
          <View style={styles.inputContainer}>
            <Image source={require('@/oysloe-assets/account set up/select network.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={selectedNetwork}
              placeholder="Select mobile network"
              placeholderTextColor="#999"
              editable={false}
            />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
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
  closeIcon: {
    width: 20,
    height: 20,
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
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  closeAlertButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  closeAlertIcon: {
    fontSize: 18,
    color: '#666',
    fontWeight: '300',
  },
  progressBarContainer: {
    marginVertical: 15,
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#66FF99',
    borderRadius: 3,
  },
  alertContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressInfo: {
    flex: 1,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  alertText: {
    fontSize: 14,
    color: '#666',
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
    marginLeft: 15,
  },
  plusIconContainer: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  plusIcon: {
    fontSize: 12,
    color: '#333',
    fontWeight: '300',
  },
  postAdButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  imageSection: {
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 8,
  },
  labelInContainer: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  verifiedTagContainer: {
    backgroundColor: '#4777deff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginLeft: 8,
  },
  verifiedTag: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
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
});

