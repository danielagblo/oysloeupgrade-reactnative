import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type FavoriteAd = {
  id: string;
  title: string;
  price: string;
  image: any;
};

const MOCK_FAVORITES: FavoriteAd[] = [
  {
    id: '1',
    title: 'Mercedes Benz S CLASS 2023',
    price: '€ 023,000',
    image: require('@/oysloe-assets/Ad images/grey-ocar.png'),
  },
  {
    id: '2',
    title: 'Mercedes Benz S CLASS 2023',
    price: '€ 023,000',
    image: require('@/oysloe-assets/Ad images/grey-ocar.png'),
  },
  {
    id: '3',
    title: 'Mercedes Benz S CLASS 2023',
    price: '€ 023,000',
    image: require('@/oysloe-assets/Ad images/grey-ocar.png'),
  },
];

export default function FavoritesScreen() {
  const [favorites, setFavorites] = React.useState<FavoriteAd[]>(MOCK_FAVORITES);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const renderItem = ({ item }: { item: FavoriteAd }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} contentFit="cover" />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.heartButton}>
        <Image
          source={require('@/oysloe-assets/Ad details screen/favorited.png')}
          style={styles.heartIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeTop}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Favorite</Text>
          <View style={{ width: 48 }} />
        </View>
      </SafeAreaView>

      {favorites.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Image
            source={require('@/oysloe-assets/Ad details screen/no-favorite.png')}
            style={styles.emptyImage}
            contentFit="contain"
          />
          <Text style={styles.emptyText}>No data to show</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(it) => it.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.cardImage} contentFit="cover" />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cardPrice}>{item.price}</Text>
              </View>
              <TouchableOpacity style={styles.heartButton} onPress={() => handleToggleFavorite(item.id)}>
                <Image
                  source={require('@/oysloe-assets/Ad details screen/favorited.png')}
                  style={styles.heartIcon}
                />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ padding: 16, gap: 12 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  safeTop: {
    backgroundColor: '#fff',
  },
  backBtn: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  backText: {
    color: '#666',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyImage: {
    width: 160,
    height: 160,
    marginBottom: 12,
  },
  emptyText: {
    color: '#666',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 10,
  },
  cardImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  heartButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
});


