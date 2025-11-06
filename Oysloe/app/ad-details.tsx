import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Dimensions, TextInput, Image as RNImage } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReviewsBox from './components/ReviewsBox';

const { width } = Dimensions.get('window');

type Message = { author: string; text: string };

export default function AdDetailsScreen() {
  const router = useRouter();
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const aggregatedReviews = { averageRating: 4.2, totalReviews: 12 };

  const similarAds = [
    { id: '1', image: require('@/oysloe-assets/Ad images/3d-car-city-street.jpg'), title: 'Modern house', location: 'Santamaria', price: '120' },
    { id: '2', image: require('@/oysloe-assets/Ad images/storey.png'), title: 'Spacious interior', location: 'Kotobabi', price: '1,670,000' }
  ];

  function onSendMessage() {
    if (chatInput.trim()) {
      setChatMessages((s) => [...s, { author: 'me', text: chatInput }]);
      setChatInput('');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
            <Text style={styles.backLabel}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mainImageContainer}>
          <Image source={require('@/oysloe-assets/Ad images/3d-car-city-street.jpg')} style={styles.mainImage} contentFit="cover" />
          <View style={styles.imageOverlayBadge}>
            <Text style={styles.overlayText}>1.5x</Text>
          </View>
          <View style={styles.paginationContainer}>
            <Text style={styles.paginationText}>2/4</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.locationRow}>
            <Image source={require('@/oysloe-assets/Ad details screen/map.png')} style={styles.locationIcon} />
            <Text style={styles.locationText}>Lashibi, Accra</Text>
          </View>
          <Text style={styles.productTitle}>Six bedroom apartment boys quarters self compound</Text>

          <View style={styles.pricingRow}>
            <View style={styles.pricingOption}>
              <RNImage source={require('@/oysloe-assets/Ad details screen/Pricing filter.png')} style={styles.cediIcon} />
              <Text style={styles.pricingAmount}>120</Text>
              <Text style={styles.pricingPeriod}>Daily</Text>
            </View>
            <View style={styles.pricingOption}>
              <RNImage source={require('@/oysloe-assets/Ad details screen/Pricing filter.png')} style={styles.cediIcon} />
              <Text style={styles.pricingAmount}>720</Text>
              <Text style={styles.pricingPeriod}>Weekly</Text>
            </View>
            <View style={styles.pricingOption}>
              <RNImage source={require('@/oysloe-assets/Ad details screen/Pricing filter.png')} style={styles.cediIcon} />
              <Text style={styles.pricingAmount}>65,000</Text>
              <Text style={styles.pricingPeriod}>Monthly</Text>
            </View>
          </View>

          <View style={styles.specificationsSection}>
            <View style={styles.specRow}>
              <View style={styles.specBullet} />
              <Text style={styles.specText}><Text style={styles.specLabel}>State </Text><Text style={styles.specValue}>Brand new</Text></Text>
            </View>
            <View style={styles.specRow}>
              <View style={styles.specBullet} />
              <Text style={styles.specText}><Text style={styles.specLabel}>Manufacturer </Text><Text style={styles.specValue}>Volkswagen</Text></Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <ReviewsBox aggregatedReviews={aggregatedReviews} />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sellerHeaderRow}>
            <Text style={styles.sellerName}>Elektromart Gh Ltd</Text>
            <View style={styles.highLevelTag}>
              <View style={styles.highLevelBadge} />
              <Text style={styles.highLevelText}>High Level</Text>
            </View>
          </View>
          <View style={styles.sellerAdsPreview}>
            <RNImage source={require('@/oysloe-assets/Ad details screen/editreview.png')} style={styles.sellerAdImage} />
            <RNImage source={require('@/oysloe-assets/Ad details screen/flag.png')} style={styles.sellerAdImage} />
            <RNImage source={require('@/oysloe-assets/Ad images/storey.png')} style={styles.sellerAdImage} />
            <TouchableOpacity style={styles.sellerAdsButton}>
              <Text style={styles.sellerAdsText}>Seller ads</Text>
              <RNImage source={require('@/oysloe-assets/Ads/sold.svg')} style={styles.sellerAdsArrow} />
              <Text style={styles.sellerAdsCount}>12</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Quick Chat</Text>
          <View style={styles.chatList}>
            {chatMessages.map((m, i) => (
              <View key={i} style={[styles.chatBubble, m.author === 'me' ? styles.chatRight : styles.chatLeft]}>
                <Text style={styles.chatText}>{m.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.chatInputRow}>
            <TextInput style={styles.chatInput} placeholder="Start a chat" value={chatInput} onChangeText={setChatInput} onSubmitEditing={onSendMessage} />
            <TouchableOpacity onPress={onSendMessage} style={styles.sendBtn}>
              <RNImage source={require('@/oysloe-assets/Ad details screen/send.png')} style={styles.sendIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.similarAdsSection}>
          <Text style={styles.sectionTitle}>Similar Ads</Text>
          <View style={styles.similarAdsList}>
            {similarAds.map((ad) => (
              <View key={ad.id} style={styles.similarAdCard}>
                <Image source={ad.image} style={styles.similarAdImage} />
                <Text style={styles.similarAdTitle}>{ad.title}</Text>
                <Text style={styles.similarAdLocationText}>{ad.location}</Text>
                <Text style={styles.similarAdPrice}>{ad.price}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  scrollView: { paddingBottom: 20 },
  header: { padding: 12, backgroundColor: '#fff' },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backText: { fontSize: 18, marginRight: 8 },
  backLabel: { fontSize: 16 },

  mainImageContainer: { width: '100%', height: width * 0.6, backgroundColor: '#fff', justifyContent: 'center' },
  mainImage: { width: '100%', height: '100%' },
  imageOverlayBadge: { position: 'absolute', top: 18, right: 18, backgroundColor: '#f4f4f4aa', borderRadius: 16, paddingHorizontal: 8, paddingVertical: 4 },
  overlayText: { fontSize: 12, color: '#374957', fontWeight: '500' },
  paginationContainer: { position: 'absolute', bottom: 12, right: 12, backgroundColor: '#ffffffcc', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  paginationText: { fontSize: 12, color: '#374957' },

  sectionCard: { backgroundColor: '#fff', margin: 10, borderRadius: 12, padding: 12 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  locationIcon: { width: 12, height: 12, marginRight: 8 },
  locationText: { fontSize: 13, color: '#504e4e', fontWeight: '500' },
  productTitle: { fontSize: 18, fontWeight: '500', color: '#374957', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '500', color: '#374957', marginBottom: 12 },

  pricingRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginBottom: 12 },
  pricingOption: { flex: 1, alignItems: 'center' },
  cediIcon: { width: 12, height: 12, marginBottom: 4 },
  pricingAmount: { fontSize: 20, fontWeight: '600', color: '#374957' },
  pricingPeriod: { fontSize: 12, color: '#374957', marginTop: 2 },

  specificationsSection: { marginTop: 6, marginBottom: 6 },
  specRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  specBullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#374957', marginRight: 8 },
  specText: { fontSize: 13, color: '#374957' },
  specLabel: { fontWeight: '600' },
  specValue: { fontWeight: '400' },

  chatList: { maxHeight: 150, marginBottom: 8 },
  chatBubble: { borderRadius: 16, padding: 10, marginVertical: 4, maxWidth: '80%' },
  chatLeft: { alignSelf: 'flex-start', backgroundColor: '#eee' },
  chatRight: { alignSelf: 'flex-end', backgroundColor: '#dfefff' },
  chatText: { color: '#333' },
  chatInputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  chatInput: { flex: 1, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#e6e6e6' },
  sendBtn: { paddingLeft: 8 },
  sendIcon: { width: 28, height: 28 },

  sellerHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sellerName: { fontSize: 16, fontWeight: '600', color: '#374957', flex: 1 },
  highLevelTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#74ffa7', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  highLevelBadge: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#374957', marginRight: 6 },
  highLevelText: { fontSize: 10, color: '#374957' },
  sellerAdsPreview: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  sellerAdImage: { width: 50, height: 50, borderRadius: 8, marginRight: 8 },
  sellerAdsButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6 },
  sellerAdsText: { fontSize: 14, fontWeight: '500', marginRight: 8 },
  sellerAdsArrow: { width: 12, height: 12, marginRight: 8 },
  sellerAdsCount: { fontSize: 12, fontWeight: '600' },

  similarAdsSection: { paddingHorizontal: 10 },
  similarAdsList: { flexDirection: 'column' },
  similarAdCard: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10 },
  similarAdImage: { width: '100%', height: 100, borderRadius: 8, marginBottom: 8 },
  similarAdTitle: { fontSize: 14, fontWeight: '600' },
  similarAdLocationText: { fontSize: 12, color: '#666' },
  similarAdPrice: { fontSize: 14, fontWeight: '700', marginTop: 6 }
});