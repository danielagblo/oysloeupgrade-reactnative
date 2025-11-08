import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router } from 'expo-router';

export default function AccountDeleteScreen() {
  const reasons = useMemo(() => [
    'Your friend sign up using your link',
    'I have another account',
    'I don\'t find it useful',
    'Privacy concerns',
    'Too many notifications',
    'I\'m taking a break'
  ], []);

  const [selectedReason, setSelectedReason] = useState<string | 'Other' | null>(null);
  const [otherText, setOtherText] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showScheduled, setShowScheduled] = useState(false);

  const onDeletePress = () => {
    setShowConfirm(true);
  };

  const onConfirmClose = () => {
    setShowConfirm(false);
  };

  const onConfirmRemove = () => {
    setShowConfirm(false);
    setShowScheduled(true);
  };

  const onReactivate = () => {
    setShowScheduled(false);
    alert('Account successfully reactivated');
  };

  const onCloseFinal = () => {
    setShowScheduled(false);
    alert('Account successfully deleted');
    router.replace('/login');
  };

  const showOtherBox = selectedReason === 'Other';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>{'\u2190 Back'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Delete account</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Delete Account</Text>
          <Text style={styles.subtitle}>If you want to delete your account and you're prompted to provide a reason for deleting.</Text>

          <View style={styles.card}>
            {reasons.map((label, index) => (
              <TouchableOpacity key={index} style={styles.optionRow} activeOpacity={0.8} onPress={() => setSelectedReason(label)}>
                <View style={styles.radioOuter}>{selectedReason === label && <View style={styles.radioInner} />}</View>
                <Text style={styles.optionText}>{label}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.optionRow} activeOpacity={0.8} onPress={() => setSelectedReason('Other')}>
              <View style={styles.radioOuter}>{showOtherBox && <View style={styles.radioInner} />}</View>
              <Text style={styles.optionText}>Other</Text>
            </TouchableOpacity>

            {showOtherBox && (
              <View style={styles.textAreaWrapper}>
                <TextInput
                  placeholder="Write a reason"
                  placeholderTextColor="#97A3AE"
                  style={styles.textArea}
                  multiline
                  value={otherText}
                  onChangeText={setOtherText}
                  textAlignVertical="top"
                />
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.9} onPress={onDeletePress}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={showConfirm} transparent animationType="fade" onRequestClose={onConfirmClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Image source={require('@/oysloe-assets/Ad details screen/Green shield.png')} style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, styles.modalPrimary]} onPress={onConfirmRemove}>
                <Text style={styles.modalPrimaryText}>Yes remove</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.modalGhost]} onPress={onConfirmClose}>
                <Text style={styles.modalGhostText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showScheduled} transparent animationType="fade" onRequestClose={() => setShowScheduled(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Image source={require('@/oysloe-assets/Ads/success.png')} style={styles.modalSuccessIcon} />
            <Text style={styles.modalTitleCenter}>Your account to be removed in 60 days</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, styles.modalPrimary]} onPress={onReactivate}>
                <Text style={styles.modalPrimaryText}>Re-activate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.modalGhost]} onPress={onCloseFinal}>
                <Text style={styles.modalGhostText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7f9' },
  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  backBtn: { position: 'absolute', left: 16, height: '100%', justifyContent: 'center' },
  backText: { fontSize: 14, color: '#636060cf' },
  headerTitle: { fontSize: 16, color: '#222', fontWeight: '600' },

  content: { padding: 16 },
  title: { fontSize: 14, fontWeight: '700', color: '#374957', marginBottom: 6 },
  subtitle: { fontSize: 11, color: '#7d8b96', lineHeight: 16, marginBottom: 12 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eef1f4'
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5'
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#c9d2db',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioInner: { width: 9, height: 9, borderRadius: 4.5, backgroundColor: '#111' },
  optionText: { fontSize: 12, color: '#6a727a' },

  textAreaWrapper: {
    marginHorizontal: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e6ecf1',
    borderRadius: 12,
    backgroundColor: '#fff'
  },
  textArea: {
    minHeight: 90,
    padding: 12,
    fontSize: 12,
    color: '#1e2d38'
  },

  deleteBtn: {
    marginTop: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  deleteText: { fontSize: 16, color: '#374957', fontWeight: '600' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  modalCard: { width: '82%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 18, padding: 22, alignItems: 'center' },
  modalIcon: { width: 60, height: 60, marginBottom: 14 },
  modalSuccessIcon: { width: 70, height: 70, marginBottom: 14 },
  modalTitle: { fontSize: 18, fontWeight: '600', color: '#1e2d38', marginBottom: 12 },
  modalTitleCenter: { fontSize: 16, fontWeight: '600', color: '#1e2d38', marginBottom: 12, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', gap: 10, width: '100%', marginTop: 8 },
  modalBtn: { flex: 1, paddingVertical: 12, borderRadius: 24, alignItems: 'center' },
  modalPrimary: { backgroundColor: '#f0f0f0' },
  modalPrimaryText: { color: '#333', fontWeight: '600' },
  modalGhost: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e0e0e0' },
  modalGhostText: { color: '#333', fontWeight: '600' }
});
