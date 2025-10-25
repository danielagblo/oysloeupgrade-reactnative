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
  Animated
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const categories = [
  { id: 1, name: 'Electronics', icon: require('@/oysloe-assets/Category icons/electronics.png') },
  { id: 2, name: 'Furniture', icon: require('@/oysloe-assets/Category icons/furniture.png') },
  { id: 3, name: 'Vehicles', icon: require('@/oysloe-assets/Category icons/vehicle.png') },
  { id: 4, name: 'Industry', icon: require('@/oysloe-assets/Category icons/industrial.png') },
  { id: 5, name: 'Fashion', icon: require('@/oysloe-assets/Category icons/fashion.png') },
  { id: 6, name: 'Grocery', icon: require('@/oysloe-assets/Category icons/grocery.png') },
  { id: 7, name: 'Sporting', icon: require('@/oysloe-assets/Category icons/games.png') },
  { id: 8, name: 'Property', icon: require('@/oysloe-assets/Category icons/property.png') },
  { id: 9, name: 'Cosmetics', icon: require('@/oysloe-assets/Category icons/cosmetics.png') },
  { id: 10, name: 'Services', icon: require('@/oysloe-assets/Category icons/services.png') },
];

const filters = [
  { name: 'Electronics', count: '45k+', progress: 0.85 },
  { name: 'Vehicle', count: '200+', progress: 0.75 },
  { name: 'Furniture', count: '158+', progress: 0.65 },
  { name: 'Sporting', count: '100+', progress: 0.55 },
  { name: 'Fashion', count: '35+', progress: 0.15 },
];

const ads = [
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
    title: 'Samsung galaxy ultra 24...',
    price: '12 720 65,00',
    image: require('@/oysloe-assets/Ad images/3d-car-city-street.jpg'),
    location: 'Santamaria-kotobabi',
  },
  {
    id: 6,
    title: 'Samsung AQ ultra smart...',
    price: '1,670,000',
    image: require('@/oysloe-assets/Ad images/landscape-nature-scene-tv-appliance-generative-ai.jpg'),
    location: 'Santamaria-kotobabi',
  },
];

// Circular Progress Component
const CircularProgress = ({ progress, size = 50, item }: { progress: number; size?: number; item: any }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = React.useState(false);

  const animateProgress = () => {
    animatedValue.setValue(-90); // Start all arcs from the top of the circle
    Animated.timing(animatedValue, {
      toValue: progress * 360 - 90,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isVisible) {
      animateProgress();
    }
  }, [isVisible, progress]);

  // Trigger animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const rotateInterpolate = animatedValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.progressContainer, { width: size, height: size }]}>
      <View style={[styles.progressBackground, { width: size, height: size, borderRadius: size / 2 }]}>
        {/* Progress Arc */}
        <View style={styles.progressArcContainer}>
          <Animated.View 
            style={[
              styles.progressArc, 
              { 
                width: size, 
                height: size,
                borderRadius: size / 2,
                transform: [{ rotate: rotateInterpolate }]
              }
            ]} 
          />
        </View>
        {/* Center Content */}
        <View style={styles.progressContent}>
          <Text style={styles.progressText}>{item.name}</Text>
          <Text style={styles.progressCount}>{item.count}</Text>
        </View>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const [animationKey, setAnimationKey] = React.useState(0);

  // Reset animation when scrolling back to filters
  const resetAnimation = () => {
    setAnimationKey(prev => prev + 1);
  };
  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.categoryIconContainer}>
        <Image source={item.icon} style={styles.categoryIcon} />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFilter = ({ item }: { item: typeof filters[0] }) => (
    <TouchableOpacity style={styles.filterButton} key={`${item.name}-${animationKey}`}>
      <CircularProgress progress={item.progress} size={65} item={item} />
    </TouchableOpacity>
  );

  const renderAd = ({ item }: { item: typeof ads[0] }) => (
    <TouchableOpacity style={styles.adCard}>
      <Image source={item.image} style={styles.adImage} />
      <TouchableOpacity style={styles.locationButton}>
        <Image 
          source={require('@/oysloe-assets/Ad details screen/map.png')} 
          style={styles.locationIcon} 
        />
        <Text style={styles.locationText}>{item.location}</Text>
      </TouchableOpacity>
      <Text style={styles.adTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.adPrice}>¢ {item.price}</Text>
    </TouchableOpacity>
  );

  // Re-animate circles when scrolling back into view
  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 8000); // Re-animate every 8 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Oysloe</Text>
          <LinearGradient
            colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.searchGradientBorder}
          >
            <View style={styles.searchContainer}>
        <Image
                source={require('@/oysloe-assets/Ad details screen/search.png')} 
                style={styles.searchIcon} 
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search anything up for good"
                placeholderTextColor="#999"
              />
            </View>
          </LinearGradient>
        </View>

        {/* Categories Grid */}
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

        {/* Explore Ads Section */}
        <View style={styles.exploreSection}>
          <View style={styles.exploreHeader}>
            <Text style={styles.exploreTitle}>Explore Ads</Text>
            <TouchableOpacity style={styles.showAllButton}>
              <Text style={styles.showAllText}>Show All</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Buttons with Circular Progress */}
          <FlatList
            data={filters}
            renderItem={renderFilter}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
            contentContainerStyle={styles.filtersContent}
          />

          {/* Ads Grid */}
          <FlatList
            data={ads}
            renderItem={renderAd}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.adsGrid}
            columnWrapperStyle={styles.adRow}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 30,
  },
  appTitle: {
    fontSize: 46,
    fontWeight: 'medium',
    color: '#595757ff',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchGradientBorder: {
    borderRadius: 25,
    padding: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 23,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  categoriesGrid: {
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (width - 60) / 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  exploreSection: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  exploreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  exploreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  showAllButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  showAllText: {
    fontSize: 12,
    color: '#666',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingRight: 20,
  },
  filterButton: {
    alignItems: 'center',
    marginRight: 8,
    width: 65,
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBackground: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 3,
    borderColor: '#e0e0e0',
  },
  progressArcContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressArc: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: '#333',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  progressContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  progressText: {
    fontSize: 9,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 10,
  },
  progressCount: {
    fontSize: 8,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 9,
  },
  adsGrid: {
    paddingBottom: 20,
  },
  adRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  adCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  adImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  locationIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
    tintColor: '#666',
  },
  locationText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '400',
  },
  adTitle: {
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 4,
    fontWeight: '500',
  },
  adPrice: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontWeight: '600',
  },
});
