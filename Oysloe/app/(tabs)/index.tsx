import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  Modal,
  PanResponder,
  KeyboardAvoidingView,
  Platform,
  Easing,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const { width } = Dimensions.get('window');

type Category = { id: number; name: string; icon?: any; isPlaceholder?: boolean };
type AdItem = { id: number; title: string; price: string; image: any; location: string };

const categories: Category[] = [
  { id: 1, name: 'Electronics', icon: require('@/oysloe-assets/Category icons/electronics.png') },
  { id: 2, name: 'Furniture', icon: require('@/oysloe-assets/Category icons/furniture.png') },
  { id: 3, name: 'Vehicle', icon: require('@/oysloe-assets/Category icons/vehicle.png') },
  { id: 4, name: 'Industry', icon: require('@/oysloe-assets/Category icons/industrial.png') },
  { id: 5, name: 'Fashion', icon: require('@/oysloe-assets/Category icons/fashion.png') },
  { id: 6, name: 'Grocery', icon: require('@/oysloe-assets/Category icons/grocery.png') },
  { id: 7, name: 'Sporting', icon: require('@/oysloe-assets/Category icons/games.png') },
  { id: 8, name: 'Cosmetics', icon: require('@/oysloe-assets/Category icons/cosmetics.png') },
  { id: 9, name: '', isPlaceholder: true },
  { id: 10, name: 'Properties', icon: require('@/oysloe-assets/Category icons/property.png') },
  { id: 11, name: 'Services', icon: require('@/oysloe-assets/Category icons/services.png') },
  { id: 12, name: '', isPlaceholder: true },
];

  const filterCategories = [
    { name: 'Electronics', icon: require('@/oysloe-assets/Category icons/electronics.png'), count: '456k' },
    { name: 'Vehicles', icon: require('@/oysloe-assets/Category icons/vehicle.png'), count: '234k' },
    { name: 'Fashion', icon: require('@/oysloe-assets/Category icons/fashion.png'), count: '189k' },
    { name: 'Property', icon: require('@/oysloe-assets/Category icons/property.png'), count: '567k' },
    { name: 'Sporting', icon: require('@/oysloe-assets/Category icons/games.png'), count: '123k' },
    { name: 'Industry', icon: require('@/oysloe-assets/Category icons/industrial.png'), count: '345k' },
    { name: 'Furniture', icon: require('@/oysloe-assets/Category icons/furniture.png'), count: '278k' },
    { name: 'Cosmetics', icon: require('@/oysloe-assets/Category icons/cosmetics.png'), count: '456k' },
    { name: 'Grocery', icon: require('@/oysloe-assets/Category icons/grocery.png'), count: '789k' },
  ];

  const popularRegions = [
    { name: 'Greater Accra', count: '879' },
    { name: 'Eastern region', count: '8799' },
    { name: 'Ashanti region', count: '98k' },
  ];

  const otherRegions = [
    { name: 'Savannah', count: '879' },
    { name: 'Afienya', count: '8799' },
    { name: 'Dowenya', count: '98k' },
    { name: 'Fashion', count: '879' },
    { name: 'Accra', count: '8799' },
    { name: 'Kwame Nkrumah Circle', count: '98k' },
    { name: 'Spintex', count: '98k' },
  ];

  const sublocations: { [key: string]: { popular: { name: string; count: string }[]; other: { name: string; count: string }[] } } = {
    'Greater Accra': {
      popular: [
        { name: 'Accra', count: '879' },
        { name: 'Kwame Nkrumah Circle', count: '8799' },
        { name: 'Spintex', count: '98k' },
      ],
      other: [
        { name: 'Kanieshie', count: '89799k' },
        { name: 'Afienya', count: '90k' },
        { name: 'Dowenya', count: '90' },
        { name: 'Fashion', count: '8k' },
        { name: 'Accra', count: '7k' },
        { name: 'Kwame Nkrumah Circle', count: '745' },
        { name: 'Spintex', count: '1k' },
      ],
    },
  };

const subcategories: { [key: string]: Array<{ name: string; count: string }> } = {
  Electronics: [
    { name: 'Smartphones', count: '98k' },
    { name: 'Feature phones', count: '879' },
    { name: 'Tablets', count: '8799' },
    { name: 'Smartwatches', count: '98k' },
    { name: 'Phone cases & covers', count: '98k' },
    { name: 'Screen protectors', count: '89799k' },
    { name: 'Laptop', count: '90k' },
    { name: 'Desktops', count: '90' },
    { name: 'Monitors', count: '8k' },
    { name: 'Computer parts ( RAM,SSD,CPU,GPU)', count: '7k' },
    { name: 'Storage Devices ( SSD, EXTERNA..', count: '7' },
    { name: 'Keyboards & Mice', count: '1k' },
  ],
};


