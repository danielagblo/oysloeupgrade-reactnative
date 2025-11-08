import React, { useEffect, useRef } from 'react';
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
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Types
type Category = { id: number; name: string; icon: any };
type Filter = { name: string; count: string; progress: number };
type AdItem = { id: number; title: string; price: string; image: any; location: string };

const categories: Category[] = [
  { id: 1, name: 'Electronics', icon: require('@/oysloe-assets/Category icons/electronics.png') },
  { id: 2, name: 'Furniture', icon: require('@/oysloe-assets/Category icons/furniture.png') },
  { id: 3, name: 'Vehicles', icon: require('@/oysloe-assets/Category icons/vehicle.png') },
  { id: 4, name: 'Industry', icon: require('@/oysloe-assets/Category icons/industrial.png') },
  { id: 5, name: 'Fashion', icon: require('@/oysloe-assets/Category icons/fashion.png') },
  { id: 6, name: 'Grocery', icon: require('@/oysloe-assets/Category icons/grocery.png') },
  { id: 7, name: 'Sporting', icon: require('@/oysloe-assets/Category icons/games.png') },
  { id: 8, name: 'Property', icon: require('@/oysloe-assets/Category icons/property.png') },
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
];

type CircularProgressProps = { progress: number; size?: number; item: Filter };
const CircularProgress: React.FC<CircularProgressProps> = ({ progress, size = 50, item }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const rotate = animatedValue.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] });

  useEffect(() => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, { toValue: progress * 360, duration: 1200, useNativeDriver: true }).start();
  }, [progress, animatedValue]);

  return (
    <View style={[styles.progressContainer, { width: size, height: size }]}>
      <View style={[styles.progressBackground, { width: size, height: size, borderRadius: size / 2 }]}>
        <Animated.View style={[styles.progressArc, { transform: [{ rotate }] }]} />
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
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const TITLE_SCROLL_DISTANCE = 100;
  const titleScale = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE], outputRange: [1, 0.88], extrapolate: 'clamp' });
  const titleTranslateX = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE], outputRange: [0, -28], extrapolate: 'clamp' });
  const headerSearchOpacity = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE * 0.9], outputRange: [1, 0], extrapolate: 'clamp' });
  const navSearchOpacity = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE * 0.9], outputRange: [0, 1], extrapolate: 'clamp' });
  const navSearchScale = scrollY.interpolate({ inputRange: [0, TITLE_SCROLL_DISTANCE], outputRange: [0.95, 1], extrapolate: 'clamp' });

  useEffect(() => {
    const interval = setInterval(() => setAnimationKey((k) => k + 1), 8000);
    return () => clearInterval(interval);
  }, []);

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryItem} key={item.id}>
      <View style={styles.categoryIconContainer}>
        <Image source={item.icon} style={styles.categoryIcon} />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFilter = ({ item }: { item: Filter }) => (
    <TouchableOpacity style={styles.filterButton} key={`${item.name}-${animationKey}`}>
      <CircularProgress progress={item.progress} size={65} item={item} />
    </TouchableOpacity>
  );

  const renderAd = ({ item }: { item: AdItem }) => (
    <TouchableOpacity
      style={styles.adCard}
      onPress={() => {
        if (item.id === 5) router.push('/ad-details');
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
              textAlign: 'left'
            }
          ]}
        >
          Oysloe
        </Animated.Text>

        <Animated.View style={[styles.navSearchContainer, { opacity: navSearchOpacity, transform: [{ scale: navSearchScale }] }] as any} pointerEvents="none">
          <LinearGradient colors={["#60F7A3", "#FF6D6D"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.navSearchGradient}>
            <View style={styles.navSearchInner}>
              <Image source={require('@/oysloe-assets/Ad details screen/search.png')} style={styles.searchIcon} />
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
          <Animated.View style={[styles.searchWrapper, { opacity: headerSearchOpacity }]}>
            <LinearGradient
              colors={["#60F7A3", "#FF6D6D"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.searchGradientBorder}
            >
              <View style={styles.searchContainer}>
                <Image source={require('@/oysloe-assets/Ad details screen/search.png')} style={styles.searchIcon} />
                <TextInput style={styles.searchInput} placeholder="Search anything up for good" placeholderTextColor="#7A8699" />
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

          <FlatList data={filters} renderItem={renderFilter} keyExtractor={(_, i) => i.toString()} horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer} contentContainerStyle={styles.filtersContent} />

          <FlatList data={ads} renderItem={renderAd} keyExtractor={(item) => item.id.toString()} numColumns={2} scrollEnabled={false} contentContainerStyle={styles.adsGrid} columnWrapperStyle={styles.adRow} />
        </View>
  </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 100, paddingBottom: 30, backgroundColor: '#fff' },
    fixedNavBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 120, paddingTop: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 16, backgroundColor: '#ffffff', zIndex: 20 },
    navSearchContainer: { width: 48, height: 36, alignItems: 'flex-end', justifyContent: 'center' },
    navSearchGradient: { borderRadius: 18, padding: 2, width: 48, height: 36 },
    navSearchInner: { flex: 1, borderRadius: 16, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  searchWrapper: { marginTop: 28, paddingBottom: 18 },
    appTitle: { fontSize: 40, fontWeight: '700', color: '#374957', textAlign: 'center', marginBottom: 16 },
    searchGradientBorder: { borderRadius: 30, padding: 2, shadowColor: '#58C98F', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 12 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 28, paddingHorizontal: 16, paddingVertical: 12 },
    searchIcon: { width: 20, height: 20, marginRight: 10, tintColor: '#4D5766' },
    searchInput: { flex: 1, fontSize: 16, color: '#1F2933' },
  categoriesContainer: { paddingHorizontal: 20, marginBottom: 30 },
  categoriesGrid: { justifyContent: 'space-between' },
  categoryItem: { width: (width - 60) / 4, alignItems: 'center', marginBottom: 20 },
  categoryIconContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#f8f8f8', justifyContent: 'center', alignItems: 'center', marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  categoryIcon: { width: 30, height: 30 },
  categoryText: { fontSize: 12, color: '#666', textAlign: 'center' },
  exploreSection: { paddingHorizontal: 20, paddingBottom: 100 },
  exploreHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  exploreTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  showAllButton: { backgroundColor: '#f0f0f0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  showAllText: { fontSize: 12, color: '#666' },
  filtersContainer: { marginBottom: 20 },
  filtersContent: { paddingRight: 20 },
  filterButton: { alignItems: 'center', marginRight: 8, width: 65 },
  progressContainer: { justifyContent: 'center', alignItems: 'center' },
  progressBackground: { backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', position: 'relative', borderWidth: 3, borderColor: '#e0e0e0' },
  progressArcContainer: { position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  progressArc: { position: 'absolute', width: '100%', height: '100%', borderWidth: 3, borderColor: 'transparent', borderTopColor: '#333' },
  progressContent: { position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  progressText: { fontSize: 9, color: '#333', fontWeight: '700', textAlign: 'center', lineHeight: 10 },
  progressCount: { fontSize: 8, color: '#666', fontWeight: '500', textAlign: 'center', lineHeight: 9 },
  adsGrid: { paddingBottom: 20 },
  adRow: { justifyContent: 'space-between', marginBottom: 15 },
  adCard: { width: (width - 50) / 2, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  adImage: { width: '100%', height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  locationButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6 },
  locationIcon: { width: 12, height: 12, marginRight: 4, tintColor: '#666' },
  locationText: { fontSize: 10, color: '#666', fontWeight: '400' },
  adTitle: { fontSize: 14, color: '#333', paddingHorizontal: 10, paddingTop: 4, paddingBottom: 4, fontWeight: '500' },
  adPrice: { fontSize: 12, color: '#666', paddingHorizontal: 10, paddingBottom: 10, fontWeight: '600' },
});
