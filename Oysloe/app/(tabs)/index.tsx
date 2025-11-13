import React, { useEffect, useRef, useState } from 'react';
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
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const vw = (percent: number) => (width * percent) / 100;
const vh = (percent: number) => (height * percent) / 100;

// Types
type Category = { id: number; name: string; icon?: any; isPlaceholder?: boolean };
type Filter = { name: string; count: string; progress: number };
type AdItem = { id: number; title: string; price: string; image: any; location: string };
type SearchFilter = { id: string; label: string; icon?: any };

const categories: Category[] = [
  { id: 1, name: 'Electronics', icon: require('@/oysloe-assets/Category icons/electronics.png') },
  { id: 2, name: 'Furniture', icon: require('@/oysloe-assets/Category icons/furniture.png') },
  { id: 3, name: 'Vehicle', icon: require('@/oysloe-assets/Category icons/vehicle.png') },
  { id: 4, name: 'Industry', icon: require('@/oysloe-assets/Category icons/industrial.png') },
  { id: 5, name: 'Fashion', icon: require('@/oysloe-assets/Category icons/fashion.png') },
  { id: 6, name: 'Grocery', icon: require('@/oysloe-assets/Category icons/grocery.png') },
  { id: 7, name: 'Sporting', icon: require('@/oysloe-assets/Category icons/games.png') },
  { id: 8, name: 'Cosmetics', icon: require('@/oysloe-assets/Category icons/cosmetics.png') },
  // Row 3: add placeholders so the two items sit centered in the third row (4 columns)
  { id: 9, name: '', isPlaceholder: true },
  { id: 10, name: 'Properties', icon: require('@/oysloe-assets/Category icons/property.png') },
  { id: 11, name: 'Services', icon: require('@/oysloe-assets/Category icons/services.png') },
  { id: 12, name: '', isPlaceholder: true },
];

const filters: Filter[] = [
  { name: 'Electronics', count: '45k+', progress: 0.85 },
  { name: 'Vehicle', count: '200+', progress: 0.75 },
  { name: 'Furniture', count: '158+', progress: 0.65 },
  { name: 'Sporting', count: '100+', progress: 0.55 },
  { name: 'Fashion', count: '35+', progress: 0.15 },
];

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
  {
    id: 5,
    title: 'Modern house',
    price: '120',
    image: require('@/oysloe-assets/Ad images/3d-car-city-street.jpg'),
    location: 'Santamaria',
  },
  {
    id: 6,
    title: 'Spacious interior',
    price: '1,670,000',
    image: require('@/oysloe-assets/Ad images/storey.png'),
    location: 'Kotobabi',
  },
];

const exploreAds: AdItem[] = ads.slice(0, 4);

const searchFiltersData: SearchFilter[] = [
  { id: 'category', label: 'Category', icon: require('@/oysloe-assets/Ad details screen/category.png') },
  { id: 'locations', label: 'Locations', icon: require('@/oysloe-assets/Ad details screen/map.png') },
  { id: 'ad-purpose', label: 'Ad Purpose', icon: require('@/oysloe-assets/Ad details screen/ad-purpose.png') },
  { id: 'highlights', label: 'Highlights', icon: require('@/oysloe-assets/Ad details screen/highlight.png') },
  { id: 'pricing', label: 'Pricing', icon: require('@/oysloe-assets/Ad details screen/Pricing filter.png') },
  { id: 'parameter-1', label: 'Parameter 1', icon: require('@/oysloe-assets/Ad details screen/parameter.png') },
  { id: 'parameter-2', label: 'Parameter 2', icon: require('@/oysloe-assets/Ad details screen/parameter.png') },
  { id: 'parameter-3', label: 'Parameter 3', icon: require('@/oysloe-assets/Ad details screen/parameter.png') },
];

// (Removed filter buttons grid)

// Main categories for bottom sheet
const mainCategories = ['Electronics', 'Vehicles', 'Fashion', 'Property', 'Sporting', 'Industry', 'Furniture', 'Cosmetics'];

// Electronics subcategories
const electronicsSubcategories = [
  'Smartphones',
  'Feature phones',
  'Tablets',
  'Smartwatches',
  'Phone cases & covers',
  'Screen protectors',
  'Laptop',
  'Desktops',
  'Monitors',
  'Computer parts (RAM, SSD, CPU, GPU)',
  'Storage Devices (SSD, EXTERNAL HDD & etc)',
  'Keyboards & Mice',
  'Headphones & Earbuds',
  'Routers, modems, & Switches',
];

