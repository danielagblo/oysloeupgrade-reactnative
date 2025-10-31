import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image as RNImage } from
'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReviewsBox from './components/ReviewsBox';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const { width, height } = Dimensions.get('window');

type Message = {
  author: string;
  text: string;
};






export default function AdDetailsScreen() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  function onSendMessage() {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { author: 'me', text: chatInput }]);
      setChatInput('');
    }
  }

  function onQuickQuestion(q: string) {
    setChatMessages([...chatMessages, { author: 'me', text: q }]);
  }

  const handleBack = () => {
    router.back();
  };

  const aggregatedReviews = {
    averageRating: 4.2,
    totalReviews: 12,
    ratingBreakdown: {
      5: 7,
      4: 3,
      3: 2,
      2: 0,
      1: 0
    }
  };

  return (
    _jsxs(SafeAreaView, { style: styles.container, children: [
      _jsxs(ScrollView, { style: styles.scrollView, showsVerticalScrollIndicator: false, children: [

        _jsx(View, { style: styles.header, children:
          _jsxs(TouchableOpacity, { style: styles.backButton, onPress: handleBack, children: [
            _jsx(Text, { style: styles.backText, children: "\u2190" }),
            _jsx(Text, { style: styles.backLabel, children: "Back" })] }
          ) }
        ),


        _jsxs(View, { style: styles.mainImageContainer, children: [
          _jsx(Image, {
            source: require('@/oysloe-assets/Ad images/3d-car-city-street.jpg'),
            style: styles.mainImage,
            contentFit: "cover" }
          ),
          _jsx(View, { style: styles.imageOverlayBadge, children:
            _jsx(Text, { style: styles.overlayText, children: "1.5x" }) }
          ),
          _jsx(View, { style: styles.paginationContainer, children:
            _jsx(Text, { style: styles.paginationText, children: "2/4" }) }
          )] }
        ),


        _jsxs(View, { style: styles.sectionCard, children: [

          _jsxs(View, { style: styles.locationRow, children: [
            _jsx(Image, {
              source: require('@/oysloe-assets/Ad details screen/map.png'),
              style: styles.locationIcon }
            ),
            _jsx(Text, { style: styles.locationText, children: "Lashibi,Accra" })] }
          ),


          _jsx(Text, { style: styles.productTitle, children: "Six bedroom apartment boys quarters self compound" }

          ),


          _jsxs(View, { style: styles.pricingRow, children: [
            _jsxs(View, { style: styles.pricingOption, children: [
              _jsx(Image, { source: require('@/oysloe-assets/Ad details screen/Pricing filter.png'), style: styles.cediIcon }),
              _jsx(Text, { style: styles.pricingAmount, children: "120" }),
              _jsx(Text, { style: styles.pricingPeriod, children: "Daily 3xmns" })] }
            ),
            _jsxs(View, { style: styles.pricingOption, children: [
              _jsx(Image, { source: require('@/oysloe-assets/Ad details screen/Pricing filter.png'), style: styles.cediIcon }),
              _jsx(Text, { style: styles.pricingAmount, children: "720" }),
              _jsx(Text, { style: styles.pricingPeriod, children: "Weekly 4xmns" })] }
            ),
            _jsxs(View, { style: styles.pricingOption, children: [
              _jsx(Image, { source: require('@/oysloe-assets/Ad details screen/Pricing filter.png'), style: styles.cediIcon }),
              _jsx(Text, { style: styles.pricingAmount, children: "65,000" }),
              _jsx(Text, { style: styles.pricingPeriod, children: "Monthly 6x mns" })] }
            )] }
          ),


          _jsxs(View, { style: styles.specificationsSection, children: [
            _jsxs(View, { style: styles.specRow, children: [
              _jsx(View, { style: styles.specBullet }),
              _jsxs(Text, { style: styles.specText, children: [
                _jsx(Text, { style: styles.specLabel, children: "State " }),
                _jsx(Text, { style: styles.specValue, children: "Brand new" })] }
              )] }
            ),
            _jsxs(View, { style: styles.specRow, children: [
              _jsx(View, { style: styles.specBullet }),
              _jsxs(Text, { style: styles.specText, children: [
                _jsx(Text, { style: styles.specLabel, children: "Manufacturer" }),
                _jsx(Text, { style: styles.specValue, children: " Volkswagen" })] }
              )] }
            ),
            _jsxs(View, { style: styles.specRow, children: [
              _jsx(View, { style: styles.specBullet }),
              _jsxs(Text, { style: styles.specText, children: [
                _jsx(Text, { style: styles.specLabel, children: "Year make " }),
                _jsx(Text, { style: styles.specValue, children: "2021" })] }
              )] }
            ),
            _jsxs(View, { style: styles.specRow, children: [
              _jsx(View, { style: styles.specBullet }),
              _jsxs(Text, { style: styles.specText, children: [
                _jsx(Text, { style: styles.specLabel, children: "Model " }),
                _jsx(Text, { style: styles.specValue, children: "Aud" })] }
              )] }
            ),
            _jsxs(View, { style: styles.specRow, children: [
              _jsx(View, { style: styles.specBullet }),
              _jsxs(Text, { style: styles.specText, children: [
                _jsx(Text, { style: styles.specLabel, children: "Body color" }),
                _jsx(Text, { style: styles.specValue, children: " Black" })] }
              )] }
            ),
            _jsxs(View, { style: styles.specRow, children: [
              _jsx(View, { style: styles.specBullet }),
              _jsxs(Text, { style: styles.specText, children: [
                _jsx(Text, { style: styles.specLabel, children: "Model " }),
                _jsx(Text, { style: styles.specValue, children: "Aud" })] }
              )] }
            ),
            _jsxs(View, { style: styles.specRow, children: [
              _jsx(View, { style: styles.specBullet }),
              _jsxs(Text, { style: styles.specText, children: [
                _jsx(Text, { style: styles.specLabel, children: "Body color " }),
                _jsx(Text, { style: styles.specValue, children: "Black" })] }
              )] }
            ),
            _jsxs(View, { style: styles.specRow, children: [
              _jsx(View, { style: styles.specBullet }),
              _jsxs(Text, { style: styles.specText, children: [
                _jsx(Text, { style: styles.specLabel, children: "Model" }),
                _jsx(Text, { style: styles.specValue, children: " Aud" })] }
              )] }
            ),
            _jsxs(View, { style: styles.specRow, children: [
              _jsx(View, { style: styles.specBullet }),
              _jsxs(Text, { style: styles.specText, children: [
                _jsx(Text, { style: styles.specLabel, children: "Body color " }),
                _jsx(Text, { style: styles.specValue, children: "Black" })] }
              )] }
            ),
            _jsxs(View, { style: styles.specRow, children: [
              _jsx(View, { style: styles.specBullet }),
              _jsxs(Text, { style: styles.specText, children: [
                _jsx(Text, { style: styles.specLabel, children: "Body color " }),
                _jsx(Text, { style: styles.specValue, children: "Black" })] }
              )] }
            )] }
          )] }
        ),


        _jsxs(View, { style: styles.sectionCard, children: [
          _jsx(Text, { style: styles.sectionTitle, children: "Safety tips" }),
          _jsx(View, { style: styles.safetyTipsSubtitleBox, children:
            _jsx(Text, { style: styles.safetyTipsSubtitle, children: "Follow this tips and report anything that feels off" }

            ) }
          ),
          _jsxs(View, { style: styles.safetyTipsList, children: [
            _jsxs(View, { style: styles.safetyTipRow, children: [
              _jsx(View, { style: styles.safetyBullet }),
              _jsx(Text, { style: styles.safetyTipText, children: "Check the item carefully and ask relevant questions." }

              )] }
            ),
            _jsxs(View, { style: styles.safetyTipRow, children: [
              _jsx(View, { style: styles.safetyBullet }),
              _jsx(Text, { style: styles.safetyTipText, children: "Visit the company for actual agreement before applying." }

              )] }
            ),
            _jsxs(View, { style: styles.safetyTipRow, children: [
              _jsx(View, { style: styles.safetyBullet }),
              _jsx(Text, { style: styles.safetyTipText, children: "Do not make any payment in advance before applying." }

              )] }
            ),
            _jsxs(View, { style: styles.safetyTipRow, children: [
              _jsx(View, { style: styles.safetyBullet }),
              _jsx(Text, { style: styles.safetyTipText, children: "Report any ad or user seems fake, misleading, right away." }

              )] }
            ),
            _jsxs(View, { style: styles.safetyTipRow, children: [
              _jsx(View, { style: styles.safetyBullet }),
              _jsx(Text, { style: styles.safetyTipText, children: "Know when and how much you need to pay back in total." }

              )] }
            )] }
          )] }
        ),


        _jsxs(View, { style: styles.sectionCard, children: [
          _jsxs(View, { style: styles.actionButtonsRow1, children: [
            _jsxs(TouchableOpacity, { style: styles.actionButton, children: [
              _jsx(Image, {
                source: require('@/oysloe-assets/Ad details screen/Mark as taken.png'),
                style: styles.actionButtonIcon }
              ),
              _jsx(Text, { style: styles.actionButtonText, children: "Mark as taken" })] }
            ),
            _jsxs(TouchableOpacity, { style: styles.actionButton, children: [
              _jsx(Image, {
                source: require('@/oysloe-assets/Ad details screen/flag.png'),
                style: styles.actionButtonIcon }
              ),
              _jsx(Text, { style: styles.actionButtonText, children: "Report user" })] }
            ),
            _jsxs(TouchableOpacity, {
              style: styles.actionButton,
              onPress: () => setIsFavorited(!isFavorited), children: [

              _jsx(Image, {
                source: require('@/oysloe-assets/Ad details screen/favorited.png'),
                style: styles.actionButtonIcon }
              ),
              _jsx(Text, { style: styles.actionButtonText, children: "Favorite" })] }
            )] }
          ),
          _jsxs(View, { style: styles.actionButtonsRow2, children: [
            _jsxs(TouchableOpacity, { style: styles.actionButton, children: [
              _jsx(Image, {
                source: require('@/oysloe-assets/Ad details screen/out going call.png'),
                style: styles.actionButtonIcon }
              ),
              _jsx(Text, { style: styles.actionButtonText, children: "Caller 1" })] }
            ),
            _jsxs(TouchableOpacity, { style: styles.actionButton, children: [
              _jsx(Image, {
                source: require('@/oysloe-assets/Ad details screen/out going call.png'),
                style: styles.actionButtonIcon }
              ),
              _jsx(Text, { style: styles.actionButtonText, children: "Caller 2" })] }
            ),
            _jsxs(TouchableOpacity, { style: styles.actionButton, children: [
              _jsx(Image, {
                source: require('@/oysloe-assets/Ad details screen/Make an offer.png'),
                style: styles.actionButtonIcon }
              ),
              _jsx(Text, { style: styles.actionButtonText, children: "Make an offer" })] }
            )] }
          )] }
        ),


        _jsxs(View, { style: styles.sectionCard, children: [
          _jsx(Text, { style: styles.sectionTitle, children: "Quick Chat" }),


          _jsx(View, { style: { maxHeight: 150, minHeight: 40, marginBottom: 7 }, children:
            chatMessages.map((msg, i) =>
            _jsx(View, { style: { alignSelf: msg.author === 'me' ? 'flex-end' : 'flex-start', backgroundColor: '#f2f6ff', borderRadius: 16, paddingHorizontal: 15, paddingVertical: 7, marginVertical: 2, maxWidth: '80%' }, children:
              _jsx(Text, { style: { color: '#374957', fontSize: 15 }, children: msg.text }) }, i
            )
            ) }
          ),


          _jsx(View, { style: styles.quickChatQuestions, children:
            ["Is this original?", "Do you have delivery?", "Can you confirm the condition?"].map((q, index) =>
            _jsx(TouchableOpacity, { style: styles.quickChatQuestionBtn, onPress: () => onQuickQuestion(q), children:
              _jsx(Text, { style: styles.quickChatQuestionText, children: q }) }, q + index
            )
            ) }
          ),


          _jsxs(View, { style: { flexDirection: 'row', alignItems: 'center', marginTop: 15 }, children: [
            _jsxs(View, { style: { flex: 1, flexDirection: 'row', backgroundColor: '#fff', borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#dbe3ea', paddingHorizontal: 15 }, children: [
              _jsx(TextInput, {
                style: { flex: 1, fontSize: 16, paddingVertical: 10 },
                placeholder: "Start a chat",
                value: chatInput,
                onChangeText: setChatInput,
                onSubmitEditing: onSendMessage,
                returnKeyType: "send" }
              ),
              _jsx(TouchableOpacity, { onPress: onSendMessage, style: { paddingLeft: 10, paddingVertical: 6 }, children:
                _jsx(RNImage, { source: require('@/oysloe-assets/Ad details screen/send.png'), style: { width: 27, height: 27 } }) }
              )] }
            ),
            _jsx(View, { style: { width: 52, alignItems: 'center', marginLeft: 10 }, children:
              _jsx(TouchableOpacity, { style: { width: 48, height: 48, backgroundColor: '#fff', borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#dbe3ea' }, children:

                _jsx(RNImage, { source: require('@/oysloe-assets/Ad details screen/quick chat.png'), style: { width: 23, height: 23 } }) }
              ) }
            )] }
          ),


          _jsxs(View, { style: styles.securityMessageRow, children: [
            _jsx(RNImage, { source: require('@/oysloe-assets/Ad details screen/shield.png'), style: styles.securityIcon }),
            _jsx(Text, { style: styles.securityText, children: "Chat is secured" }),
            _jsx(View, { style: styles.safetyReminderBox, children:
              _jsx(Text, { style: styles.safetyReminderText, children: "Always chat here for safety reasons!" }) }
            )] }
          )] }
        ),


        _jsxs(View, { style: styles.sectionCard, children: [
          _jsxs(View, { style: styles.sellerHeaderRow, children: [
            _jsx(Text, { style: styles.sellerName, children: "Elektromart Gh Ltd" }),
            _jsxs(View, { style: styles.highLevelTag, children: [
              _jsx(View, { style: styles.highLevelBadge }),
              _jsx(Text, { style: styles.highLevelText, children: "High Level" })] }
            )] }
          ),


          _jsxs(View, { style: styles.sellerAdsPreview, children: [
            _jsx(Image, {
              source: require('@/oysloe-assets/Ad details screen/editreview.png'),
              style: styles.sellerAdImage }
            ),
            _jsx(Image, {
              source: require('@/oysloe-assets/Ad details screen/flag.png'),
              style: styles.sellerAdImage }
            ),
            _jsx(Image, {
              source: require('@/oysloe-assets/Ad images/storey.png'),
              style: styles.sellerAdImage }
            ),
            _jsxs(TouchableOpacity, { style: styles.sellerAdsButton, children: [
              _jsx(Text, { style: styles.sellerAdsText, children: "Seller ads" }),
              _jsx(Image, {
                source: require('@/oysloe-assets/Ads/sold.svg'),
                style: styles.sellerAdsArrow }
              ),
              _jsx(Text, { style: styles.sellerAdsCount, children: "12" })] }
            )] }
          ),


          _jsxs(View, { style: styles.alexanderProfileBox, children: [
            _jsx(Image, {
              source: require('@/oysloe-assets/Ad images/2148634032.jpg'),
              style: styles.alexanderProfileImage }
            ),
            _jsxs(View, { style: styles.alexanderDetails, children: [
              _jsx(Text, { style: styles.alexanderName, children: "Alexander Kowri" }),
              _jsx(Text, { style: styles.alexanderTotalAds, children: "Total ads: 2k" }),
              _jsx(Text, { style: styles.alexanderJoinDate, children: "Jan,2024" })] }
            ),
            _jsxs(TouchableOpacity, { style: styles.sellerReviewsButton, children: [
              _jsx(Text, { style: styles.sellerReviewsText, children: "Seller reviews" }),
              _jsx(Image, {
                source: require('@/oysloe-assets/Ads/sold.svg'),
                style: styles.sellerReviewsArrow }
              ),
              _jsx(Text, { style: styles.sellerReviewsCount, children: "32" })] }
            )] }
          ),


          _jsx(ReviewsBox, { aggregatedReviews: aggregatedReviews })] }
        ),


        _jsxs(View, { style: styles.similarAdsSection, children: [
          _jsx(Text, { style: styles.sectionTitle, children: "Similar Ads" }),
          [
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
          }].
          map((ad, index) =>
          _jsx(View, { style: index % 2 === 0 ? styles.similarAdRowLeft : styles.similarAdRowRight, children:
            index % 2 === 0 &&
            _jsxs(View, { style: styles.similarAdCard, children: [
              _jsx(Image, { source: ad.image, style: styles.similarAdImage }),
              _jsxs(View, { style: styles.similarAdLocation, children: [
                _jsx(Image, {
                  source: require('@/oysloe-assets/Ad details screen/map.png'),
                  style: styles.similarAdLocationIcon }
                ),
                _jsx(Text, { style: styles.similarAdLocationText, children: ad.location })] }
              ),
              _jsx(Text, { style: styles.similarAdTitle, children: ad.title }),
              ad.prices.length > 0 ?
              _jsxs(View, { style: styles.similarAdPriceRow, children: [
                _jsx(Image, { source: require('@/oysloe-assets/Ad details screen/Pricing filter.png'), style: styles.similarAdCedi }),
                _jsx(Text, { style: styles.similarAdPrice, children: ad.prices[0] }),
                _jsx(Image, { source: require('@/oysloe-assets/Ad details screen/Pricing filter.png'), style: styles.similarAdCedi }),
                _jsx(Text, { style: styles.similarAdPrice, children: ad.prices[1] }),
                _jsx(Image, { source: require('@/oysloe-assets/Ad details screen/Pricing filter.png'), style: styles.similarAdCedi }),
                _jsx(Text, { style: styles.similarAdPrice, children: ad.prices[2] })] }
              ) :

              _jsxs(View, { style: styles.similarAdPriceRow, children: [
                _jsx(Image, { source: require('@/oysloe-assets/Ad details screen/Pricing filter.png'), style: styles.similarAdCedi }),
                _jsx(Text, { style: styles.similarAdPrice, children: ad.price })] }
              )] }

            ) }, index

          )
          )] }
        )] }
      ),


      _jsx(View, { style: styles.bottomNav, children:
        _jsxs(View, { style: styles.bottomNavContent, children: [
          _jsxs(TouchableOpacity, { style: styles.navItem, children: [
            _jsx(Image, { source: require('@/oysloe-assets/bottom menu/home.png'), style: styles.navIcon }),
            _jsx(Text, { style: styles.navText, children: "Home" })] }
          ),
          _jsxs(TouchableOpacity, { style: styles.navItem, children: [
            _jsx(Image, { source: require('@/oysloe-assets/bottom menu/alert.png'), style: styles.navIcon }),
            _jsx(Text, { style: styles.navText, children: "Alerts" })] }
          ),
          _jsxs(TouchableOpacity, { style: styles.navItem, children: [
            _jsx(Image, { source: require('@/oysloe-assets/bottom menu/Post.png'), style: styles.navIcon }),
            _jsx(Text, { style: styles.navText, children: "Post Ad" })] }
          ),
          _jsxs(TouchableOpacity, { style: styles.navItem, children: [
            _jsx(Image, { source: require('@/oysloe-assets/bottom menu/inbox.png'), style: styles.navIcon }),
            _jsx(Text, { style: styles.navText, children: "Inbox" })] }
          ),
          _jsxs(TouchableOpacity, { style: styles.navItem, children: [
            _jsx(Image, { source: require('@/oysloe-assets/bottom menu/profile.png'), style: styles.navIcon }),
            _jsx(Text, { style: styles.navText, children: "Profile" })] }
          )] }
        ) }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  scrollView: {
    flex: 1,
    paddingBottom: 100
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  backText: {
    fontSize: 16,
    color: '#636060cf'
  },
  backLabel: {
    fontSize: 16,
    color: '#636060cf',
    marginLeft: 5
  },
  mainImageContainer: {
    width: '100%',
    height: width * 0.6,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  mainImage: {
    width: '100%',
    height: '100%'
  },
  imageOverlayBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#f4f4f49e',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  overlayText: {
    fontSize: 12,
    color: '#374957',
    fontWeight: '500'
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  paginationText: {
    fontSize: 16,
    color: '#374957'
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 15,
    padding: 20
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  locationIcon: {
    width: 12,
    height: 12,
    marginRight: 8
  },
  locationText: {
    fontSize: 13,
    color: '#504e4e',
    fontWeight: '500'
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#374957',
    marginBottom: 20
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  pricingOption: {
    flex: 1,
    alignItems: 'center'
  },
  cediIcon: {
    width: 10,
    height: 10,
    marginBottom: 4
  },
  pricingAmount: {
    fontSize: 24,
    fontWeight: '500',
    color: '#374957'
  },
  pricingPeriod: {
    fontSize: 10,
    color: '#374957',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4
  },
  specificationsSection: {
    marginBottom: 15
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  specBullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#374957',
    marginRight: 10
  },
  specText: {
    fontSize: 13,
    color: '#374957'
  },
  specLabel: {
    fontWeight: '600'
  },
  specValue: {
    fontWeight: '400'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374957',
    marginBottom: 12
  },
  safetyTipsSubtitleBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  },
  safetyTipsSubtitle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#374957'
  },
  safetyTipsList: {
    paddingLeft: 5
  },
  safetyTipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  safetyBullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#374957',
    marginRight: 10,
    marginTop: 6
  },
  safetyTipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374957',
    flex: 1,
    lineHeight: 18
  },
  actionButtonsRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  actionButtonsRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4
  },
  actionButtonIcon: {
    width: 24,
    height: 24,
    marginBottom: 6
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374957',
    textAlign: 'center'
  },
  quickChatQuestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15
  },
  quickChatQuestionBtn: {
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8
  },
  quickChatQuestionText: {
    fontSize: 12,
    color: '#374957',
    fontWeight: '400'
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
    marginBottom: 10
  },
  chatPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#374957'
  },
  chatIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  chatIcon: {
    width: 20,
    height: 20,
    marginLeft: 8
  },
  securityMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  securityIcon: {
    width: 9,
    height: 9,
    marginRight: 6
  },
  securityText: {
    fontSize: 9,
    color: '#374957',
    marginRight: 10
  },
  safetyReminderBox: {
    backgroundColor: '#74ffa7',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  safetyReminderText: {
    fontSize: 9,
    color: '#636060cf'
  },
  sellerHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374957',
    flex: 1
  },
  highLevelTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#74ffa7',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 10
  },
  highLevelBadge: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#374957',
    marginRight: 5
  },
  highLevelText: {
    fontSize: 9,
    color: '#374957'
  },
  sellerAdsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  sellerAdImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10
  },
  sellerAdsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  sellerAdsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374957',
    marginRight: 8
  },
  sellerAdsArrow: {
    width: 10,
    height: 10,
    marginRight: 8
  },
  sellerAdsCount: {
    fontSize: 8,
    fontWeight: '600',
    color: '#374957'
  },
  alexanderProfileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 9,
    padding: 10,
    marginBottom: 20
  },
  alexanderProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15
  },
  alexanderDetails: {
    flex: 1
  },
  alexanderName: {
    fontSize: 15,
    color: '#374957',
    marginBottom: 4
  },
  alexanderTotalAds: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374957',
    marginBottom: 2
  },
  alexanderJoinDate: {
    fontSize: 8,
    fontWeight: '600',
    color: '#636060a6'
  },
  sellerReviewsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  sellerReviewsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374957',
    marginRight: 8
  },
  sellerReviewsArrow: {
    width: 10,
    height: 10,
    marginRight: 8
  },
  sellerReviewsCount: {
    fontSize: 8,
    fontWeight: '600',
    color: '#374957'
  },
  overallRatingText: {
    fontSize: 64,
    fontWeight: '500',
    color: '#374957',
    marginBottom: 5
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 5
  },
  ratingStar: {
    width: 12,
    height: 12,
    marginRight: 2
  },
  reviewsCountText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#374957',
    marginBottom: 15
  },
  ratingBreakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  ratingBreakdownStars: {
    fontSize: 11,
    fontWeight: '500',
    color: '#374957',
    width: 20
  },
  ratingBreakdownBarContainer: {
    flex: 1,
    height: 10,
    marginHorizontal: 10,
    position: 'relative'
  },
  ratingBreakdownBarBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#d9d9d9',
    borderRadius: 20
  },
  ratingBreakdownBarFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#374957',
    borderRadius: 20
  },
  ratingBreakdownPercentage: {
    fontSize: 10,
    fontWeight: '500',
    color: '#374957',
    width: 40,
    textAlign: 'right'
  },
  reviewFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  reviewFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8
  },
  reviewFilterIcon: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  reviewFilterText: {
    fontSize: 10,
    color: '#636060cf'
  },
  similarAdsSection: {
    padding: 20,
    paddingBottom: 100
  },
  similarAdRowLeft: {
    width: '50%',
    paddingRight: 8
  },
  similarAdRowRight: {
    width: '50%',
    paddingLeft: 8
  },
  similarAdCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15
  },
  similarAdImage: {
    width: '100%',
    height: 120
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
    paddingVertical: 3
  },
  similarAdLocationIcon: {
    width: 10,
    height: 10,
    marginRight: 3
  },
  similarAdLocationText: {
    fontSize: 9,
    color: '#374957',
    fontWeight: '500'
  },
  similarAdTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#374957',
    padding: 10
  },
  similarAdPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  similarAdCedi: {
    width: 8,
    height: 8,
    marginRight: 2
  },
  similarAdPrice: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374957',
    marginRight: 8
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
    justifyContent: 'center'
  },
  bottomNavContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  navItem: {
    alignItems: 'center'
  },
  navIcon: {
    width: 28,
    height: 28,
    marginBottom: 5
  },
  navText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#374957'
  }
});