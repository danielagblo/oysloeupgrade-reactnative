import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Dimensions, TextInput, Image as RNImage } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const vw = (percent: number) => (width * percent) / 100;
const vh = (percent: number) => (height * percent) / 100;

type Message = { author: string; text: string };

export default function AdDetailsScreen() {
  const router = useRouter();
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const chatScrollRef = useRef<ScrollView>(null);
  const chatInputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    if (chatMessages.length > 0) {
      setTimeout(() => {
        chatScrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [chatMessages]);

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
          <Image source={require('@/oysloe-assets/Ad images/storey.png')} style={styles.mainImage} contentFit="cover" />
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
              <Text style={styles.pricingAmount}>₵ 120</Text>
              <Text style={styles.pricingPeriod}>Daily 3xmns</Text>
            </View>
            <View style={styles.pricingOption}>
              <Text style={styles.pricingAmount}>₵ 720</Text>
              <Text style={styles.pricingPeriod}>Weekly 4xmns</Text>
            </View>
            <View style={styles.pricingOption}>
              <Text style={styles.pricingAmount}>₵ 65,000</Text>
              <Text style={styles.pricingPeriod}>Monthly 6x mns</Text>
            </View>
          </View>

          <View style={styles.specificationsSection}>
            <View style={styles.specRow}>
              <Text style={styles.specBullet}>•</Text>
              <View style={styles.specContent}>
                <Text style={styles.specLabel}>State </Text>
                <Text style={styles.specValue}>Brand new</Text>
              </View>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specBullet}>•</Text>
              <View style={styles.specContent}>
                <Text style={styles.specLabel}>Manufacturer </Text>
                <Text style={styles.specValue}>Volkswagen</Text>
              </View>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specBullet}>•</Text>
              <View style={styles.specContent}>
                <Text style={styles.specLabel}>Year make </Text>
                <Text style={styles.specValue}>2021</Text>
              </View>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specBullet}>•</Text>
              <View style={styles.specContent}>
                <Text style={styles.specLabel}>Model </Text>
                <Text style={styles.specValue}>Aud</Text>
              </View>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specBullet}>•</Text>
              <View style={styles.specContent}>
                <Text style={styles.specLabel}>Body color </Text>
                <Text style={styles.specValue}>Black</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.safetyTitle}>Safety tips</Text>
          <Text style={styles.safetySubtitle}>Follow this tips and report anything that feels off</Text>

          <View style={styles.safetyTipsList}>
            <View style={styles.safetyTipRow}>
              <Text style={styles.safetyBullet}>•</Text>
              <Text style={styles.safetyTipText}>Check the item carefully and ask relevant questions.</Text>
            </View>
            <View style={styles.safetyTipRow}>
              <Text style={styles.safetyBullet}>•</Text>
              <Text style={styles.safetyTipText}>Visit the company for actual agreement before applying.</Text>
            </View>
            <View style={styles.safetyTipRow}>
              <Text style={styles.safetyBullet}>•</Text>
              <Text style={styles.safetyTipText}>Do not make any payment in advance before applying.</Text>
            </View>
            <View style={styles.safetyTipRow}>
              <Text style={styles.safetyBullet}>•</Text>
              <Text style={styles.safetyTipText}>Report any ad or user seems fake, misleading, right away.</Text>
            </View>
            <View style={styles.safetyTipRow}>
              <Text style={styles.safetyBullet}>•</Text>
              <Text style={styles.safetyTipText}>Know when and how much you need to pay back in I total.</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtonsSection}>
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.actionButton} onPress={() => setIsTaken(!isTaken)}>
              <RNImage source={require('@/oysloe-assets/Ad details screen/Mark as taken.png')} style={styles.actionButtonIcon} />
              <Text style={styles.actionButtonText}>{isTaken ? 'Taken' : 'Mark as taken'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <RNImage source={require('@/oysloe-assets/Ad details screen/flag.png')} style={styles.actionButtonIcon} />
              <Text style={styles.actionButtonText}>Report user</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => setIsFavorited(!isFavorited)}>
              <RNImage
                source={
                  isFavorited
                    ? require('@/oysloe-assets/Ad details screen/favorited.png')
                    : require('@/oysloe-assets/Ad details screen/Not yet favorited.png')
                }
                style={styles.actionButtonIcon}
              />
              <Text style={styles.actionButtonText}>{isFavorited ? 'Favorited' : 'Favorite'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <RNImage source={require('@/oysloe-assets/Ad details screen/out going call.png')} style={styles.actionButtonIcon} />
              <Text style={styles.actionButtonText}>Caller 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <RNImage source={require('@/oysloe-assets/Ad details screen/out going call.png')} style={styles.actionButtonIcon} />
              <Text style={styles.actionButtonText}>Caller 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <RNImage source={require('@/oysloe-assets/Ad details screen/Make an offer.png')} style={styles.actionButtonIcon} />
              <Text style={styles.actionButtonText}>Make an offer</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.quickChatHeader}>
            <RNImage source={require('@/oysloe-assets/Ad details screen/quick chat.png')} style={styles.quickChatIcon} />
            <Text style={styles.sectionTitle}>Quick Chat</Text>
          </View>

          <View style={styles.quickMessageButtons}>
            <TouchableOpacity
              style={styles.quickMessageButton}
              onPress={() => {
                const text = 'Is this original?';
                setChatInput(text);
                chatInputRef.current?.focus();
              }}
            >
              <Text style={styles.quickMessageText}>Is this original?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickMessageButton}
              onPress={() => {
                const text = 'Do you have delivery?';
                setChatInput(text);
                chatInputRef.current?.focus();
              }}
            >
              <Text style={styles.quickMessageText}>Do you have delivery?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quickMessageButtons}>
            <TouchableOpacity
              style={styles.quickMessageButton}
              onPress={() => {
                const text = 'Can you confirm the condition?';
                setChatInput(text);
                chatInputRef.current?.focus();
              }}
            >
              <Text style={styles.quickMessageText}>Can you confirm the condition?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickMessageButton}
              onPress={() => {
                const text = 'Do you have delivery?';
                setChatInput(text);
                chatInputRef.current?.focus();
              }}
            >
              <Text style={styles.quickMessageText}>Do you have delivery?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chatMessagesContainer}>
            {chatMessages.length > 0 ? (
              <ScrollView
                ref={chatScrollRef}
                style={styles.chatList}
                contentContainerStyle={styles.chatListContent}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
              >
                {chatMessages.map((item, index) => (
                  <View key={index} style={[styles.chatBubble, item.author === 'me' ? styles.chatRight : styles.chatLeft]}>
                    <Text style={styles.chatText}>{item.text}</Text>
                  </View>
                ))}
              </ScrollView>
            ) : null}
          </View>

          <View style={styles.chatInputRow}>
            <View style={styles.chatInputWrapper}>
              <TextInput
                ref={chatInputRef}
                style={styles.chatInput}
                placeholder="Start a chat"
                value={chatInput}
                onChangeText={setChatInput}
                onSubmitEditing={onSendMessage}
              />
              <TouchableOpacity onPress={onSendMessage} style={styles.sendBtn}>
                <RNImage source={require('@/oysloe-assets/Ad details screen/send.png')} style={styles.sendIcon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.microphoneBtn}>
              <RNImage source={require('@/oysloe-assets/Ad details screen/Microphone.png')} style={styles.microphoneIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.chatSecurityRow}>
            <View style={styles.chatSecuredContainer}>
              <View style={styles.lockIconCircle}>
                <RNImage source={require('@/oysloe-assets/Ad details screen/lock.png')} style={styles.lockIcon} />
              </View>
              <Text style={styles.chatSecuredText}>Chat is secured</Text>
            </View>
            <View style={styles.safetyMessageContainer}>
              <RNImage source={require('@/oysloe-assets/Ad details screen/Shield2.png')} style={styles.shieldIcon} />
              <Text style={styles.safetyMessageText}>Always chat here for safety reasons!</Text>
            </View>
          </View>
        </View>

        <View style={styles.sellerSection}>
          <View style={styles.sellerHeaderRow}>
            <View style={styles.sellerLeftSection}>
              <Text style={styles.sellerName}>Elektromart Gh Ltd</Text>
              <View style={styles.highLevelBadge}>
                <RNImage source={require('@/oysloe-assets/Ad details screen/level.png')} style={styles.levelIcon} />
                <Text style={styles.highLevelText}>High Level</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.sellerAdsButton}>
              <Text style={styles.sellerAdsButtonText}>Seller ads</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sellerAdsImagesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sellerAdsScrollView} contentContainerStyle={styles.sellerAdsScrollContent}>
              <TouchableOpacity style={styles.sellerAdImageCard}>
                <RNImage source={require('@/oysloe-assets/Ad images/iphone.png')} style={styles.sellerAdImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.sellerAdImageCard}>
                <RNImage source={require('@/oysloe-assets/Ad images/car1.png')} style={styles.sellerAdImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.sellerAdImageCard}>
                <RNImage source={require('@/oysloe-assets/Ad images/car2.png')} style={styles.sellerAdImage} />
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={styles.nextButton}>
              <RNImage source={require('@/oysloe-assets/Ad images/next.png')} style={styles.nextIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.sellerProfileSection}>
            <View style={styles.sellerAvatarContainer}>
              <RNImage source={require('@/oysloe-assets/Ad images/guy.jpg')} style={styles.sellerAvatar} />
              <View style={styles.sellerTagOverlay}>
                <RNImage source={require('@/oysloe-assets/Ad details screen/seller-tag.png')} style={styles.sellerTagIcon} />
              </View>
            </View>
            <View style={styles.sellerInfoTextContainer}>
              <Text style={styles.sellerJoinDate}>Jan, 2024</Text>
              <Text style={styles.sellerProfileName}>Alexander Kowri</Text>
              <Text style={styles.sellerTotalAds}>Total ads: 2k</Text>
            </View>
          </View>

          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <View style={styles.ratingLeftSection}>
                <Text style={styles.ratingNumber}>4.5</Text>
                <View style={styles.ratingStarsRow}>
                  <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={styles.ratingStarIcon} />
                  <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={styles.ratingStarIcon} />
                  <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={styles.ratingStarIcon} />
                  <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={styles.ratingStarIcon} />
                  <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={[styles.ratingStarIcon, styles.ratingStarIconHalf]} />
                </View>
                <Text style={styles.reviewsCount}>234 Reviews</Text>
              </View>

              <View style={styles.ratingBarsSection}>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <View key={stars} style={styles.ratingBarRow}>
                    <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={styles.barStarIcon} />
                    <Text style={styles.barStarNumber}>{stars}</Text>
                    <View style={styles.progressBarContainer}>
                      <View style={[styles.progressBarFill, { width: '50%' }]} />
                    </View>
                    <Text style={styles.barPercentage}>50%</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.reviewsFilterRow}>
              <TouchableOpacity style={[styles.reviewFilterButton, styles.reviewFilterButtonActive]}>
                <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={styles.filterStarIcon} />
                <Text style={[styles.reviewFilterText, styles.reviewFilterTextActive]}>All</Text>
              </TouchableOpacity>
              {[1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity key={num} style={styles.reviewFilterButton}>
                  <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={styles.filterStarIcon} />
                  <Text style={styles.reviewFilterText}>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.sellerReviewsButton}>
              <Text style={styles.sellerReviewsButtonText}>Seller reviews</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.similarAdsSection}>
          <Text style={styles.similarAdsTitle}>Similar Ads</Text>
          <View style={styles.similarAdsGrid}>
            <TouchableOpacity style={styles.similarAdCard}>
              <RNImage source={require('@/oysloe-assets/Ad images/storey.png')} style={styles.similarAdImage} />
              <View style={styles.similarAdLocationRow}>
                <RNImage source={require('@/oysloe-assets/Ad details screen/map.png')} style={styles.similarAdMapIcon} />
                <Text style={styles.similarAdLocation}>Santamaria-kotobabi</Text>
              </View>
              <Text style={styles.similarAdTitle} numberOfLines={1}>
                Samsung AQ ultra smart..
              </Text>
              <View style={styles.similarAdRatingRow}>
                <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={styles.similarAdStarIcon} />
                <Text style={styles.similarAdRating}>7</Text>
                <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={styles.similarAdStarIcon} />
                <Text style={styles.similarAdRating}>4</Text>
                <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={styles.similarAdStarIcon} />
                <Text style={styles.similarAdRating}>65.</Text>
              </View>
              <Text style={styles.similarAdPrice}>₵20 for 6 days</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.similarAdCard}>
              <RNImage source={require('@/oysloe-assets/Ad images/nice-inside.png')} style={styles.similarAdImage} />
              <View style={styles.similarAdLocationRow}>
                <RNImage source={require('@/oysloe-assets/Ad details screen/map.png')} style={styles.similarAdMapIcon} />
                <Text style={styles.similarAdLocation}>Santamaria-kotobabi</Text>
              </View>
              <Text style={styles.similarAdTitle} numberOfLines={1}>
                Samsung AQ ultra smart..
              </Text>
              <Text style={styles.similarAdPrice}>₵1,670,000</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.similarAdCard}>
              <RNImage source={require('@/oysloe-assets/Ad images/nice-inside.png')} style={styles.similarAdImage} />
              <View style={styles.similarAdLocationRow}>
                <RNImage source={require('@/oysloe-assets/Ad details screen/map.png')} style={styles.similarAdMapIcon} />
                <Text style={styles.similarAdLocation}>Santamaria-kotobabi</Text>
              </View>
              <Text style={styles.similarAdTitle} numberOfLines={1}>
                Samsung galaxy ultra 24..
              </Text>
              <View style={styles.similarAdRatingRow}>
                <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={styles.similarAdStarIcon} />
                <Text style={styles.similarAdRating}>1</Text>
                <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={styles.similarAdStarIcon} />
                <Text style={styles.similarAdRating}>7</Text>
                <RNImage source={require('@/oysloe-assets/Ad details screen/star.png')} style={styles.similarAdStarIcon} />
                <Text style={styles.similarAdRating}>65.</Text>
              </View>
              <Text style={styles.similarAdPrice}>₵1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.similarAdCard}>
              <RNImage source={require('@/oysloe-assets/Ad images/grey-ocar.png')} style={styles.similarAdImage} />
              <View style={styles.similarAdLocationRow}>
                <RNImage source={require('@/oysloe-assets/Ad details screen/map.png')} style={styles.similarAdMapIcon} />
                <Text style={styles.similarAdLocation}>Santamaria-kotobabi</Text>
              </View>
              <Text style={styles.similarAdTitle} numberOfLines={1}>
                Samsung AQ ultra smart..
              </Text>
              <Text style={styles.similarAdPrice}>₵1,670,000</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.similarAdCard}>
              <RNImage source={require('@/oysloe-assets/Ad images/3d-car-city-street.jpg')} style={styles.similarAdImage} />
              <View style={styles.similarAdLocationRow}>
                <RNImage source={require('@/oysloe-assets/Ad details screen/map.png')} style={styles.similarAdMapIcon} />
                <Text style={styles.similarAdLocation}>Santamaria-kotobabi</Text>
              </View>
              <Text style={styles.similarAdTitle} numberOfLines={1}>
                Samsung galaxy ultra 24..
              </Text>
              <Text style={styles.similarAdPrice}>₵1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.similarAdCard}>
              <RNImage source={require('@/oysloe-assets/Ad images/tv.jpg')} style={styles.similarAdImage} />
              <View style={styles.similarAdLocationRow}>
                <RNImage source={require('@/oysloe-assets/Ad details screen/map.png')} style={styles.similarAdMapIcon} />
                <Text style={styles.similarAdLocation}>Santamaria-kotobabi</Text>
              </View>
              <Text style={styles.similarAdTitle} numberOfLines={1}>
                Samsung AQ ultra smart..
              </Text>
              <Text style={styles.similarAdPrice}>₵1,670,000</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  scrollView: { paddingBottom: vh(0.5) },
  header: { padding: vw(3), backgroundColor: '#fff' },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backText: { fontSize: vw(4.5), marginRight: vw(2) },
  backLabel: { fontSize: vw(4) },

  mainImageContainer: { width: '100%', height: width * 0.6, backgroundColor: '#fff', justifyContent: 'center' },
  mainImage: { width: '100%', height: '100%' },
  imageOverlayBadge: {
    position: 'absolute',
    top: vh(2.5),
    left: vw(4),
    backgroundColor: '#74ffa7',
    borderRadius: vw(4),
    paddingHorizontal: vw(2.5),
    paddingVertical: vh(0.6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: vw(0.5) },
    shadowOpacity: 0.1,
    shadowRadius: vw(1),
    elevation: 3,
  },
  overlayText: {
    fontSize: vw(3.2),
    color: '#333333',
    fontWeight: '700',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: vh(1.5),
    right: vw(3),
    backgroundColor: '#ffffffcc',
    paddingHorizontal: vw(2),
    paddingVertical: vh(0.5),
    borderRadius: vw(2.5),
  },
  paginationText: { fontSize: vw(3), color: '#374957' },

  sectionCard: { backgroundColor: '#fff', margin: vh(1.2), borderRadius: vw(3), padding: vw(3) },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: vh(1) },
  locationIcon: { width: vw(4.5), height: vw(4.5), marginRight: vw(2) },
  locationText: { fontSize: vw(3.2), color: '#9ca3af', fontWeight: '400' },
  productTitle: { fontSize: vw(4.5), fontWeight: '600', color: '#1F2933', marginBottom: vh(1.5) },
  sectionTitle: { fontSize: vw(4), fontWeight: '600', color: '#374957', marginBottom: vh(1.5) },

  pricingRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: vh(1), marginBottom: vh(1.5) },
  pricingOption: { flex: 1, alignItems: 'center' },
  pricingAmount: { fontSize: vw(5.5), fontWeight: '700', color: '#1F2933' },
  pricingPeriod: { fontSize: vw(3), color: '#9ca3af', marginTop: vh(0.3), fontWeight: '400' },

  specificationsSection: { marginTop: vh(0.8), marginBottom: vh(0.8) },
  specRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: vh(0.8) },
  specBullet: { fontSize: vw(5), color: '#1F2933', marginRight: vw(2), marginTop: vh(0.1) },
  specContent: { flex: 1, flexDirection: 'row', flexWrap: 'wrap' },
  specLabel: { fontSize: vw(3.2), fontWeight: '600', color: '#1F2933' },
  specValue: { fontSize: vw(3.2), fontWeight: '400', color: '#9ca3af' },

  safetyTitle: { fontSize: vw(4.5), fontWeight: '600', color: '#1F2933', marginBottom: vh(0.5) },
  safetySubtitle: { fontSize: vw(3.2), fontWeight: '400', color: '#6b7280', marginBottom: vh(1.5) },
  safetyTipsList: { marginTop: vh(0.5) },
  safetyTipRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: vh(1) },
  safetyBullet: { fontSize: vw(5), color: '#1F2933', marginRight: vw(2), marginTop: vh(0.1) },
  safetyTipText: { flex: 1, fontSize: vw(3.2), fontWeight: '700', color: '#374957', lineHeight: vw(5) },

  actionButtonsSection: {
    paddingHorizontal: vw(5),
    paddingVertical: vh(1.5),
    gap: vh(1.5),
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vh(1.5),
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: vw(3),
    paddingVertical: vh(1.5),
    paddingHorizontal: vw(3),
    marginHorizontal: vw(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: vw(0.5) },
    shadowOpacity: 0.05,
    shadowRadius: vw(1),
    elevation: 1,
  },
  actionButtonIcon: {
    width: vw(5),
    height: vw(5),
    marginRight: vw(2),
    resizeMode: 'contain',
  },
  actionButtonText: {
    fontSize: vw(3.2),
    fontWeight: '600',
    color: '#374957',
  },

  quickChatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1.5),
  },
  quickChatIcon: {
    width: vw(5),
    height: vw(5),
    marginRight: vw(2),
    resizeMode: 'contain',
  },
  quickMessageButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: vh(1),
  },
  quickMessageButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: vw(3),
    paddingVertical: vh(1.2),
    paddingHorizontal: vw(3),
    marginHorizontal: vw(1),
    width: vw(44),
  },
  quickMessageText: {
    fontSize: vw(3.2),
    fontWeight: '400',
    color: '#6b7280',
    textAlign: 'center',
  },
  chatMessagesContainer: {
    minHeight: 0,
    maxHeight: vh(25),
    marginTop: vh(1),
    marginBottom: vh(1),
    paddingHorizontal: vw(2),
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingVertical: vh(0.5),
    flexGrow: 1,
  },
  chatBubble: { borderRadius: vw(4), padding: vw(2.5), marginVertical: vh(0.5), maxWidth: '80%' },
  chatLeft: { alignSelf: 'flex-start', backgroundColor: '#eee' },
  chatRight: { alignSelf: 'flex-end', backgroundColor: '#dfefff' },
  chatText: { fontSize: vw(3.5), color: '#333' },
  chatInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(1),
    marginBottom: vh(1.5),
  },
  chatInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: vw(8),
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: vw(3),
    paddingVertical: vh(1),
    marginRight: vw(2),
  },
  chatInput: {
    flex: 1,
    fontSize: vw(3.5),
    color: '#374957',
  },
  sendBtn: {
    padding: vw(1),
  },
  sendIcon: {
    width: vw(6),
    height: vw(6),
    resizeMode: 'contain',
  },
  microphoneBtn: {
    backgroundColor: '#fff',
    borderRadius: vw(8),
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: vw(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  microphoneIcon: {
    width: vw(5),
    height: vw(5),
    resizeMode: 'contain',
  },
  chatSecurityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(0.6),
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  chatSecuredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#74ffa7',
    borderRadius: vw(4),
    paddingVertical: vh(0.5),
    paddingRight: vw(2.5),
    marginRight: vw(2),
  },
  lockIconCircle: {
    width: vw(6),
    height: vw(6),
    borderRadius: vw(3),
    backgroundColor: '#74ffa7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(1.5),
  },
  lockIcon: {
    width: vw(3),
    height: vw(3),
    resizeMode: 'contain',
  },
  chatSecuredText: {
    fontSize: vw(3),
    fontWeight: '500',
    color: '#6b7280',
  },
  safetyMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shieldIcon: {
    width: vw(4),
    height: vw(4),
    marginRight: vw(1.5),
    resizeMode: 'contain',
  },
  safetyMessageText: {
    fontSize: vw(3),
    fontWeight: '400',
    color: '#6b7280',
  },

  sellerSection: {
    backgroundColor: '#fff',
    borderRadius: vw(3),
    padding: vw(4),
    marginBottom: vh(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: vw(0.5) },
    shadowOpacity: 0.05,
    shadowRadius: vw(2),
    elevation: 2,
  },
  sellerHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: vh(2),
  },
  sellerLeftSection: {
    flex: 1,
  },
  sellerName: {
    fontSize: vw(5),
    fontWeight: '600',
    color: '#1F2933',
    marginBottom: vh(1),
  },
  highLevelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#74ffa7',
    borderRadius: vw(4),
    paddingVertical: vh(0.5),
    paddingHorizontal: vw(2.5),
    alignSelf: 'flex-start',
  },
  levelIcon: {
    width: vw(4),
    height: vw(4),
    marginRight: vw(1.5),
    resizeMode: 'contain',
  },
  highLevelText: {
    fontSize: vw(3.2),
    fontWeight: '600',
    color: '#333333',
  },
  sellerAdsButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: vw(4),
    paddingVertical: vh(1),
    paddingHorizontal: vw(4),
  },
  sellerAdsButtonText: {
    fontSize: vw(3.5),
    fontWeight: '500',
    color: '#6b7280',
  },
  sellerAdsImagesContainer: {
    position: 'relative',
    marginTop: vh(1),
  },
  sellerAdsScrollView: {
    marginRight: 0,
  },
  sellerAdsScrollContent: {
    paddingRight: vw(12),
  },
  sellerAdImageCard: {
    width: vw(28),
    height: vw(28),
    marginRight: vw(3),
    borderRadius: vw(3),
    overflow: 'hidden',
  },
  sellerAdImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nextButton: {
    position: 'absolute',
    right: vw(2),
    top: '50%',
    transform: [{ translateY: -vw(6) }],
    width: vw(12),
    height: vw(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextIcon: {
    width: vw(6),
    height: vw(6),
    resizeMode: 'contain',
  },

  sellerProfileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(2.5),
    paddingTop: vh(2),
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sellerAvatarContainer: {
    position: 'relative',
    width: vw(18),
    height: vw(18),
    marginRight: vw(3.5),
  },
  sellerAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: vw(9),
    resizeMode: 'cover',
  },
  sellerTagOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: vw(8),
    height: vw(8),
    borderRadius: vw(4),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerTagIcon: {
    width: vw(7),
    height: vw(7),
    resizeMode: 'contain',
  },
  sellerInfoTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sellerJoinDate: {
    fontSize: vw(2.8),
    color: '#9ca3af',
    fontWeight: '400',
    marginBottom: vh(0.4),
    opacity: 0.7,
  },
  sellerProfileName: {
    fontSize: vw(4.5),
    fontWeight: '500',
    color: '#374957',
    marginBottom: vh(0.5),
  },
  sellerTotalAds: {
    fontSize: vw(3.5),
    fontWeight: '600',
    color: '#1F2933',
  },

  reviewsSection: {
    marginTop: vh(2.5),
    paddingTop: vh(2.5),
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vh(2),
  },
  ratingLeftSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: vw(4),
  },
  ratingNumber: {
    fontSize: vw(14),
    fontWeight: '700',
    color: '#374957',
    marginBottom: vh(0.5),
  },
  ratingStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(0.8),
  },
  ratingStarIcon: {
    width: vw(4.5),
    height: vw(4.5),
    marginHorizontal: vw(0.3),
    tintColor: '#374957',
    resizeMode: 'contain',
  },
  ratingStarIconHalf: {
    opacity: 0.5,
  },
  reviewsCount: {
    fontSize: vw(3.2),
    fontWeight: '400',
    color: '#6b7280',
  },
  ratingBarsSection: {
    flex: 1,
    justifyContent: 'center',
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(0.8),
  },
  barStarIcon: {
    width: vw(3.5),
    height: vw(3.5),
    marginRight: vw(1),
    tintColor: '#374957',
    resizeMode: 'contain',
  },
  barStarNumber: {
    fontSize: vw(3.2),
    fontWeight: '500',
    color: '#374957',
    width: vw(3),
    marginRight: vw(2),
  },
  progressBarContainer: {
    flex: 1,
    height: vh(1),
    backgroundColor: '#e5e7eb',
    borderRadius: vw(1),
    overflow: 'hidden',
    marginRight: vw(2),
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#374957',
    borderRadius: vw(1),
  },
  barPercentage: {
    fontSize: vw(3),
    fontWeight: '400',
    color: '#6b7280',
    width: vw(10),
    textAlign: 'right',
  },
  reviewsFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(2),
    gap: vw(2),
  },
  reviewFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh(1),
    paddingHorizontal: vw(3.2),
    borderRadius: vw(5),
    backgroundColor: '#f9fafb',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  reviewFilterButtonActive: {
    backgroundColor: '#fff',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  filterStarIcon: {
    width: vw(3.5),
    height: vw(3.5),
    marginRight: vw(1),
    tintColor: '#374957',
    resizeMode: 'contain',
  },
  reviewFilterText: {
    fontSize: vw(3.2),
    fontWeight: '400',
    color: '#6b7280',
  },
  reviewFilterTextActive: {
    fontWeight: '600',
    color: '#374957',
  },
  sellerReviewsButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: vw(4),
    paddingVertical: vh(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: vw(8),
    alignSelf: 'center',
  },
  sellerReviewsButtonText: {
    fontSize: vw(3.8),
    fontWeight: '500',
    color: '#6b7280',
  },

  similarAdsSection: {
    backgroundColor: '#fff',
    padding: vw(4),
    marginTop: vh(2),
  },
  similarAdsTitle: {
    fontSize: vw(4.5),
    fontWeight: '600',
    color: '#374957',
    marginBottom: vh(2),
  },
  similarAdsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  similarAdCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: vw(2.5),
    marginBottom: vh(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: vw(0.5) },
    shadowOpacity: 0.05,
    shadowRadius: vw(1.5),
    elevation: 2,
  },
  similarAdImage: {
    width: '100%',
    height: vw(40),
    borderTopLeftRadius: vw(2.5),
    borderTopRightRadius: vw(2.5),
    resizeMode: 'cover',
  },
  similarAdLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(1),
    paddingHorizontal: vw(2.5),
  },
  similarAdMapIcon: {
    width: vw(3),
    height: vw(3),
    marginRight: vw(1),
    tintColor: '#9ca3af',
    resizeMode: 'contain',
  },
  similarAdLocation: {
    fontSize: vw(2.5),
    fontWeight: '400',
    color: '#9ca3af',
  },
  similarAdTitle: {
    fontSize: vw(3.5),
    fontWeight: '500',
    color: '#374957',
    marginTop: vh(0.5),
    paddingHorizontal: vw(2.5),
  },
  similarAdRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(0.5),
    paddingHorizontal: vw(2.5),
  },
  similarAdStarIcon: {
    width: vw(2.5),
    height: vw(2.5),
    marginRight: vw(0.5),
    tintColor: '#374957',
    resizeMode: 'contain',
  },
  similarAdRating: {
    fontSize: vw(2.5),
    fontWeight: '400',
    color: '#6b7280',
    marginRight: vw(1.5),
  },
  similarAdPrice: {
    fontSize: vw(3.2),
    fontWeight: '600',
    color: '#1F2933',
    marginTop: vh(0.5),
    marginBottom: vh(1),
    paddingHorizontal: vw(2.5),
  },
});