type CircularProgressProps = { progress: number; size?: number; item: Filter };
const CircularProgress: React.FC<CircularProgressProps> = ({ progress, size = 65, item }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const borderWidth = 7;

  useEffect(() => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, { toValue: progress, duration: 1500, useNativeDriver: false }).start();
  }, [progress, animatedValue]);

  // Calculate rotation for first half (0-180 degrees) - using string values directly
  const firstHalfRotation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-90deg', '90deg', '90deg'],
  });
  
  // Calculate rotation for second half (180-360 degrees) - using string values directly
  const secondHalfRotation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-90deg', '-90deg', '270deg'],
  });

  // Opacity for second half
  const secondHalfOpacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 0.51, 1],
    outputRange: [0, 0, 1, 1],
  });

  return (
    <View style={[styles.progressContainer, { width: size, height: size }]}>
      <View style={[styles.progressBackground, { width: size, height: size, borderRadius: size / 2 }]}>
        {/* Background circle with thick grey border */}
        <View style={[styles.progressCircleBase, { width: size, height: size, borderRadius: size / 2, borderWidth: borderWidth }]} />
        
        {/* First half circle (0-180 degrees) */}
        <View style={[styles.progressArcWrapper, { width: size, height: size }]} pointerEvents="none">
          <Animated.View
            style={[
              {
                width: size / 2,
                height: size,
                borderTopWidth: borderWidth,
                borderRightWidth: borderWidth,
                borderTopColor: '#374957',
                borderRightColor: '#374957',
                borderTopRightRadius: size / 2,
                borderBottomRightRadius: size / 2,
                position: 'absolute',
                left: size / 2 - size / 4,
                top: 0,
                transform: [{ rotate: firstHalfRotation }, { translateX: size / 4 }],
              },
            ]}
          />
        </View>

        {/* Second half circle (180-360 degrees) */}
        <View style={[styles.progressArcWrapper, { width: size, height: size }]} pointerEvents="none">
          <Animated.View
            style={[
              {
                width: size / 2,
                height: size,
                borderTopWidth: borderWidth,
                borderRightWidth: borderWidth,
                borderTopColor: '#374957',
                borderRightColor: '#374957',
                borderTopRightRadius: size / 2,
                borderBottomRightRadius: size / 2,
                position: 'absolute',
                left: size / 2 - size / 4,
                top: 0,
                opacity: secondHalfOpacity,
                transform: [{ rotate: secondHalfRotation }, { translateX: size / 4 }],
              },
            ]}
          />
        </View>
        
        <View style={styles.progressContent}>
          <Text style={styles.progressText}>{item.name}</Text>
          <Text style={styles.progressCount}>{item.count}</Text>
        </View>
      </View>
    </View>
  );
};

