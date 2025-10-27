import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function AdDetailsScreen() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1); // 2/4 means index 1
  const [isFavorited, setIsFavorited] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backText}>←</Text>
            <Text style={styles.backLabel}>Back</Text>
          </TouchableOpacity>
        </View>

        {}
        <View style={styles.mainImageContainer}>
          <Image 
            source={require('@/oysloe-assets/Ad images/3d-car-city-street.jpg')}
            style={styles.mainImage}
            contentFit="cover"
          />
          <View style={styles.imageOverlayBadge}>
            <Text style={styles.overlayText}>1.5x</Text>
          </View>
          <View style={styles.paginationContainer}>
            <Text style={styles.paginationText}>2/4</Text>
          </View>
        </View>

        {}
        <View style={styles.sectionCard}>
          {}
          <View style={styles.locationRow}>
            <Image 
              source={require('@/oysloe-assets/Ad details screen/map.png')}
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>Lashibi,Accra</Text>
          </View>

          {}
          <Text style={styles.productTitle}>
            Six bedroom apartment boys quarters self compound
          </Text>

          {}
          <View style={styles.pricingRow}>
            <View style={styles.pricingOption}>
              <Image source={require('@/oysloe-assets/Ad details screen/Pricing filter.png')} style={styles.cediIcon} />
              <Text style={styles.pricingAmount}>120</Text>
              <Text style={styles.pricingPeriod}>Daily 3xmns</Text>
            </View>
            <View style={styles.pricingOption}>
              <Image source={require('@/oysloe-assets/Ad details screen/Pricing filter.png')} style={styles.cediIcon} />
              <Text style={styles.pricingAmount}>720</Text>
              <Text style={styles.pricingPeriod}>Weekly 4xmns</Text>
            </View>
            <View style={styles.pricingOption}>
              <Image source={require('@/oysloe-assets/Ad details screen/Pricing filter.png')} style={styles.cediIcon} />
              <Text style={styles.pricingAmount}>65,000</Text>
              <Text style={styles.pricingPeriod}>Monthly 6x mns</Text>
            </View>
          </View>

          {}
          <View style={styles.specificationsSection}>
            <View style={styles.specRow}>
              <View style={styles.specBullet} />
              <Text style={styles.specText}>
                <Text style={styles.specLabel}>State </Text>
                <Text style={styles.specValue}>Brand new</Text>
              </Text>
            </View>
            <View style={styles.specRow}>
              <View style={styles.specBullet} />
              <Text style={styles.specText}>
                <Text style={styles.specLabel}>Manufacturer</Text>
                <Text style={styles.specValue}> Volkswagen</Text>
              </Text>
            </View>
            <View style={styles.specRow}>
              <View style={styles.specBullet} />
              <Text style={styles.specText}>
                <Text style={styles.specLabel}>Year make </Text>
                <Text style={styles.specValue}>2021</Text>
              </Text>
            </View>
            <View style={styles.specRow}>
              <View style={styles.specBullet} />
              <Text style={styles.specText}>
                <Text style={styles.specLabel}>Model </Text>
                <Text style={styles.specValue}>Aud</Text>
              </Text>
            </View>
            <View style={styles.specRow}>
              <View style={styles.specBullet} />
              <Text style={styles.specText}>
                <Text style={styles.specLabel}>Body color</Text>
                <Text style={styles.specValue}> Black</Text>
              </Text>
            </View>
            <View style={styles.specRow}>
              <View style={styles.specBullet} />
              <Text style={styles.specText}>
                <Text style={styles.specLabel}>Model </Text>
                <Text style={styles.specValue}>Aud</Text>
              </Text>
            </View>
            <View style={styles.specRow}>
              <View style={styles.specBullet} />
              <Text style={styles.specText}>
                <Text style={styles.specLabel}>Body color </Text>
                <Text style={styles.specValue}>Black</Text>
              </Text>
            </View>
            <View style={styles.specRow}>
              <View style={styles.specBullet} />
              <Text style={styles.specText}>
                <Text style={styles.specLabel}>Model</Text>
                <Text style={styles.specValue}> Aud</Text>
              </Text>
            </View>
            <View style={styles.specRow}>
              <View style={styles.specBullet} />
              <Text style={styles.specText}>
                <Text style={styles.specLabel}>Body color </Text>
                <Text style={styles.specValue}>Black</Text>
              </Text>
            </View>
            <View style={styles.specRow}>
              <View style={styles.specBullet} />
              <Text style={styles.specText}>
                <Text style={styles.specLabel}>Body color </Text>
                <Text style={styles.specValue}>Black</Text>
              </Text>
            </View>
          </View>
        </View>

        {}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Safety tips</Text>
          <View style={styles.safetyTipsSubtitleBox}>
            <Text style={styles.safetyTipsSubtitle}>
              Follow this tips and report anything that feels off
            </Text>
          </View>
          <View style={styles.safetyTipsList}>
            <View style={styles.safetyTipRow}>
              <View style={styles.safetyBullet} />
              <Text style={styles.safetyTipText}>
                Check the item carefully and ask relevant questions.
              </Text>
            </View>
            <View style={styles.safetyTipRow}>
              <View style={styles.safetyBullet} />
              <Text style={styles.safetyTipText}>
                Visit the company for actual agreement before applying.
              </Text>
            </View>
            <View style={styles.safetyTipRow}>
              <View style={styles.safetyBullet} />
              <Text style={styles.safetyTipText}>
                Do not make any payment in advance before applying.
              </Text>
            </View>
            <View style={styles.safetyTipRow}>
              <View style={styles.safetyBullet} />
              <Text style={styles.safetyTipText}>
                Report any ad or user seems fake, misleading, right away.
              </Text>
            </View>
            <View style={styles.safetyTipRow}>
              <View style={styles.safetyBullet} />
              <Text style={styles.safetyTipText}>
                Know when and how much you need to pay back in total.
              </Text>
            </View>
          </View>
        </View>

        {}
        <View style={styles.sectionCard}>
          <View style={styles.actionButtonsRow1}>
            <TouchableOpacity style={styles.actionButton}>
              <Image 
                source={require('@/oysloe-assets/Ad details screen/Mark as taken.png')}
                style={styles.actionButtonIcon}
              />
              <Text style={styles.actionButtonText}>Mark as taken</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Image 
                source={require('@/oysloe-assets/Ad details screen/flag.png')}
                style={styles.actionButtonIcon}
              />
              <Text style={styles.actionButtonText}>Report user</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setIsFavorited(!isFavorited)}
            >
              <Image 
                source={require('@/oysloe-assets/Ad details screen/favorited.png')}
                style={styles.actionButtonIcon}
              />
              <Text style={styles.actionButtonText}>Favorite</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionButtonsRow2}>
            <TouchableOpacity style={styles.actionButton}>
              <Image 
                source={require('@/oysloe-assets/Ad details screen/out going call.png')}
                style={styles.actionButtonIcon}
              />
              <Text style={styles.actionButtonText}>Caller 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Image 
                source={require('@/oysloe-assets/Ad details screen/out going call.png')}
                style={styles.actionButtonIcon}
              />
              <Text style={styles.actionButtonText}>Caller 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Image 
                source={require('@/oysloe-assets/Ad details screen/Make an offer.png')}
                style={styles.actionButtonIcon}
              />
              <Text style={styles.actionButtonText}>Make an offer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Quick Chat</Text>
          <View style={styles.quickChatQuestions}>
            <TouchableOpacity style={styles.quickChatQuestionBtn}>
              <Text style={styles.quickChatQuestionText}>Is this original?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickChatQuestionBtn}>
              <Text style={styles.quickChatQuestionText}>Do you have delivery?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickChatQuestionBtn}>
              <Text style={styles.quickChatQuestionText}>Can you confirm the condition?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickChatQuestionBtn}>
              <Text style={styles.quickChatQuestionText}>Do you have delivery?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chatInputContainer}>
            <Text style={styles.chatPlaceholder}>Start a chat</Text>
            <View style={styles.chatIconsContainer}>
              <Image 
                source={require('@/oysloe-assets/Ad details screen/quick chat.png')}
                style={styles.chatIcon}
              />
              <Image 
                source={require('@/oysloe-assets/Ad details screen/search.png')}
                style={styles.chatIcon}
              />
            </View>
          </View>
          <View style={styles.securityMessageRow}>
            <Image 
              source={require('@/oysloe-assets/Ad details screen/shield.png')}
              style={styles.securityIcon}
            />
            <Text style={styles.securityText}>Chat is secured</Text>
            <View style={styles.safetyReminderBox}>
              <Text style={styles.safetyReminderText}>
                Always chat here for safety reasons!
              </Text>
            </View>
          </View>
        </View>

        {}
        <View style={styles.sectionCard}>
          <View style={styles.sellerHeaderRow}>
            <Text style={styles.sellerName}>Elektromart Gh Ltd</Text>
            <View style={styles.highLevelTag}>
              <View style={styles.highLevelBadge} />
              <Text style={styles.highLevelText}>High Level</Text>
            </View>
          </View>
          
          {}
          <View style={styles.sellerAdsPreview}>
            <Image 
              source={require('@/oysloe-assets/Ad details screen/editreview.png')}
              style={styles.sellerAdImage}
            />
            <Image 
              source={require('@/oysloe-assets/Ad details screen/flag.png')}
              style={styles.sellerAdImage}
            />
            <Image 
              source={require('@/oysloe-assets/Ad images/storey.png')}
              style={styles.sellerAdImage}
            />
            <TouchableOpacity style={styles.sellerAdsButton}>
              <Text style={styles.sellerAdsText}>Seller ads</Text>
              <Image 
                source={require('@/oysloe-assets/Ads/sold.svg')}
                style={styles.sellerAdsArrow}
              />
              <Text style={styles.sellerAdsCount}>12</Text>
            </TouchableOpacity>
          </View>

          {}
          <View style={styles.alexanderProfileBox}>
            <Image 
              source={require('@/oysloe-assets/Ad images/2148634032.jpg')}
              style={styles.alexanderProfileImage}
            />
            <View style={styles.alexanderDetails}>
              <Text style={styles.alexanderName}>Alexander Kowri</Text>
              <Text style={styles.alexanderTotalAds}>Total ads: 2k</Text>
              <Text style={styles.alexanderJoinDate}>Jan,2024</Text>
            </View>
            <TouchableOpacity style={styles.sellerReviewsButton}>
              <Text style={styles.sellerReviewsText}>Seller reviews</Text>
              <Image 
                source={require('@/oysloe-assets/Ads/sold.svg')}
                style={styles.sellerReviewsArrow}
              />
              <Text style={styles.sellerReviewsCount}>32</Text>
            </TouchableOpacity>
          </View>

          {}
          <Text style={styles.overallRatingText}>4.5</Text>
          <View style={styles.starsRow}>
            <Image
              source={require('@/oysloe-assets/Ad details screen/favorited.png')}
              style={styles.ratingStar}
            />
            <Image
              source={require('@/oysloe-assets/Ad details screen/favorited.png')}
              style={styles.ratingStar}
            />
            <Image
              source={require('@/oysloe-assets/Ad details screen/favorited.png')}
              style={styles.ratingStar}
            />
            <Image
              source={require('@/oysloe-assets/Ad details screen/favorited.png')}
              style={styles.ratingStar}
            />
            <Image
              source={require('@/oysloe-assets/Ad details screen/favorited.png')}
              style={styles.ratingStar}
            />
          </View>
          <Text style={styles.reviewsCountText}>234 Reviews</Text>

          {}
          {[
            { stars: 5, fill: 50 },
            { stars: 4, fill: 50 },
            { stars: 3, fill: 50 },
            { stars: 2, fill: 50 },
            { stars: 1, fill: 50 },
          ].map((rating, index) => (
            <View key={index} style={styles.ratingBreakdownRow}>
              <Text style={styles.ratingBreakdownStars}>{rating.stars}</Text>
              <View style={styles.ratingBreakdownBarContainer}>
                <View style={styles.ratingBreakdownBarBackground} />
                <View style={[styles.ratingBreakdownBarFill, { width: `${rating.fill}%` }]} />
              </View>
              <Text style={styles.ratingBreakdownPercentage}>50%</Text>
            </View>
          ))}

          {}
          <View style={styles.reviewFilters}>
            <TouchableOpacity style={styles.reviewFilterBtn}>
              <Image 
                source={require('@/oysloe-assets/Ad details screen/favorited.png')}
                style={styles.reviewFilterIcon}
              />
              <Text style={styles.reviewFilterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reviewFilterBtn}>
              <Image 
                source={require('@/oysloe-assets/Ad details screen/favorited.png')}
                style={styles.reviewFilterIcon}
              />
              <Text style={styles.reviewFilterText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reviewFilterBtn}>
              <Image 
                source={require('@/oysloe-assets/Ad details screen/favorited.png')}
                style={styles.reviewFilterIcon}
              />
              <Text style={styles.reviewFilterText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reviewFilterBtn}>
              <Image 
                source={require('@/oysloe-assets/Ad details screen/favorited.png')}
                style={styles.reviewFilterIcon}
              />
              <Text style={styles.reviewFilterText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reviewFilterBtn}>
              <Image 
                source={require('@/oysloe-assets/Ad details screen/favorited.png')}
                style={styles.reviewFilterIcon}
              />
              <Text style={styles.reviewFilterText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reviewFilterBtn}>
              <Image 
                source={require('@/oysloe-assets/Ad details screen/favorited.png')}
                style={styles.reviewFilterIcon}
              />
              <Text style={styles.reviewFilterText}>5</Text>
            </TouchableOpacity>
          </View>
        </View>

        {}
        <View style={styles.similarAdsSection}>
          <Text style={styles.sectionTitle}>Similar Ads</Text>
          {[
            {
              image: require('@/oysloe-assets/Ad images/storey.png'),
              title: 'Modern house with terrace',
              location: 'Santamaria-kotobabi',
              price: '120',
              prices: ['120', '720', '65,000']
            },
            {
              image: require('@/oysloe-assets/Ad images/nice-inside.png'),
              title: 'Spacious interior',
              location: 'Santamaria-kotobabi',
              price: '1,670,000',
              prices: []
            },
            {
              image: require('@/oysloe-assets/Ad images/3d-car-city-street.jpg'),
              title: 'City street car',
              location: 'Santamaria-kotobabi',
              price: '120',
              prices: ['120', '720', '65,000']
            },
            {
              image: require('@/oysloe-assets/Ad images/landscape-nature-scene-tv-appliance-generative-ai.jpg'),
              title: 'Landscape scene',
              location: 'Santamaria-kotobabi',
              price: '1,670,000',
              prices: []
            },
          ].map((ad, index) => (
            <View key={index} style={index % 2 === 0 ? styles.similarAdRowLeft : styles.similarAdRowRight}>
              {index % 2 === 0 && (
                <View style={styles.similarAdCard}>
                  <Image source={ad.image} style={styles.similarAdImage} />
                  <View style={styles.similarAdLocation}>
                    <Image 
                      source={require('@/oysloe-assets/Ad details screen/map.png')}
                      style={styles.similarAdLocationIcon}
                    />
                    <Text style={styles.similarAdLocationText}>{ad.location}</Text>
                  </View>
                  <Text style={styles.similarAdTitle}>{ad.title}</Text>
                  {ad.prices.length > 0 ? (
                    <View style={styles.similarAdPriceRow}>
                      <Image source={require('@/oysloe-assets/Ad details screen/Pricing filter.png')} style={styles.similarAdCedi} />
                      <Text style={styles.similarAdPrice}>{ad.prices[0]}</Text>
                      <Image source={require('@/oysloe-assets/Ad details screen/Pricing filter.png')} style={styles.similarAdCedi} />
                      <Text style={styles.similarAdPrice}>{ad.prices[1]}</Text>
                      <Image source={require('@/oysloe-assets/Ad details screen/Pricing filter.png')} style={styles.similarAdCedi} />
                      <Text style={styles.similarAdPrice}>{ad.prices[2]}</Text>
                    </View>
                  ) : (
                    <View style={styles.similarAdPriceRow}>
                      <Image source={require('@/oysloe-assets/Ad details screen/Pricing filter.png')} style={styles.similarAdCedi} />
                      <Text style={styles.similarAdPrice}>{ad.price}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {}
      <View style={styles.bottomNav}>
        <View style={styles.bottomNavContent}>
          <TouchableOpacity style={styles.navItem}>
            <Image source={require('@/oysloe-assets/bottom menu/home.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Image source={require('@/oysloe-assets/bottom menu/alert.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Image source={require('@/oysloe-assets/bottom menu/Post.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Post Ad</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Image source={require('@/oysloe-assets/bottom menu/inbox.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Inbox</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Image source={require('@/oysloe-assets/bottom menu/profile.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backText: {
    fontSize: 16,
    color: '#636060cf',
  },
  backLabel: {
    fontSize: 16,
    color: '#636060cf',
    marginLeft: 5,
  },
  mainImageContainer: {
    width: '100%',
    height: width * 0.6,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlayBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#f4f4f49e',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  overlayText: {
    fontSize: 12,
    color: '#374957',
    fontWeight: '500',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationText: {
    fontSize: 16,
    color: '#374957',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 15,
    padding: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  locationText: {
    fontSize: 13,
    color: '#504e4e',
    fontWeight: '500',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#374957',
    marginBottom: 20,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pricingOption: {
    flex: 1,
    alignItems: 'center',
  },
  cediIcon: {
    width: 10,
    height: 10,
    marginBottom: 4,
  },
  pricingAmount: {
    fontSize: 24,
    fontWeight: '500',
    color: '#374957',
  },
  pricingPeriod: {
    fontSize: 10,
    color: '#374957',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
  specificationsSection: {
    marginBottom: 15,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  specBullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#374957',
    marginRight: 10,
  },
  specText: {
    fontSize: 13,
    color: '#374957',
  },
  specLabel: {
    fontWeight: '600',
  },
  specValue: {
    fontWeight: '400',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374957',
    marginBottom: 12,
  },
  safetyTipsSubtitleBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  safetyTipsSubtitle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#374957',
  },
  safetyTipsList: {
    paddingLeft: 5,
  },
  safetyTipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  safetyBullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#374957',
    marginRight: 10,
    marginTop: 6,
  },
  safetyTipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374957',
    flex: 1,
    lineHeight: 18,
  },
  actionButtonsRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButtonsRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  actionButtonIcon: {
    width: 24,
    height: 24,
    marginBottom: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374957',
    textAlign: 'center',
  },
  quickChatQuestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  quickChatQuestionBtn: {
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  quickChatQuestionText: {
    fontSize: 12,
    color: '#374957',
    fontWeight: '400',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#37495752',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  chatPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#374957',
  },
  chatIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  securityMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  securityIcon: {
    width: 9,
    height: 9,
    marginRight: 6,
  },
  securityText: {
    fontSize: 9,
    color: '#374957',
    marginRight: 10,
  },
  safetyReminderBox: {
    backgroundColor: '#74ffa7',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  safetyReminderText: {
    fontSize: 9,
    color: '#636060cf',
  },
  sellerHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374957',
    flex: 1,
  },
  highLevelTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#74ffa7',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 10,
  },
  highLevelBadge: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#374957',
    marginRight: 5,
  },
  highLevelText: {
    fontSize: 9,
    color: '#374957',
  },
  sellerAdsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sellerAdImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  sellerAdsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sellerAdsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374957',
    marginRight: 8,
  },
  sellerAdsArrow: {
    width: 10,
    height: 10,
    marginRight: 8,
  },
  sellerAdsCount: {
    fontSize: 8,
    fontWeight: '600',
    color: '#374957',
  },
  alexanderProfileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 9,
    padding: 10,
    marginBottom: 20,
  },
  alexanderProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  alexanderDetails: {
    flex: 1,
  },
  alexanderName: {
    fontSize: 15,
    color: '#374957',
    marginBottom: 4,
  },
  alexanderTotalAds: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374957',
    marginBottom: 2,
  },
  alexanderJoinDate: {
    fontSize: 8,
    fontWeight: '600',
    color: '#636060a6',
  },
  sellerReviewsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  sellerReviewsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374957',
    marginRight: 8,
  },
  sellerReviewsArrow: {
    width: 10,
    height: 10,
    marginRight: 8,
  },
  sellerReviewsCount: {
    fontSize: 8,
    fontWeight: '600',
    color: '#374957',
  },
  overallRatingText: {
    fontSize: 64,
    fontWeight: '500',
    color: '#374957',
    marginBottom: 5,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  ratingStar: {
    width: 12,
    height: 12,
    marginRight: 2,
  },
  reviewsCountText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#374957',
    marginBottom: 15,
  },
  ratingBreakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingBreakdownStars: {
    fontSize: 11,
    fontWeight: '500',
    color: '#374957',
    width: 20,
  },
  ratingBreakdownBarContainer: {
    flex: 1,
    height: 10,
    marginHorizontal: 10,
    position: 'relative',
  },
  ratingBreakdownBarBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#d9d9d9',
    borderRadius: 20,
  },
  ratingBreakdownBarFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#374957',
    borderRadius: 20,
  },
  ratingBreakdownPercentage: {
    fontSize: 10,
    fontWeight: '500',
    color: '#374957',
    width: 40,
    textAlign: 'right',
  },
  reviewFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  reviewFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  reviewFilterIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  reviewFilterText: {
    fontSize: 10,
    color: '#636060cf',
  },
  similarAdsSection: {
    padding: 20,
    paddingBottom: 100,
  },
  similarAdRowLeft: {
    width: '50%',
    paddingRight: 8,
  },
  similarAdRowRight: {
    width: '50%',
    paddingLeft: 8,
  },
  similarAdCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
  },
  similarAdImage: {
    width: '100%',
    height: 120,
  },
  similarAdLocation: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  similarAdLocationIcon: {
    width: 10,
    height: 10,
    marginRight: 3,
  },
  similarAdLocationText: {
    fontSize: 9,
    color: '#374957',
    fontWeight: '500',
  },
  similarAdTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#374957',
    padding: 10,
  },
  similarAdPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  similarAdCedi: {
    width: 8,
    height: 8,
    marginRight: 2,
  },
  similarAdPrice: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374957',
    marginRight: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 0.3,
    borderTopColor: '#00000030',
    height: 80,
    justifyContent: 'center',
  },
  bottomNavContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 28,
    height: 28,
    marginBottom: 5,
  },
  navText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#374957',
  },
});