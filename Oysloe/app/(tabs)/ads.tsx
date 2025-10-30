import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, Modal } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';

const STATUS_TABS = [
  { key: 'active', label: 'Active', icon: require('@/oysloe-assets/Ads/active.png') },
  { key: 'pending', label: 'Pending', icon: require('@/oysloe-assets/Ads/pending.png') },
  { key: 'taken', label: 'Taken', icon: require('@/oysloe-assets/Ads/sold.png') },
  { key: 'suspended', label: 'Suspended', icon: require('@/oysloe-assets/Ads/suspend (2).png') },
] as const;

type StatusKey = typeof STATUS_TABS[number]['key'];

type AdItem = {
  id: string;
  title: string;
  price: string;
  image: any;
  status: StatusKey;
  clicks: number;
  impressions: number;
};

export default function AdsScreen() {
  const { initialTab } = useLocalSearchParams<{ initialTab?: string }>();
  const [selectedTab, setSelectedTab] = useState<StatusKey>(
    (initialTab as StatusKey) || 'active'
  );
  const [selectedAdId, setSelectedAdId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [ads, setAds] = useState<AdItem[]>([
    {
      id: 'a1',
      title: 'Mercedes Benz S CLASS 2023',
      price: '023,000',
      image: require('@/oysloe-assets/Ad images/grey-ocar.png'),
      status: 'active',
      clicks: 20,
      impressions: 2,
    },
    {
      id: 'a2',
      title: 'Mercedes Benz S CLASS 2023',
      price: '023,000',
      image: require('@/oysloe-assets/Ad images/nice-inside.png'),
      status: 'active',
      clicks: 20,
      impressions: 2,
    },
  ]);

  const filteredAds = useMemo(
    () => ads.filter((ad) => ad.status === selectedTab),
    [ads, selectedTab]
  );

  function markAsTaken(adId: string | null) {
    if (!adId) return;
    setAds((prev) => prev.map((a) => (a.id === adId ? { ...a, status: 'taken' } : a)));
    setSelectedTab('taken');
    setSelectedAdId(adId);
  }
  function doDeleteAd(adId: string | null) {
    if (!adId) return;
    setAds((prev) => prev.filter((a) => a.id !== adId));
    setSelectedAdId(null);
    setShowDeleteModal(false);
    setPendingDeleteId(null);
  }
  function deleteAd(adId: string | null) {
    if (!adId) return;
    setPendingDeleteId(adId);
    setShowDeleteModal(true);
  }
  function suspendAd(adId: string | null) {
    if (!adId) return;
    setAds((prev) => prev.map((a) => (a.id === adId ? { ...a, status: 'suspended' } : a)));
    setSelectedTab('suspended');
    setSelectedAdId(adId);
  }

  function moveTo(adId: string, status: StatusKey) {
    setAds((prev) => prev.map((a) => (a.id === adId ? { ...a, status } : a)));
    setSelectedTab(status);
    setSelectedAdId(adId);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
      <View style={styles.tabsRow}>
        {STATUS_TABS.map((t) => {
          const isActive = selectedTab === t.key;
          return (
            <TouchableOpacity
              key={t.key}
              style={[styles.tabPill, isActive && styles.tabPillActive]}
              onPress={() => { setSelectedTab(t.key); setSelectedAdId(null); }}
            >
              <Image source={t.icon} style={styles.tabIcon} />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{t.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {filteredAds.length === 0 ? (
        <View style={styles.emptyState}>
          <Image
            source={require('@/app/no.png')}
            style={styles.emptyImage}
            contentFit="contain"
          />
          <Text style={styles.emptyText}>
            {selectedTab === 'active' && 'No Active Ads'}
            {selectedTab === 'pending' && 'No Pending Ads'}
            {selectedTab === 'taken' && 'No Taken Ads'}
            {selectedTab === 'suspended' && 'No Suspended Ads'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredAds}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity activeOpacity={0.9} onPress={() => setSelectedAdId(item.id)} style={styles.card}>
                <Image source={item.image} style={styles.cardImage} contentFit="cover" />
                <View style={styles.cardBody}>
                  <View style={styles.metricsRow}>
                    <Text style={styles.metricText}>• {item.clicks} clicks</Text>
                    <Text style={styles.metricText}>• {item.impressions}k impressions</Text>
                  </View>
                  <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.cardPrice}>¢ {item.price}</Text>
                </View>
                {index === 0 ? (
                  <TouchableOpacity style={styles.dotMenu}>
                    <Text style={styles.dotMenuText}>⋯</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.closeBtn}>
                    <Text style={styles.closeBtnText}>×</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
              {(selectedAdId === item.id) && (
                <View style={styles.inlineActionsRow}>
                  {STATUS_TABS.filter((s) => s.key !== item.status).map((s) => (
                    <TouchableOpacity key={s.key} style={styles.actionBtn} onPress={() => moveTo(item.id, s.key)}>
                      <Text style={styles.actionText}>{s.label}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity style={styles.actionBtn} onPress={() => deleteAd(item.id)}>
                    <Text style={styles.actionText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
      </View>
      {/* Delete confirmation modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalBackDrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Delete Ad?</Text>
            <Text style={styles.modalDesc}>Are you sure you want to delete this ad? This cannot be undone.</Text>
            <View style={styles.modalActionRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowDeleteModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalDeleteBtn} onPress={() => doDeleteAd(pendingDeleteId)}>
                <Text style={styles.modalDeleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8f9fb' },
  container: { flex: 1 },
  tabsRow: { flexDirection: 'row', gap: 6, paddingHorizontal: 8, paddingTop: 8, paddingBottom: 6, backgroundColor: 'transparent' },
  tabPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, backgroundColor: '#f1f5f9', borderWidth: 1, borderColor: '#e5e7eb' },
  tabPillActive: { backgroundColor: '#CFFAEA', borderColor: '#A7F3D0' },
  tabIcon: { width: 12, height: 12, marginRight: 4 },
  tabLabel: { fontSize: 10, color: '#6b7280' },
  tabLabelActive: { color: '#065f46', fontWeight: '600' },

  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyImage: { width: 140, height: 140, marginBottom: 10 },
  emptyText: { color: '#1f2937', fontSize: 14 },

  listContent: { paddingHorizontal: 12, paddingTop: 8, paddingBottom: 140 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#eef0f2' },
  cardImage: { width: 64, height: 64, borderRadius: 8, marginRight: 10 },
  cardBody: { flex: 1 },
  metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 2 },
  metricText: { color: '#9ca3af', fontSize: 11 },
  cardTitle: { color: '#111827', fontSize: 13, fontWeight: '600' },
  cardPrice: { color: '#111827', fontSize: 12, marginTop: 2 },
  dotMenu: { paddingHorizontal: 8, paddingVertical: 4 },
  dotMenuText: { fontSize: 18, color: '#6b7280' },
  closeBtn: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  closeBtnText: { color: '#6b7280', fontSize: 14, lineHeight: 16 },

  inlineActionsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 8, paddingVertical: 8, backgroundColor: 'transparent' },
  actionBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#f3f4f6', borderRadius: 10, borderWidth: 1, borderColor: '#e5e7eb' },
  actionText: { color: '#6b7280', fontSize: 13, fontWeight: '600', textAlign: 'center' },
  disabledBtn: { opacity: 0.4 },
  disabledText: { color: '#9ca3af' },
  // Modal styles:
  modalBackDrop: {
    flex: 1,
    backgroundColor: 'rgba(30,35,38,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 22,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 3 },
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#c21522',
  },
  modalDesc: {
    color: '#121212',
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActionRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  modalCancelBtn: {
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 12,
  },
  modalCancelText: {
    color: '#181818',
    fontWeight: '700',
    fontSize: 15,
  },
  modalDeleteBtn: {
    backgroundColor: '#c21522',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  modalDeleteText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});


