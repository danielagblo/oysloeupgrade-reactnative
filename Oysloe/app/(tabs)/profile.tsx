import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

export default function ProfileScreen() {
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(DRAWER_WIDTH)).current;

  React.useEffect(() => {
   
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      router.back();
    });
  };

  const handleLogout = () => {
    router.replace('/login');
    setShowLogoutModal(false);
  };

  return (
    <>
      {}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowLogoutModal(false)}
        >
          <View style={styles.modalContent}>
            <Image 
              source={require('@/oysloe-assets/Ad details screen/sure.png')} 
              style={styles.modalIcon} 
            />
            <Text style={styles.modalText}>Are you sure?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonYes]}
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonYesText}>Yes logout</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonClose]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.modalButtonCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

      {}
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={closeDrawer} />
      
      {}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <SafeAreaView style={styles.drawerContent}>
          {}
          <TouchableOpacity style={styles.logoutButton} onPress={() => setShowLogoutModal(true)}>
            <Image
              source={require('@/oysloe-assets/side menu/logout.png')}
              style={styles.logoutIcon}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {}
            <View style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <Image
                  source={require('@/oysloe-assets/side menu/profile.png')}
                  style={styles.avatar}
                />
              </View>
              <Text style={styles.userName}>Jeffery Andoff</Text>
              <View style={styles.coverStatusContainer}>
                <View style={styles.greenDot} />
                <Text style={styles.coverStatus}>High cover</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: '80%' }]} />
              </View>
            </View>

            {}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>900k</Text>
                <Text style={styles.statLabel}>Active Ads</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>900k</Text>
                <Text style={styles.statLabel}>Taken Ads</Text>
              </View>
            </View>

            {}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => {
                  router.push('/setup');
                }}
              >
                <Image
                  source={require('@/oysloe-assets/side menu/profile.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Edit profile</Text>
              </TouchableOpacity>
            </View>

            {}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Business</Text>
              
              <TouchableOpacity style={styles.menuItem}>
                <Image
                  source={require('@/oysloe-assets/side menu/ads.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Ads</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Image
                  source={require('@/oysloe-assets/side menu/favorite.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Favorite</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Image
                  source={require('@/oysloe-assets/side menu/subscribe.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Subscription</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Image
                  source={require('@/oysloe-assets/side menu/refer and earn.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Refer & Earn</Text>
              </TouchableOpacity>
            </View>

            {}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Settings</Text>
              <TouchableOpacity style={styles.menuItem}>
                <Image
                  source={require('@/oysloe-assets/side menu/feedback.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Feedback</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Image
                  source={require('@/oysloe-assets/side menu/privacypolicy.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Privacy Policy</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Image
                  source={require('@/oysloe-assets/side menu/terms and conditions.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Terms & Conditions</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Fully transparent
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  drawerContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 50,
    overflow: 'hidden',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  coverStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ECDC4',
    marginRight: 6,
  },
  coverStatus: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginTop: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: '#333',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
  },
  modalIcon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  modalButtonYes: {
    backgroundColor: '#f0f0f0',
  },
  modalButtonYesText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  modalButtonClose: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  modalButtonCloseText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});