export default function HomeScreen(): React.ReactElement {
  const [animationKey, setAnimationKey] = React.useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [showSubcategorySheet, setShowSubcategorySheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const TITLE_SCROLL_DISTANCE = 100;
  const NAV_SEARCH_WIDTH_PERCENT = 0.6;
  const NAV_SEARCH_WIDTH = width * NAV_SEARCH_WIDTH_PERCENT;
  const searchInputRef = React.useRef<TextInput | null>(null);
  const titleScale = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE], outputRange: [1, 0.92], extrapolate: 'clamp' });
  const titleTranslateX = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE], outputRange: [0, -(NAV_SEARCH_WIDTH / 2 + 18)], extrapolate: 'clamp' });
  const headerSearchOpacity = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE * 0.9], outputRange: [1, 0], extrapolate: 'clamp' });
  const navSearchOpacity = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE * 0.9], outputRange: [0, 1], extrapolate: 'clamp' });
  const navSearchScale = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE], outputRange: [0.95, 1], extrapolate: 'clamp' });

  // Animated rotation value for flowing border effect
  const borderRotation = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => setAnimationKey((k) => k + 1), 8000);
    return () => clearInterval(interval);
  }, []);

  // Animate border rotation continuously for flowing effect
  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(borderRotation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: false,
      })
    );
    rotateAnimation.start();
    return () => rotateAnimation.stop();
  }, [borderRotation]);

  // State-based gradient points for smooth updates
  const [gradientPoints, setGradientPoints] = useState({ start: { x: 0, y: 0 }, end: { x: 1, y: 1 } });

  useEffect(() => {
    const listenerId = borderRotation.addListener(({ value }) => {
      // Calculate points that flow around the border
      const angle = value * 2 * Math.PI;
      const offset = Math.PI / 4; // 45 degree offset for diagonal flow
      
      // Create points that move around the perimeter
      const startAngle = angle;
      const endAngle = angle + Math.PI; // Opposite side
      
      // Map angles to gradient coordinates (0-1 range)
      const startX = 0.5 + 0.5 * Math.cos(startAngle);
      const startY = 0.5 + 0.5 * Math.sin(startAngle);
      const endX = 0.5 + 0.5 * Math.cos(endAngle);
      const endY = 0.5 + 0.5 * Math.sin(endAngle);
      
      setGradientPoints({
        start: { 
          x: Math.max(0, Math.min(1, startX)), 
          y: Math.max(0, Math.min(1, startY)) 
        },
        end: { 
          x: Math.max(0, Math.min(1, endX)), 
          y: Math.max(0, Math.min(1, endY)) 
        },
      });
    });
    
    return () => {
      borderRotation.removeListener(listenerId);
    };
  }, [borderRotation]);

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

  const renderFilter = ({ item }: { item: Filter }) => (
    <TouchableOpacity style={styles.filterButton} key={`${item.name}-${animationKey}`}>
      <CircularProgress progress={item.progress} size={65} item={item} />
    </TouchableOpacity>
  );

  const renderAd = ({ item }: { item: AdItem }) => (
    <TouchableOpacity
      style={styles.adCard}
      onPress={() => {
        router.push('/(tabs)/ad-details');
      }}
    >
      <Image source={item.image} style={styles.adImage} />
      <View style={styles.locationButton}>
        <Image source={require('@/oysloe-assets/Ad details screen/map.png')} style={styles.locationIcon} />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
      <Text style={styles.adTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.adPrice}> {item.price}</Text>
    </TouchableOpacity>
  );

  return (
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

        <Animated.View style={[styles.navSearchContainer, { opacity: navSearchOpacity, transform: [{ scale: navSearchScale }] }] as any}>
          <TouchableOpacity style={{ width: '100%' }} activeOpacity={0.85} onPress={() => searchInputRef.current?.focus()}>
            <LinearGradient 
              colors={["#60F7A3", "#FF6D6D"]} 
              start={gradientPoints.start} 
              end={gradientPoints.end} 
              style={styles.navSearchGradient}
            >
              <View style={styles.navSearchInner}>
                <Image source={require('@/oysloe-assets/Ad details screen/search.png')} style={[styles.searchIcon, { marginRight: 8, width: 16, height: 16 }]} />
                <Text style={styles.navSearchText} numberOfLines={1}>Search anything up for good</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
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
          <Animated.View style={[styles.searchWrapper, { opacity: headerSearchOpacity }]}>
            <LinearGradient
              colors={["#60F7A3", "#FF6D6D"]}
              start={gradientPoints.start}
              end={gradientPoints.end}
              style={styles.searchGradientBorder}
            >
              <View style={styles.searchContainer}>
                <Image source={require('@/oysloe-assets/Ad details screen/search.png')} style={styles.searchIcon} />
                <TextInput 
                  ref={searchInputRef} 
                  style={styles.searchInput} 
                  placeholder="Search anything up for good" 
                  placeholderTextColor="#7A8699"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </View>
            </LinearGradient>
          </Animated.View>
        </View>

        {!isSearchFocused ? (
          <>
            <View style={styles.categoriesContainer}>
              <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id.toString()}
                numColumns={4}
                scrollEnabled={false}
                contentContainerStyle={styles.categoriesGrid}
              />
            </View>

            <View style={styles.exploreSection}>
              <View style={styles.exploreHeader}>
                <Text style={styles.exploreTitle}>Explore Ads</Text>
                <TouchableOpacity style={styles.showAllButton}>
                  <Text style={styles.showAllText}>Show All</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={filters}
                renderItem={renderFilter}
                keyExtractor={(_, i) => i.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filtersContainer}
                contentContainerStyle={styles.filtersContent}
              />

              <FlatList
                data={exploreAds}
                renderItem={renderAd}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={styles.adsGrid}
                columnWrapperStyle={styles.adRow}
              />
            </View>
          </>
        ) : (
          <View style={styles.searchResultsContainer}>
            <View style={styles.searchFiltersContainer}>
              {searchFiltersData.map((filter) => (
                <TouchableOpacity 
                  key={filter.id} 
                  style={styles.searchFilterPill} 
                  activeOpacity={0.85}
                  onPress={() => {
                    if (filter.id === 'category') {
                      setShowCategorySheet(true);
                    }
                  }}
                >
                  <Text style={styles.searchFilterLabel} numberOfLines={1}>
                    {filter.label}
                  </Text>
                  {filter.icon ? <Image source={filter.icon} style={styles.searchFilterIcon} /> : null}
                </TouchableOpacity>
              ))}
            </View>

            <FlatList
              data={ads}
              renderItem={renderAd}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.searchResultsGrid}
              columnWrapperStyle={styles.adRow}
            />
          </View>
        )}
  </Animated.ScrollView>

      {/* Category Selection Bottom Sheet */}
      <Modal visible={showCategorySheet} transparent animationType="slide" onRequestClose={() => setShowCategorySheet(false)}>
        <View style={styles.bottomSheetOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setShowCategorySheet(false)} />
          <View style={styles.bottomSheetContainer} pointerEvents="box-none">
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>Select Category</Text>
            <ScrollView style={styles.bottomSheetContent}>
              {mainCategories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.bottomSheetItem}
                  onPress={() => {
                    if (category === 'Electronics') {
                      setSelectedCategory(category);
                      setShowCategorySheet(false);
                      setShowSubcategorySheet(true);
                    } else {
                      setShowCategorySheet(false);
                    }
                  }}
                >
                  <Text style={styles.bottomSheetItemText}>{category}</Text>
                  {index < mainCategories.length - 1 && <View style={styles.bottomSheetDivider} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Electronics Subcategory Bottom Sheet */}
      <Modal visible={showSubcategorySheet} transparent animationType="slide" onRequestClose={() => setShowSubcategorySheet(false)}>
        <View style={styles.bottomSheetOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setShowSubcategorySheet(false)} />
          <View style={styles.bottomSheetContainer} pointerEvents="box-none">
            <View style={styles.bottomSheetHeader}>
              <TouchableOpacity onPress={() => { setShowSubcategorySheet(false); setShowCategorySheet(true); }}>
                <Text style={styles.bottomSheetBackArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.bottomSheetHeaderTitle}>{selectedCategory}</Text>
              <View style={{ width: 24 }} />
            </View>
            <ScrollView style={styles.bottomSheetContent}>
              {electronicsSubcategories.map((subcategory, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.bottomSheetItem}
                  onPress={() => setShowSubcategorySheet(false)}
                >
                  <Text style={styles.bottomSheetItemText}>{subcategory}</Text>
                  {index < electronicsSubcategories.length - 1 && <View style={styles.bottomSheetDivider} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 100, paddingBottom: 30, backgroundColor: '#fff' },
  fixedNavBar: { position: 'absolute', top: 0, left: 0, right: 0, height: vh(14), paddingTop: vh(4), alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: vw(4), backgroundColor: '#ffffff', zIndex: 20 },
  navSearchContainer: { position: 'absolute', right: vw(4), top: vh(7), width: '60%', height: vw(10), alignItems: 'stretch', justifyContent: 'center' },
  navSearchGradient: { borderRadius: vw(5), padding: vw(0.6), width: '100%', height: '100%' },
  navSearchInner: { flex: 1, borderRadius: vw(4.6), backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', paddingHorizontal: vw(2.6) },
  navSearchText: { flex: 1, fontSize: vw(3.4), color: '#7A8699' },
  searchWrapper: { marginTop: 28, paddingBottom: 18 },
  appTitle: { position: 'absolute', left: 0, right: 0, top: 50, fontSize: 40, fontWeight: '700', color: '#374957', textAlign: 'center', marginBottom: 16 },
    searchGradientBorder: { borderRadius: vw(8), padding: vw(0.6), shadowColor: '#58C98F', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 12 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: vw(7.2), paddingHorizontal: vw(4), paddingVertical: vw(3.2) },
    searchIcon: { width: vw(5), height: vw(5), marginRight: vw(2.6), tintColor: '#4D5766' },
    searchInput: { flex: 1, fontSize: vw(4.2), color: '#1F2933' },
  categoriesContainer: { paddingHorizontal: 8, marginBottom: 30 },
  categoriesGrid: { justifyContent: 'space-between' },
  categoryItem: { width: '23%', alignItems: 'center', marginBottom: 20 },
  categoryCard: { width: '100%', aspectRatio: 1, borderRadius: 14, backgroundColor: '#f7f8f9', alignItems: 'center', justifyContent: 'center', marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.04, shadowRadius: 10, elevation: 2 },
  categoryIconContainer: { width: '55%', aspectRatio: 1, borderRadius: vw(7), backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  categoryIcon: { width: '60%', height: undefined, aspectRatio: 1 },
  categoryText: { fontSize: 12, color: '#51565C', textAlign: 'center', marginTop: 6 },
  exploreSection: { paddingHorizontal: 20, paddingBottom: 100 },
  exploreHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  exploreTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  showAllButton: { backgroundColor: '#f0f0f0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  showAllText: { fontSize: 12, color: '#666' },
  filtersContainer: { marginBottom: 20 },
  filtersContent: { paddingRight: 20 },
  filterButton: { alignItems: 'center', marginRight: 8, width: 65 },
  progressContainer: { justifyContent: 'center', alignItems: 'center' },
  progressBackground: { backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' },
  progressCircleBase: { position: 'absolute', borderColor: '#e0e0e0' },
  progressArcWrapper: { position: 'absolute', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  progressArcHalf: { position: 'absolute', left: 0, top: 0 },
  progressContent: { position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  progressText: { fontSize: 9, color: '#333', fontWeight: '700', textAlign: 'center', lineHeight: 10 },
  progressCount: { fontSize: 8, color: '#666', fontWeight: '500', textAlign: 'center', lineHeight: 9 },
  adsGrid: { paddingBottom: 20 },
  adRow: { justifyContent: 'space-between', marginBottom: 15 },
  adCard: { width: '47%', backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  adImage: { width: '100%', aspectRatio: 1.6, borderTopLeftRadius: vw(2.6), borderTopRightRadius: vw(2.6) },
  locationButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: vw(2.6), paddingVertical: vw(1.6) },
  locationIcon: { width: vw(3.2), height: vw(3.2), marginRight: vw(1), tintColor: '#666' },
  locationText: { fontSize: vw(2.6), color: '#666', fontWeight: '400' },
  adTitle: { fontSize: 14, color: '#333', paddingHorizontal: 10, paddingTop: 4, paddingBottom: 4, fontWeight: '500' },
  adPrice: { fontSize: 12, color: '#666', paddingHorizontal: 10, paddingBottom: 10, fontWeight: '600' },
  searchResultsContainer: { paddingHorizontal: 20, paddingBottom: 100 },
  searchFiltersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchFilterPill: {
    width: '24%',
    minWidth: vw(22),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f7fa',
    borderRadius: vw(4.2),
    paddingVertical: vw(1.9),
    paddingHorizontal: vw(2.2),
    marginBottom: vw(2.2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  searchFilterIcon: {
    width: vw(3.8),
    height: vw(3.8),
    marginLeft: vw(1),
    resizeMode: 'contain',
    tintColor: '#7A8699',
  },
  searchFilterLabel: {
    flex: 1,
    fontSize: vw(1.9),
    color: '#374957',
    fontWeight: '600',
    marginRight: vw(0.8),
  },
  searchResultsGrid: { paddingBottom: 20 },
  
  // Filter buttons
  filterButtonsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    paddingHorizontal: 20,
    paddingTop: 8,
    justifyContent: 'space-between',
  },
  filterButtonCard: { 
    width: '23%',
    backgroundColor: '#fff', 
    borderRadius: vw(3), 
    paddingVertical: vw(3),
    paddingHorizontal: vw(2.6),
    marginBottom: vw(3),
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  filterButtonText: { 
    fontSize: vw(3.6), 
    color: '#374957', 
    fontWeight: '500',
    flex: 1,
  },
  filterButtonIcon: { 
    width: vw(4.2), 
    height: vw(4.2), 
    marginLeft: vw(2),
    flexShrink: 0,
    resizeMode: 'contain',
  },
  
  // Bottom sheets
  bottomSheetOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'flex-end' 
  },
  bottomSheetContainer: { 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 16, 
    borderTopRightRadius: 16, 
    maxHeight: '80%',
    paddingBottom: 20,
  },
  bottomSheetHandle: { 
    alignSelf: 'center', 
    width: 40, 
    height: 4, 
    borderRadius: 2, 
    backgroundColor: '#d1d5db', 
    marginTop: 8, 
    marginBottom: 16 
  },
  bottomSheetTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#374957', 
    paddingHorizontal: 20, 
    marginBottom: 16 
  },
  bottomSheetHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 8, 
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  bottomSheetBackArrow: { 
    fontSize: 24, 
    color: '#6b7280' 
  },
  bottomSheetHeaderTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#374957' 
  },
  bottomSheetContent: { 
    paddingHorizontal: 20 
  },
  bottomSheetItem: { 
    paddingVertical: 16 
  },
  bottomSheetItemText: { 
    fontSize: 16, 
    color: '#374957' 
  },
  bottomSheetDivider: { 
    height: 1, 
    backgroundColor: '#e5e7eb', 
    marginTop: 16 
  },
  bottomSheetSectionHeader: { 
    fontSize: 14, 
    color: '#9ca3af', 
    fontWeight: '500', 
    marginBottom: 12,
    marginTop: 8,
  },
});
