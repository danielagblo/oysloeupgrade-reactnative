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
  Pressable } from
'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

export default function ProfileScreen() {
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(DRAWER_WIDTH)).current;

  React.useEffect(() => {

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, []);

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      router.back();
    });
  };

  const handleLogout = () => {
    router.replace('/login');
    setShowLogoutModal(false);
  };

  return (
    _jsxs(_Fragment, { children: [

      _jsx(Modal, {
        visible: showLogoutModal,
        transparent: true,
        animationType: "fade",
        onRequestClose: () => setShowLogoutModal(false), children:

        _jsx(Pressable, {
          style: styles.modalOverlay,
          onPress: () => setShowLogoutModal(false), children:

          _jsxs(View, { style: styles.modalContent, children: [
            _jsx(Image, {
              source: require('@/oysloe-assets/Ad details screen/sure.png'),
              style: styles.modalIcon }
            ),
            _jsx(Text, { style: styles.modalText, children: "Are you sure?" }),
            _jsxs(View, { style: styles.modalButtons, children: [
              _jsx(TouchableOpacity, {
                style: [styles.modalButton, styles.modalButtonYes],
                onPress: handleLogout, children:

                _jsx(Text, { style: styles.modalButtonYesText, children: "Yes logout" }) }
              ),
              _jsx(TouchableOpacity, {
                style: [styles.modalButton, styles.modalButtonClose],
                onPress: () => setShowLogoutModal(false), children:

                _jsx(Text, { style: styles.modalButtonCloseText, children: "Close" }) }
              )] }
            )] }
          ) }
        ) }
      ),


      _jsx(TouchableOpacity, { style: styles.backdrop, activeOpacity: 1, onPress: closeDrawer }),


      _jsx(Animated.View, {
        style: [
        styles.drawer,
        {
          transform: [{ translateX: slideAnim }]
        }], children:


        _jsxs(SafeAreaView, { style: styles.drawerContent, children: [

          _jsxs(TouchableOpacity, { style: styles.logoutButton, onPress: () => setShowLogoutModal(true), children: [
            _jsx(Image, {
              source: require('@/oysloe-assets/side menu/logout.png'),
              style: styles.logoutIcon }
            ),
            _jsx(Text, { style: styles.logoutText, children: "Logout" })] }
          ),

          _jsxs(ScrollView, { showsVerticalScrollIndicator: false, children: [

            _jsxs(View, { style: styles.profileCard, children: [
              _jsx(View, { style: styles.avatarContainer, children:
                _jsx(Image, {
                  source: require('@/oysloe-assets/side menu/profile.png'),
                  style: styles.avatar }
                ) }
              ),
              _jsx(Text, { style: styles.userName, children: "Jeffery Andoff" }),
              _jsxs(View, { style: styles.coverStatusContainer, children: [
                _jsx(View, { style: styles.greenDot }),
                _jsx(Text, { style: styles.coverStatus, children: "High cover" })] }
              ),
              _jsx(View, { style: styles.progressBarContainer, children:
                _jsx(View, { style: [styles.progressBar, { width: '80%' }] }) }
              )] }
            ),


            _jsxs(View, { style: styles.statsContainer, children: [
              _jsxs(TouchableOpacity, { style: styles.statCard, onPress: () => router.push('/ads?initialTab=active'), children: [
                _jsx(Text, { style: styles.statNumber, children: "900k" }),
                _jsx(Text, { style: styles.statLabel, children: "Active Ads" })] }
              ),
              _jsxs(View, { style: styles.statCard, children: [
                _jsx(Text, { style: styles.statNumber, children: "900k" }),
                _jsx(Text, { style: styles.statLabel, children: "Taken Ads" })] }
              )] }
            ),


            _jsxs(View, { style: styles.section, children: [
              _jsx(Text, { style: styles.sectionTitle, children: "Account" }),
              _jsxs(TouchableOpacity, {
                style: styles.menuItem,
                onPress: () => {
                  router.push('/setup');
                }, children: [

                _jsx(Image, {
                  source: require('@/oysloe-assets/side menu/profile.png'),
                  style: styles.menuIcon }
                ),
                _jsx(Text, { style: styles.menuText, children: "Edit profile" })] }
              )] }
            ),


            _jsxs(View, { style: styles.section, children: [
              _jsx(Text, { style: styles.sectionTitle, children: "Business" }),

              _jsxs(TouchableOpacity, { style: styles.menuItem, onPress: () => router.push('/ads'), children: [
                _jsx(Image, {
                  source: require('@/oysloe-assets/side menu/ads.png'),
                  style: styles.menuIcon }
                ),
                _jsx(Text, { style: styles.menuText, children: "Ads" })] }
              ),

              _jsxs(TouchableOpacity, { style: styles.menuItem, onPress: () => router.push('/(tabs)/favorites'), children: [
                _jsx(Image, {
                  source: require('@/oysloe-assets/side menu/favorite.png'),
                  style: styles.menuIcon }
                ),
                _jsx(Text, { style: styles.menuText, children: "Favorite" })] }
              ),

              _jsxs(TouchableOpacity, { style: styles.menuItem, onPress: () => router.push('/(tabs)/subscription'), children: [
                _jsx(Image, {
                  source: require('@/oysloe-assets/side menu/subscribe.png'),
                  style: styles.menuIcon }
                ),
                _jsx(Text, { style: styles.menuText, children: "Subscription" })] }
              ),

              _jsxs(TouchableOpacity, {
                style: styles.menuItem,
                onPress: () => router.push('/(tabs)/refer-earn'), children: [

                _jsx(Image, {
                  source: require('@/oysloe-assets/side menu/refer and earn.png'),
                  style: styles.menuIcon }
                ),
                _jsx(Text, { style: styles.menuText, children: "Refer & Earn" })] }
              )] }
            ),


            _jsxs(View, { style: styles.section, children: [
              _jsx(Text, { style: styles.sectionTitle, children: "Settings" }),

              _jsxs(TouchableOpacity, {
                style: styles.menuItem,
                onPress: () => router.push('/(tabs)/feedback'), children: [

                _jsx(Image, {
                  source: require('@/oysloe-assets/side menu/feedback.png'),
                  style: styles.menuIcon }
                ),
                _jsx(Text, { style: styles.menuText, children: "Feedback" })] }
              ),


              _jsxs(TouchableOpacity, {
                style: styles.menuItem,
                onPress: () => router.push('/edit-profile'), children: [

                _jsx(Image, {
                  source: require('@/oysloe-assets/side menu/account.png'),
                  style: styles.menuIcon }
                ),
                _jsx(Text, { style: styles.menuText, children: "Account" })] }
              ),


              _jsxs(TouchableOpacity, { style: styles.menuItem, onPress: () => router.push('/(tabs)/terms-and-conditions'), children: [
                _jsx(Image, {
                  source: require('@/oysloe-assets/side menu/privacypolicy.png'),
                  style: styles.menuIcon }
                ),
                _jsx(Text, { style: styles.menuText, children: "T&C" })] }
              ),


              _jsxs(TouchableOpacity, { style: styles.menuItem, onPress: () => router.push('/(tabs)/privacy-policy'), children: [
                _jsx(Image, {
                  source: require('@/oysloe-assets/side menu/terms and conditions.png'),
                  style: styles.menuIcon }
                ),
                _jsx(Text, { style: styles.menuText, children: "Privacy Policy" })] }
              )] }
            )] }
          )] }

        ) }
      )] }
    ));

}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
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
      height: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10
  },
  drawerContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 50,
    overflow: 'hidden'
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 30
  },
  logoutIcon: {
    width: 20,
    height: 20,
    marginRight: 8
  },
  logoutText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 30
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
    backgroundColor: '#f0f0f0'
  },
  avatar: {
    width: 60,
    height: 60
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8
  },
  coverStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ECDC4',
    marginRight: 6
  },
  coverStatus: {
    fontSize: 14,
    color: '#666'
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginTop: 8
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 3
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: '#666'
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 12
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: '#333'
  },
  menuText: {
    fontSize: 16,
    color: '#333'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    maxWidth: 400
  },
  modalIcon: {
    width: 60,
    height: 60,
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    width: '100%'
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center'
  },
  modalButtonYes: {
    backgroundColor: '#f0f0f0'
  },
  modalButtonYesText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600'
  },
  modalButtonClose: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  modalButtonCloseText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600'
  }
});