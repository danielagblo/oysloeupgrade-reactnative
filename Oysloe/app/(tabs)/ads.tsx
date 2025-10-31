import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, Modal } from 'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const STATUS_TABS = [
{ key: 'active', label: 'Active', icon: require('@/oysloe-assets/Ads/active.png') },
{ key: 'pending', label: 'Pending', icon: require('@/oysloe-assets/Ads/pending.png') },
{ key: 'taken', label: 'Taken', icon: require('@/oysloe-assets/Ads/sold.png') },
{ key: 'suspended', label: 'Suspended', icon: require('@/oysloe-assets/Ads/suspend (2).png') }];














export default function AdsScreen() {
  const { initialTab } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState(
    initialTab || 'active'
  );
  const [selectedAdId, setSelectedAdId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const [ads, setAds] = useState([
  {
    id: 'a1',
    title: 'Mercedes Benz S CLASS 2023',
    price: '023,000',
    image: require('@/oysloe-assets/Ad images/grey-ocar.png'),
    status: 'active',
    clicks: 20,
    impressions: 2
  },
  {
    id: 'a2',
    title: 'Mercedes Benz S CLASS 2023',
    price: '023,000',
    image: require('@/oysloe-assets/Ad images/nice-inside.png'),
    status: 'active',
    clicks: 20,
    impressions: 2
  }]
  );

  const filteredAds = useMemo(
    () => ads.filter((ad) => ad.status === selectedTab),
    [ads, selectedTab]
  );

  function markAsTaken(adId) {
    if (!adId) return;
    setAds((prev) => prev.map((a) => a.id === adId ? { ...a, status: 'taken' } : a));
    setSelectedTab('taken');
    setSelectedAdId(adId);
  }
  function doDeleteAd(adId) {
    if (!adId) return;
    setAds((prev) => prev.filter((a) => a.id !== adId));
    setSelectedAdId(null);
    setShowDeleteModal(false);
    setPendingDeleteId(null);
  }
  function deleteAd(adId) {
    if (!adId) return;
    setPendingDeleteId(adId);
    setShowDeleteModal(true);
  }
  function suspendAd(adId) {
    if (!adId) return;
    setAds((prev) => prev.map((a) => a.id === adId ? { ...a, status: 'suspended' } : a));
    setSelectedTab('suspended');
    setSelectedAdId(adId);
  }

  function moveTo(adId, status) {
    setAds((prev) => prev.map((a) => a.id === adId ? { ...a, status } : a));
    setSelectedTab(status);
    setSelectedAdId(adId);
  }

  return (
    _jsxs(SafeAreaView, { style: styles.safe, children: [
      _jsxs(View, { style: styles.container, children: [
        _jsxs(View, { style: styles.header, children: [
          _jsxs(TouchableOpacity, { onPress: () => router.back(), style: styles.backButton, children: [
            _jsx(Text, { style: styles.backText, children: "\u2190" }),
            _jsx(Text, { style: styles.backLabel, children: "Back" })] }
          ),
          _jsx(Text, { style: styles.headerTitle, children: "Ads" }),
          _jsx(View, { style: { width: 44 } })] }
        ),
        _jsx(View, { style: styles.tabsRow, children:
          STATUS_TABS.map((t) => {
            const isActive = selectedTab === t.key;
            return (
              _jsxs(TouchableOpacity, {

                style: [styles.tabPill, isActive && styles.tabPillActive],
                onPress: () => {setSelectedTab(t.key);setSelectedAdId(null);}, children: [

                _jsx(Image, { source: t.icon, style: styles.tabIcon }),
                _jsx(Text, { style: [styles.tabLabel, isActive && styles.tabLabelActive], children: t.label })] }, t.key
              ));

          }) }
        ),

        filteredAds.length === 0 ?
        _jsxs(View, { style: styles.emptyState, children: [
          _jsx(Image, {
            source: require("@/oysloe-assets/Ad details screen/no.png"),
            style: styles.emptyImage,
            contentFit: "contain" }
          ),
          _jsxs(Text, { style: styles.emptyText, children: [
            selectedTab === 'active' && 'No Active Ads',
            selectedTab === 'pending' && 'No Pending Ads',
            selectedTab === 'taken' && 'No Taken Ads',
            selectedTab === 'suspended' && 'No Suspended Ads'] }
          )] }
        ) :

        _jsx(FlatList, {
          data: filteredAds,
          keyExtractor: (item) => item.id,
          renderItem: ({ item, index }) =>
          _jsxs(View, { children: [
            _jsxs(TouchableOpacity, { activeOpacity: 0.9, onPress: () => setSelectedAdId(item.id), style: styles.card, children: [
              _jsx(Image, { source: item.image, style: styles.cardImage, contentFit: "cover" }),
              _jsxs(View, { style: styles.cardBody, children: [
                _jsxs(View, { style: styles.metricsRow, children: [
                  _jsxs(Text, { style: styles.metricText, children: ["\u2022 ", item.clicks, " clicks"] }),
                  _jsxs(Text, { style: styles.metricText, children: ["\u2022 ", item.impressions, "k impressions"] })] }
                ),
                _jsx(Text, { style: styles.cardTitle, numberOfLines: 1, children: item.title }),
                _jsxs(Text, { style: styles.cardPrice, children: ["\xA2 ", item.price] })] }
              ),
              index === 0 ?
              _jsx(TouchableOpacity, { style: styles.dotMenu, children:
                _jsx(Text, { style: styles.dotMenuText, children: "\u22EF" }) }
              ) :

              _jsx(TouchableOpacity, { style: styles.closeBtn, children:
                _jsx(Text, { style: styles.closeBtnText, children: "\xD7" }) }
              )] }

            ),
            selectedAdId === item.id &&
            _jsxs(View, { style: styles.inlineActionsRow, children: [
              STATUS_TABS.filter((s) => s.key !== item.status).map((s) =>
              _jsx(TouchableOpacity, { style: styles.actionBtn, onPress: () => moveTo(item.id, s.key), children:
                _jsx(Text, { style: styles.actionText, children: s.label }) }, s.key
              )
              ),
              _jsx(TouchableOpacity, { style: styles.actionBtn, onPress: () => deleteAd(item.id), children:
                _jsx(Text, { style: styles.actionText, children: "Delete" }) }
              )] }
            )] }

          ),

          contentContainerStyle: styles.listContent }
        )] }

      ),

      _jsx(Modal, {
        visible: showDeleteModal,
        transparent: true,
        animationType: "fade",
        onRequestClose: () => setShowDeleteModal(false), children:

        _jsx(View, { style: styles.modalBackDrop, children:
          _jsxs(View, { style: styles.modalBox, children: [
            _jsx(Text, { style: styles.modalTitle, children: "Delete Ad?" }),
            _jsx(Text, { style: styles.modalDesc, children: "Are you sure you want to delete this ad? This cannot be undone." }),
            _jsxs(View, { style: styles.modalActionRow, children: [
              _jsx(TouchableOpacity, { style: styles.modalCancelBtn, onPress: () => setShowDeleteModal(false), children:
                _jsx(Text, { style: styles.modalCancelText, children: "Cancel" }) }
              ),
              _jsx(TouchableOpacity, { style: styles.modalDeleteBtn, onPress: () => doDeleteAd(pendingDeleteId), children:
                _jsx(Text, { style: styles.modalDeleteText, children: "Delete" }) }
              )] }
            )] }
          ) }
        ) }
      )] }
    ));

}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8f9fb' },
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingTop: 8, paddingBottom: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eef0f2' },
  backButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingRight: 8 },
  backText: { color: '#9aa3af', marginRight: 4 },
  backLabel: { color: '#9aa3af' },
  headerTitle: { fontSize: 16, color: '#111827', fontWeight: '600' },
  tabsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 12, paddingTop: 10, paddingBottom: 8, backgroundColor: 'transparent' },
  tabPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: '#f3f4f6', borderWidth: 1, borderColor: '#e6e8eb', shadowColor: '#000', shadowOpacity: 0.03, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 },
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

  modalBackDrop: {
    flex: 1,
    backgroundColor: 'rgba(30,35,38,0.35)',
    alignItems: 'center',
    justifyContent: 'center'
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
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#c21522'
  },
  modalDesc: {
    color: '#121212',
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center'
  },
  modalActionRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end'
  },
  modalCancelBtn: {
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 12
  },
  modalCancelText: {
    color: '#181818',
    fontWeight: '700',
    fontSize: 15
  },
  modalDeleteBtn: {
    backgroundColor: '#c21522',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18
  },
  modalDeleteText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15
  }
});