const ads: AdItem[] = [
  {
    id: 1,
    title: 'Samsung AQ ultra smart...',
    price: '120 for 6 days',
    image: require('@/oysloe-assets/Ad images/storey.png'),
    location: 'Santamaria-kotobabi',
  },
  {
    id: 2,
    title: 'Samsung AQ ultra smart...',
    price: '1,670,000',
    image: require('@/oysloe-assets/Ad images/nice-inside.png'),
    location: 'Santamaria-kotobabi',
  },
  {
    id: 3,
    title: 'Samsung galaxy ultra 24...',
    price: '12 720 65,00',
    image: require('@/oysloe-assets/Ad images/nice-inside.png'),
    location: 'Santamaria-kotobabi',
  },
  {
    id: 4,
    title: 'Samsung AQ ultra smart...',
    price: '1,670,000',
    image: require('@/oysloe-assets/Ad images/grey-ocar.png'),
    location: 'Santamaria-kotobabi',
  },
];

const categoryStats = [
  { label: 'Electronics', value: '45k+', progress: 0.8 },
  { label: 'Vehicle', value: '200+', progress: 0.45 },
  { label: 'Furniture', value: '158+', progress: 0.62 },
  { label: 'Sporting', value: '100+', progress: 0.5 },
  { label: 'Fashion', value: '35+', progress: 0.28 },
];

type CircularProgressProps = {
  progress: number;
  size?: number;
  label: string;
  value: string;
  trigger?: number;
  onPress?: () => void;
};

const CircularProgress: React.FC<CircularProgressProps> = ({ progress, size = 64, label, value, trigger, onPress }) => {
  const animatedProgress = React.useRef(new Animated.Value(0)).current;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  React.useEffect(() => {
    animatedProgress.setValue(0);
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress, trigger, animatedProgress]);

  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <TouchableOpacity style={styles.statCard} activeOpacity={0.85} onPress={onPress}>
      <View style={[styles.statCircleWrapper, { width: size, height: size }]}>
        <Svg width={size} height={size}>
          <Circle cx={size / 2} cy={size / 2} r={radius} stroke="#E4E9F2" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1F344D"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
        <View style={styles.statValueWrapper}>
          <Text style={styles.statLabel}>{label}</Text>
          <Text style={styles.statValue}>{value}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Custom Price Slider Component
const PriceSlider = ({ priceRange, setPriceRange }: { priceRange: { min: number; max: number }; setPriceRange: (fn: (prev: { min: number; max: number }) => { min: number; max: number }) => void }) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderX, setSliderX] = useState(0);
  const sliderRef = useRef<View>(null);
  
  const MAX_VALUE = 1000000;
  
  const minPanResponder = useMemo(
    () => PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {},
      onPanResponderMove: (evt, gestureState) => {
        if (sliderWidth > 0) {
          const touchX = evt.nativeEvent.pageX - sliderX;
          const newPosition = Math.max(0, Math.min(1, touchX / sliderWidth));
          const newValue = Math.round(newPosition * MAX_VALUE);
          if (newValue <= priceRange.max) {
            setPriceRange(prev => ({ ...prev, min: newValue }));
          }
        }
      },
      onPanResponderRelease: () => {},
    }),
    [sliderWidth, sliderX, priceRange.max, setPriceRange]
  );
  
  const maxPanResponder = useMemo(
    () => PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {},
      onPanResponderMove: (evt, gestureState) => {
        if (sliderWidth > 0) {
          const touchX = evt.nativeEvent.pageX - sliderX;
          const newPosition = Math.max(0, Math.min(1, touchX / sliderWidth));
          const newValue = Math.round(newPosition * MAX_VALUE);
          if (newValue >= priceRange.min) {
            setPriceRange(prev => ({ ...prev, max: newValue }));
          }
        }
      },
      onPanResponderRelease: () => {},
    }),
    [sliderWidth, sliderX, priceRange.min, setPriceRange]
  );
  
  const minPercentage = (priceRange.min / MAX_VALUE) * 100;
  const maxPercentage = (priceRange.max / MAX_VALUE) * 100;
  
  return (
    <View 
      style={styles.sliderContainer}
      onLayout={(e) => {
        const layout = e.nativeEvent.layout;
        setSliderWidth(layout.width);
        // Measure the position on the screen
        (e.target as any).measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
          setSliderX(pageX);
        });
      }}
    >
      <View style={styles.sliderTrack}>
        <View 
          style={[
            styles.sliderTrackActive, 
            { 
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`
            }
          ]} 
        />
      </View>
      <View 
        {...minPanResponder.panHandlers}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        style={[styles.sliderThumb, { left: `${minPercentage}%` }]}
      />
      <View 
        {...maxPanResponder.panHandlers}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        style={[styles.sliderThumb, { left: `${maxPercentage}%` }]}
      />
    </View>
  );
};

export default function HomeScreen(): React.ReactElement {
  const [animationKey, setAnimationKey] = React.useState(0);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const TITLE_SCROLL_DISTANCE = 100;
  const NAV_SEARCH_WIDTH = 220;
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [showMainFilterModal, setShowMainFilterModal] = React.useState(false);
  const [showCategoryModal, setShowCategoryModal] = React.useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = React.useState(false);
  const [showLocationModal, setShowLocationModal] = React.useState(false);
  const [showSubLocationModal, setShowSubLocationModal] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [selectedRegion, setSelectedRegion] = React.useState<string>('');
  const [selectedLocation, setSelectedLocation] = React.useState<string>('');
  const [selectedPurpose, setSelectedPurpose] = React.useState<string>('');
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: 1000000 });
  const [subcategorySearch, setSubcategorySearch] = React.useState('');
  const [selectedSubcategories, setSelectedSubcategories] = React.useState<string[]>([]);
  const [selectedSubLocations, setSelectedSubLocations] = React.useState<string[]>([]);
  const [subLocationSearch, setSubLocationSearch] = React.useState('');
  const [canDismissModal, setCanDismissModal] = useState(false);
  const [isNavSearchVisible, setIsNavSearchVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const searchInputRef = React.useRef<TextInput | null>(null);
  const navSearchInputRef = React.useRef<TextInput | null>(null);
  
  // Animated values for draggable modals
  const modalTranslateY = useRef(new Animated.Value(0)).current;
  
  // PanResponder for drag gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          modalTranslateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150) {
          Animated.timing(modalTranslateY, {
            toValue: 1000,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            // Close whichever modal is open
            setShowMainFilterModal(false);
            setShowCategoryModal(false);
            setShowSubcategoryModal(false);
            setShowLocationModal(false);
            setShowSubLocationModal(false);
            modalTranslateY.setValue(0);
          });
        } else {
          Animated.spring(modalTranslateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;
  
  const titleScale = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE], outputRange: [1, 0.92], extrapolate: 'clamp' });
  const titleTranslateX = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE], outputRange: [0, -(NAV_SEARCH_WIDTH / 2 + 18)], extrapolate: 'clamp' });
  const headerSearchOpacity = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE * 0.9], outputRange: [1, 0], extrapolate: 'clamp' });
  const navSearchOpacity = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE * 0.9], outputRange: [0, 1], extrapolate: 'clamp' });
  const navSearchScale = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE], outputRange: [0.95, 1], extrapolate: 'clamp' });

  useEffect(() => {
    const interval = setInterval(() => setAnimationKey((k) => k + 1), 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      setIsNavSearchVisible(value > TITLE_SCROLL_DISTANCE * 0.6);
    });
    return () => scrollY.removeListener(listenerId);
  }, [scrollY]);

  const renderCategory = ({ item }: { item: Category }) => {
    if (item.isPlaceholder) {
      return <View style={[styles.categoryItem, { opacity: 0 }]} key={item.id} />;
    }

    return (
      <TouchableOpacity style={styles.categoryItem} key={item.id}>
        <View style={styles.categoryCard}>
          <View style={styles.categoryIconContainer}>
            <Image source={item.icon} style={styles.categoryIcon} />
          </View>
        </View>
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  // filter UI removed

  const renderAd = ({ item }: { item: AdItem }) => (
      <TouchableOpacity
      style={styles.adCard}
      onPress={() => router.push('/ad-details')}
    >
      <Image source={item.image} style={styles.adImage} />
      {/* Make location area non-propagating: capture presses here and do nothing so parent handlers don't open region sheets */}
      <TouchableOpacity style={styles.locationButton} activeOpacity={0.8} onPress={() => { /* no-op */ }}>
        <Image source={require('@/oysloe-assets/Ad details screen/map.png')} style={styles.locationIcon} />
        <Text style={styles.locationText}>{item.location}</Text>
      </TouchableOpacity>
      <Text style={styles.adTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.adPrice}> {item.price}</Text>
    </TouchableOpacity>
  );

  const openCategorySheet = () => {
    setShowMainFilterModal(true);
    setCanDismissModal(false);
    // Enable overlay dismiss slightly after open to avoid same-tap close
    setTimeout(() => setCanDismissModal(true), 200);
  };

  const handleStatPress = (label: string) => {
    setSelectedCategory(label);
  };

  return (
    <>
    <View style={styles.container}>
      <Animated.View style={[styles.fixedNavBar] as any}>
        <Animated.Text
          style={[
            styles.appTitle,
            {
              transform: [{ scale: titleScale }, { translateX: titleTranslateX }],
            }
          ]}
        >
          Oysloe
        </Animated.Text>

        <Animated.View
          pointerEvents={isNavSearchVisible ? 'auto' : 'none'}
          style={[styles.navSearchContainer, { opacity: navSearchOpacity, transform: [{ scale: navSearchScale }] }] as any}
        >
          <LinearGradient colors={["#60F7A3", "#FF6D6D"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.navSearchGradient}>
            <View style={styles.navSearchInner}>
              <Image source={require('@/oysloe-assets/Ad details screen/search.png')} style={[styles.searchIcon, { marginRight: 8, width: 16, height: 16 }]} />
              <TextInput
                ref={navSearchInputRef}
                style={styles.navSearchInput}
                placeholder="Search anything up for good"
                placeholderTextColor="#7A8699"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                returnKeyType="search"
              />
            </View>
          </LinearGradient>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
      >
        <View style={styles.header}>
          <Animated.View pointerEvents={isNavSearchVisible ? 'none' : 'auto'} style={[styles.searchWrapper, { opacity: headerSearchOpacity }]}>
            <LinearGradient
              colors={["#60F7A3", "#FF6D6D"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.searchGradientBorder}
            >
              <View style={styles.searchContainer}>
                <Image source={require('@/oysloe-assets/Ad details screen/search.png')} style={styles.searchIcon} />
                <TextInput
                  ref={searchInputRef}
                  style={styles.searchInput}
                  placeholder="Search anything up for good"
                  placeholderTextColor="#7A8699"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </View>
            </LinearGradient>
          </Animated.View>
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList data={categories} renderItem={renderCategory} keyExtractor={(item) => item.id.toString()} numColumns={4} scrollEnabled={false} contentContainerStyle={styles.categoriesGrid} />
        </View>

        <View style={styles.exploreSection}>
          <View style={styles.exploreHeader}>
            <Text style={styles.exploreTitle}>Explore Ads</Text>
            <TouchableOpacity style={styles.showAllButton}>
              <Text style={styles.showAllText}>Show All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            {categoryStats.map((stat) => (
              <CircularProgress
                key={`${stat.label}-${animationKey}`}
                progress={stat.progress}
                label={stat.label}
                value={stat.value}
                trigger={animationKey}
                onPress={() => handleStatPress(stat.label)}
              />
            ))}
          </View>

          {ads.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Image 
                source={require('@/oysloe-assets/Ad details screen/no-data.png')} 
                style={styles.noDataImage}
              />
              <Text style={styles.noDataText}>No Ads to show</Text>
            </View>
          ) : (
            <FlatList data={ads} renderItem={renderAd} keyExtractor={(item) => item.id.toString()} numColumns={2} scrollEnabled={false} contentContainerStyle={styles.adsGrid} columnWrapperStyle={styles.adRow} />
          )}
        </View>
  </Animated.ScrollView>
    </View>

      {/* Main Filter Modal */}
      <Modal
        visible={showMainFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMainFilterModal(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => { if (canDismissModal) setShowMainFilterModal(false); }}
          >
            <Animated.View 
              style={[
                styles.modalContent, 
                { transform: [{ translateY: modalTranslateY }] }
              ]} 
              onStartShouldSetResponder={() => true}
            >
              <View {...panResponder.panHandlers} style={{ alignItems: 'center', paddingVertical: 10 }}>
                <View style={styles.modalHandle} />
              </View>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter</Text>
              </View>
              <ScrollView style={styles.modalList} keyboardShouldPersistTaps="handled">
              {/* Category */}
              <TouchableOpacity 
                style={styles.filterOption}
                onPress={() => {
                  setShowMainFilterModal(false);
                  setCanDismissModal(false);
                  setTimeout(() => {
                    setShowCategoryModal(true);
                    setTimeout(() => setCanDismissModal(true), 200);
                  }, 300);
                }}
              >
                <Text style={styles.filterOptionLabel}>Category</Text>
                <View style={styles.filterOptionRight}>
                  <Text style={styles.filterOptionValue}>{selectedCategory || 'Electronics'}</Text>
                  <Text style={styles.modalItemArrow}>›</Text>
                </View>
              </TouchableOpacity>

              {/* Locations */}
              <TouchableOpacity 
                style={styles.filterOption}
                onPress={() => {
                  setShowMainFilterModal(false);
                  setCanDismissModal(false);
                  setTimeout(() => {
                    setShowLocationModal(true);
                    setTimeout(() => setCanDismissModal(true), 200);
                  }, 300);
                }}
              >
                <Text style={styles.filterOptionLabel}>Locations</Text>
                <View style={styles.filterOptionRight}>
                  <Text style={styles.filterOptionValue}>{selectedRegion || 'Accra-Lashibi'}</Text>
                  <Text style={styles.modalItemArrow}>›</Text>
                </View>
              </TouchableOpacity>

              {/* Ad purpose */}
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionLabel}>Ad purpose</Text>
                <View style={styles.filterOptionRight}>
                  <Text style={styles.filterOptionValue}>Electronics</Text>
                  <Text style={styles.modalItemArrow}>›</Text>
                </View>
              </TouchableOpacity>

              {/* Highlight */}
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionLabel}>Highlight</Text>
                <View style={styles.filterOptionRight}>
                  <Text style={styles.filterOptionValue}>Accra-Lashibi</Text>
                  <Text style={styles.modalItemArrow}>›</Text>
                </View>
              </TouchableOpacity>

              {/* Price */}
              <View style={styles.priceSection}>
                <Text style={styles.filterOptionLabel}>Price</Text>
                <PriceSlider priceRange={priceRange} setPriceRange={setPriceRange} />
                <View style={styles.priceInputs}>
                  <View style={styles.priceInputContainer}>
                    <Text style={styles.currencySymbol}>₵</Text>
                    <TextInput 
                      style={styles.priceInput}
                      value={priceRange.min.toLocaleString()}
                      onChangeText={(text) => {
                        const value = parseInt(text.replace(/,/g, '')) || 0;
                        setPriceRange(prev => ({ ...prev, min: Math.min(value, prev.max) }));
                      }}
                      placeholder="0"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="numeric"
                    />
                  </View>
                  <Text style={styles.priceSeparator}>-</Text>
                  <View style={styles.priceInputContainer}>
                    <Text style={styles.currencySymbol}>₵</Text>
                    <TextInput 
                      style={styles.priceInput}
                      value={priceRange.max.toLocaleString()}
                      onChangeText={(text) => {
                        const value = parseInt(text.replace(/,/g, '')) || 0;
                        setPriceRange(prev => ({ ...prev, max: Math.max(value, prev.min) }));
                      }}
                      placeholder="1,000,000"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>

              {/* Brand */}
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionLabel}>Brand</Text>
                <View style={styles.filterOptionRight}>
                  <Text style={styles.filterOptionValue}>Electronics</Text>
                  <Text style={styles.modalItemArrow}>›</Text>
                </View>
              </TouchableOpacity>

              {/* Size */}
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionLabel}>Size</Text>
                <View style={styles.filterOptionRight}>
                  <Text style={styles.filterOptionValue}>Accra-Lashibi</Text>
                  <Text style={styles.modalItemArrow}>›</Text>
                </View>
              </TouchableOpacity>

              {/* Size (duplicate as shown in image) */}
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionLabel}>Size</Text>
                <View style={styles.filterOptionRight}>
                  <Text style={styles.filterOptionValue}>Accra-Lashibi</Text>
                  <Text style={styles.modalItemArrow}>›</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.clearAllButton}
                onPress={() => {
                  setSelectedCategory('');
                  setSelectedLocation('');
                  // Clear all filters
                }}
              >
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={() => {
                  setShowMainFilterModal(false);
                  // View all with selected filters
                }}
              >
                <Text style={styles.viewAllText}>View all (456k)</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>

      {/* Category Selection Modal */}
      <Modal
        visible={showCategoryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => { if (canDismissModal) setShowCategoryModal(false); }}
        >
          <Animated.View 
            style={[
              styles.modalContent, 
              { transform: [{ translateY: modalTranslateY }] }
            ]} 
            onStartShouldSetResponder={() => true}
          >
            <View {...panResponder.panHandlers} style={{ alignItems: 'center', paddingVertical: 10 }}>
              <View style={styles.modalHandle} />
            </View>
            <View style={styles.subcategoryHeader}>
              <TouchableOpacity onPress={() => {
                setShowCategoryModal(false);
                setTimeout(() => setShowMainFilterModal(true), 300);
              }}>
                <Text style={styles.backArrow}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Categories</Text>
              <View style={{ width: 20 }} />
            </View>
            <ScrollView style={styles.modalList}>
              {filterCategories.map((category, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCategory(category.name);
                    setShowCategoryModal(false);
                    setTimeout(() => setShowSubcategoryModal(true), 300);
                  }}
                >
                  <View style={styles.modalItemLeft}>
                    <Image source={category.icon} style={styles.modalItemIcon} />
                    <Text style={styles.modalItemText}>{category.name}</Text>
                  </View>
                  <View style={styles.modalItemRight}>
                    <Text style={styles.modalItemCount}>{category.count}</Text>
                    <Text style={styles.modalItemArrow}>›</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.clearAllButton}
                onPress={() => {
                  setShowCategoryModal(false);
                  // Clear all filters
                }}
              >
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewAllButton} onPress={() => {
                setShowCategoryModal(false);
                // View all ads
              }}>
                <Text style={styles.viewAllText}>View all (456k)</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* Location/Region Selection Modal */}
      <Modal
        visible={showLocationModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLocationModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => { if (canDismissModal) setShowLocationModal(false); }}
        >
          <Animated.View 
            style={[
              styles.modalContent, 
              { transform: [{ translateY: modalTranslateY }] }
            ]} 
            onStartShouldSetResponder={() => true}
          >
            <View {...panResponder.panHandlers} style={{ alignItems: 'center', paddingVertical: 10 }}>
              <View style={styles.modalHandle} />
            </View>
            <View style={styles.subcategoryHeader}>
              <TouchableOpacity onPress={() => {
                setShowLocationModal(false);
                setTimeout(() => setShowMainFilterModal(true), 300);
              }}>
                <Text style={styles.backArrow}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Select Region</Text>
              <View style={{ width: 20 }} />
            </View>
            <ScrollView style={styles.modalList}>
              {/* Popular regions header */}
              <Text style={styles.regionHeader}>Popular regions</Text>
              
              {popularRegions.map((region, index) => (
                <TouchableOpacity 
                  key={`popular-${index}`}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedRegion(region.name);
                    setShowLocationModal(false);
                    setTimeout(() => setShowSubLocationModal(true), 300);
                  }}
                >
                  <View style={styles.modalItemLeft}>
                    <Text style={styles.modalItemText}>{region.name}</Text>
                  </View>
                  <View style={styles.modalItemRight}>
                    <Text style={styles.modalItemCount}>{region.count}</Text>
                    <Text style={styles.modalItemArrow}>›</Text>
                  </View>
                </TouchableOpacity>
              ))}

              {/* Other regions header */}
              <Text style={styles.regionHeader}>Other regions</Text>
              
              {otherRegions.map((region, index) => (
                <TouchableOpacity 
                  key={`other-${index}`}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedRegion(region.name);
                    setShowLocationModal(false);
                    setTimeout(() => setShowSubLocationModal(true), 300);
                  }}
                >
                  <View style={styles.modalItemLeft}>
                    <Text style={styles.modalItemText}>{region.name}</Text>
                  </View>
                  <View style={styles.modalItemRight}>
                    <Text style={styles.modalItemCount}>{region.count}</Text>
                    <Text style={styles.modalItemArrow}>›</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.clearAllButton}
                onPress={() => {
                  setSelectedRegion('');
                  setSelectedLocation('');
                }}
              >
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={() => {
                  setShowLocationModal(false);
                }}
              >
                <Text style={styles.viewAllText}>View all (456k)</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* SubLocation Modal */}
      <Modal
        visible={showSubLocationModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSubLocationModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => { if (canDismissModal) setShowSubLocationModal(false); }}
        >
          <Animated.View 
            style={[
              styles.modalContent, 
              { transform: [{ translateY: modalTranslateY }] }
            ]} 
            onStartShouldSetResponder={() => true}
          >
            <View {...panResponder.panHandlers} style={{ alignItems: 'center', paddingVertical: 10 }}>
              <View style={styles.modalHandle} />
            </View>
            <View style={styles.subcategoryHeader}>
              <TouchableOpacity onPress={() => {
                setShowSubLocationModal(false);
                setTimeout(() => setShowLocationModal(true), 300);
              }}>
                <Text style={styles.backArrow}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedRegion}</Text>
              <View style={{ width: 20 }} />
            </View>
            
            {/* Search Bar */}
            <View style={styles.searchContainer2}>
              <Image source={require('@/oysloe-assets/Ad details screen/search.png')} style={styles.searchIcon2} />
              <TextInput
                style={styles.searchInput2}
                placeholder="Search"
                placeholderTextColor="#9CA3AF"
                value={subLocationSearch}
                onChangeText={setSubLocationSearch}
              />
            </View>

            <ScrollView style={styles.modalList}>
              {/* Popular areas */}
              <Text style={styles.regionHeader}>Popular areas</Text>
              {sublocations[selectedRegion]?.popular
                .filter(loc => loc.name.toLowerCase().includes(subLocationSearch.toLowerCase()))
                .map((location, index) => (
                  <TouchableOpacity 
                    key={`popular-${index}`}
                    style={styles.modalItem}
                    onPress={() => {
                      if (selectedSubLocations.includes(location.name)) {
                        setSelectedSubLocations(selectedSubLocations.filter(item => item !== location.name));
                      } else {
                        setSelectedSubLocations([...selectedSubLocations, location.name]);
                      }
                    }}
                  >
                    <View style={styles.modalItemLeft}>
                      <Text style={styles.modalItemText}>{location.name}</Text>
                    </View>
                    <View style={styles.modalItemRight}>
                      <Text style={styles.modalItemCount}>{location.count}</Text>
                      <View style={[
                        styles.checkbox,
                        selectedSubLocations.includes(location.name) && styles.checkboxChecked
                      ]}>
                        {selectedSubLocations.includes(location.name) && (
                          <Text style={styles.checkmark}>✓</Text>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              }

              {/* Other areas */}
              <Text style={styles.regionHeader}>Other areas</Text>
              {sublocations[selectedRegion]?.other
                .filter(loc => loc.name.toLowerCase().includes(subLocationSearch.toLowerCase()))
                .map((location, index) => (
                  <TouchableOpacity 
                    key={`other-${index}`}
                    style={styles.modalItem}
                    onPress={() => {
                      if (selectedSubLocations.includes(location.name)) {
                        setSelectedSubLocations(selectedSubLocations.filter(item => item !== location.name));
                      } else {
                        setSelectedSubLocations([...selectedSubLocations, location.name]);
                      }
                    }}
                  >
                    <View style={styles.modalItemLeft}>
                      <Text style={styles.modalItemText}>{location.name}</Text>
                    </View>
                    <View style={styles.modalItemRight}>
                      <Text style={styles.modalItemCount}>{location.count}</Text>
                      <View style={[
                        styles.checkbox,
                        selectedSubLocations.includes(location.name) && styles.checkboxChecked
                      ]}>
                        {selectedSubLocations.includes(location.name) && (
                          <Text style={styles.checkmark}>✓</Text>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.clearAllButton}
                onPress={() => {
                  setSelectedSubLocations([]);
                }}
              >
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={() => {
                  if (selectedSubLocations.length > 0) {
                    setSelectedLocation(selectedSubLocations[0]);
                  }
                  setShowSubLocationModal(false);
                }}
              >
                <Text style={styles.viewAllText}>View all (456k)</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* Subcategory Modal */}
      <Modal
        visible={showSubcategoryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSubcategoryModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => { if (canDismissModal) setShowSubcategoryModal(false); }}
        >
          <Animated.View 
            style={[
              styles.modalContent, 
              { transform: [{ translateY: modalTranslateY }] }
            ]} 
            onStartShouldSetResponder={() => true}
          >
            <View {...panResponder.panHandlers} style={{ alignItems: 'center', paddingVertical: 10 }}>
              <View style={styles.modalHandle} />
            </View>
            <View style={styles.subcategoryHeader}>
              <TouchableOpacity onPress={() => {
                setShowSubcategoryModal(false);
                setTimeout(() => setShowCategoryModal(true), 300);
              }}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedCategory}</Text>
              <View style={{ width: 24 }} />
            </View>
            
            <View style={styles.searchContainer2}>
              <Image source={require('@/oysloe-assets/Ad details screen/search.png')} style={styles.searchIcon2} />
              <TextInput
                style={styles.searchInput2}
                placeholder="Search"
                placeholderTextColor="#9CA3AF"
                value={subcategorySearch}
                onChangeText={setSubcategorySearch}
              />
            </View>

            <ScrollView style={styles.modalList}>
              {subcategories[selectedCategory]?.filter(sub => 
                sub.name.toLowerCase().includes(subcategorySearch.toLowerCase())
              ).map((subcategory, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.modalItem}
                  onPress={() => {
                    const isSelected = selectedSubcategories.includes(subcategory.name);
                    if (isSelected) {
                      setSelectedSubcategories(prev => prev.filter(s => s !== subcategory.name));
                    } else {
                      setSelectedSubcategories(prev => [...prev, subcategory.name]);
                    }
                  }}
                >
                  <Text style={styles.modalItemText}>{subcategory.name}</Text>
                  <View style={styles.modalItemRight}>
                    <Text style={styles.modalItemCount}>{subcategory.count}</Text>
                    <View style={[
                      styles.checkbox,
                      selectedSubcategories.includes(subcategory.name) && styles.checkboxChecked
                    ]}>
                      {selectedSubcategories.includes(subcategory.name) && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.clearAllButton}
                onPress={() => setSelectedSubcategories([])}
              >
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={() => {
                  setShowSubcategoryModal(false);
                  // View all with selected filters
                }}
              >
                <Text style={styles.viewAllText}>View all (46k)</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    
    {/* Floating Filter button - above tab bar */}
    <TouchableOpacity
      style={styles.filterFloatingButton}
      activeOpacity={0.85}
      onPress={() => openCategorySheet()}
    >
      <Text style={styles.filterFloatingText}>Filter</Text>
      <Text style={styles.filterFloatingIcon}>⇅</Text>
    </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 100, paddingBottom: 30, backgroundColor: '#fff' },
  fixedNavBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 120, paddingTop: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 16, backgroundColor: '#ffffff', zIndex: 20 },
  navSearchContainer: { position: 'absolute', right: 16, top: 40, width: 220, height: 40, alignItems: 'flex-end', justifyContent: 'center' },
  navSearchGradient: { borderRadius: 20, padding: 2, width: 220, height: 40 },
  navSearchInner: { flex: 1, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', paddingHorizontal: 10 },
  navSearchInput: { flex: 1, fontSize: 13, color: '#1F2933', paddingVertical: 0 },
  searchWrapper: { marginTop: 28, paddingBottom: 18 },
  // pill-style filters removed

  // small filter pills removed
  appTitle: { position: 'absolute', left: 0, right: 0, top: 40, fontSize: 40, fontWeight: '500', color: '#374957', textAlign: 'center' },
    searchGradientBorder: { borderRadius: 30, padding: 2, shadowColor: '#58C98F', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 12 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 28, paddingHorizontal: 16, paddingVertical: 12 },
    searchIcon: { width: 20, height: 20, marginRight: 10, tintColor: '#4D5766' },
    searchInput: { flex: 1, fontSize: 16, color: '#1F2933' },
  categoriesContainer: { paddingHorizontal: 8, marginBottom: 30 },
  categoriesGrid: { justifyContent: 'space-between' },
  categoryItem: { width: (width - 60) / 4, alignItems: 'center', marginBottom: 20, marginHorizontal: 6 },
  categoryCard: { width: (width - 60) / 4 - 12, height: (width - 60) / 4 - 12, borderRadius: 14, backgroundColor: '#f7f8f9', alignItems: 'center', justifyContent: 'center', marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.04, shadowRadius: 10, elevation: 2 },
  categoryIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  categoryIcon: { width: 34, height: 34 },
  categoryText: { fontSize: 12, color: '#51565C', textAlign: 'center', marginTop: 6 },
  exploreSection: { paddingHorizontal: 20, paddingBottom: 100 },
  exploreHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  exploreTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  showAllButton: { backgroundColor: '#f0f0f0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  showAllText: { fontSize: 12, color: '#666' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  statCard: { alignItems: 'center', marginHorizontal: 4, width: (width - 60) / 5 },
  statCircleWrapper: { justifyContent: 'center', alignItems: 'center', position: 'relative' },
  statValueWrapper: { position: 'absolute', alignItems: 'center', justifyContent: 'center', top: 0, left: 0, right: 0, bottom: 0 },
  statLabel: { fontSize: 9, color: '#6B7280', textAlign: 'center', marginBottom: 2 },
  statValue: { fontSize: 12, fontWeight: '700', color: '#1F344D' },
  // filtersContainer/filtersContent removed (filters UI deleted)
  adsGrid: { paddingBottom: 20 },
  adRow: { justifyContent: 'space-between', marginBottom: 15 },
  adCard: { width: (width - 50) / 2, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  adImage: { width: '100%', height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  locationButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6 },
  locationIcon: { width: 12, height: 12, marginRight: 4, tintColor: '#666' },
  locationText: { fontSize: 10, color: '#666', fontWeight: '400' },
  adTitle: { fontSize: 14, color: '#333', paddingHorizontal: 10, paddingTop: 4, paddingBottom: 4, fontWeight: '500' },
  adPrice: { fontSize: 12, color: '#666', paddingHorizontal: 10, paddingBottom: 10, fontWeight: '600' },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '70%',
    paddingBottom: 20,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#142032',
  },
  modalList: {
    paddingHorizontal: 20,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalItemIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  modalItemText: {
    fontSize: 15,
    color: '#142032',
    fontWeight: '400',
  },
  modalItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalItemCount: {
    fontSize: 14,
    color: '#9CA3AF',
    marginRight: 8,
  },
  modalItemArrow: {
    fontSize: 20,
    color: '#9CA3AF',
    fontWeight: '300',
  },
  regionHeader: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '400',
    paddingVertical: 12,
    paddingTop: 16,
    backgroundColor: '#F9FAFB',
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  clearAllButton: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  clearAllText: {
    fontSize: 14,
    color: '#142032',
    fontWeight: '400',
  },
  viewAllButton: {
    backgroundColor: '#142032',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  viewAllText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  filterFloatingButton: {
    position: 'absolute',
    left: '50%',
    marginLeft: -60,
    bottom: 10,
    height: 46,
    width: 120,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 50,
  },
  filterFloatingText: { fontSize: 14, color: '#374957', fontWeight: '600', marginRight: 8 },
  filterFloatingIcon: { fontSize: 12, color: '#6B7280' },
  subcategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backArrow: {
    fontSize: 20,
    color: '#142032',
    fontWeight: '400',
  },
  searchContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  searchIcon2: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#9CA3AF',
  },
  searchInput2: {
    flex: 1,
    fontSize: 14,
    color: '#142032',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  checkboxChecked: {
    backgroundColor: '#142032',
    borderColor: '#142032',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterOptionLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#142032',
  },
  filterOptionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterOptionValue: {
    fontSize: 15,
    fontWeight: '400',
    color: '#9CA3AF',
    marginRight: 8,
  },
  priceSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sliderContainer: {
    position: 'relative',
    height: 60,
    marginVertical: 16,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  sliderTrack: {
    position: 'absolute',
    left: 4,
    right: 4,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    top: '50%',
    marginTop: -3,
  },
  sliderTrackActive: {
    position: 'absolute',
    height: 6,
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginLeft: -12,
    marginTop: -9,
    borderWidth: 3,
    borderColor: '#10B981',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  priceInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  priceInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  currencySymbol: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginRight: 6,
  },
  priceInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#142032',
    padding: 0,
  },
  priceSeparator: {
    fontSize: 18,
    fontWeight: '500',
    color: '#9CA3AF',
    marginHorizontal: 16,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  noDataImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
    opacity: 0.6,
  },
  noDataText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '400',
    textAlign: 'center',
  },
});
