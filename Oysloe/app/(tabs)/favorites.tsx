import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";








const MOCK_FAVORITES = [
{
  id: '1',
  title: 'Mercedes Benz S CLASS 2023',
  price: '€ 023,000',
  image: require('@/oysloe-assets/Ad images/grey-ocar.png')
},
{
  id: '2',
  title: 'Mercedes Benz S CLASS 2023',
  price: '€ 023,000',
  image: require('@/oysloe-assets/Ad images/grey-ocar.png')
},
{
  id: '3',
  title: 'Mercedes Benz S CLASS 2023',
  price: '€ 023,000',
  image: require('@/oysloe-assets/Ad images/grey-ocar.png')
}];


export default function FavoritesScreen() {
  const [favorites, setFavorites] = React.useState<Array<any>>(MOCK_FAVORITES);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const renderItem = ({ item }: { item: any }) =>
  _jsxs(View, { style: styles.card, children: [
    _jsx(Image, { source: item.image, style: styles.cardImage, contentFit: "cover" }),
    _jsxs(View, { style: styles.cardInfo, children: [
      _jsx(Text, { style: styles.cardTitle, numberOfLines: 1, children: item.title }),
      _jsx(Text, { style: styles.cardPrice, children: item.price })] }
    ),
    _jsx(TouchableOpacity, { style: styles.heartButton, children:
      _jsx(Image, {
        source: require('@/oysloe-assets/Ad details screen/favorited.png'),
        style: styles.heartIcon }
      ) }
    )] }
  );


  return (
    _jsxs(View, { style: styles.container, children: [
      _jsx(SafeAreaView, { edges: ['top'], style: styles.safeTop, children:
        _jsxs(View, { style: styles.header, children: [
          _jsx(TouchableOpacity, { onPress: () => router.back(), style: styles.backBtn, children:
            _jsx(Text, { style: styles.backText, children: "\u2190 Back" }) }
          ),
          _jsx(Text, { style: styles.headerTitle, children: "Favorite" }),
          _jsx(View, { style: { width: 48 } })] }
        ) }
      ),

      favorites.length === 0 ?
      _jsxs(View, { style: styles.emptyWrap, children: [
        _jsx(Image, {
          source: require("@/oysloe-assets/Ad details screen/no.png"),
          style: styles.emptyImage,
          contentFit: "contain" }
        ),
        _jsx(Text, { style: styles.emptyText, children: "No data to show" })] }
      ) :

      _jsx(FlatList, {
        data: favorites,
  keyExtractor: (it: any) => it.id,
  renderItem: ({ item }: { item: any }) =>
        _jsxs(View, { style: styles.card, children: [
          _jsx(Image, { source: item.image, style: styles.cardImage, contentFit: "cover" }),
          _jsxs(View, { style: styles.cardInfo, children: [
            _jsx(Text, { style: styles.cardTitle, numberOfLines: 1, children: item.title }),
            _jsx(Text, { style: styles.cardPrice, children: item.price })] }
          ),
          _jsx(TouchableOpacity, { style: styles.heartButton, onPress: () => handleToggleFavorite(item.id), children:
            _jsx(Image, {
              source: require('@/oysloe-assets/Ad details screen/favorited.png'),
              style: styles.heartIcon }
            ) }
          )] }
        ),

        contentContainerStyle: { padding: 16, gap: 12 } }
      )] }

    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  safeTop: {
    backgroundColor: '#fff'
  },
  backBtn: {
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  backText: {
    color: '#666'
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  emptyImage: {
    width: 160,
    height: 160,
    marginBottom: 12
  },
  emptyText: {
    color: '#666'
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 10
  },
  cardImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 10
  },
  cardInfo: {
    flex: 1
  },
  cardTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4
  },
  cardPrice: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600'
  },
  heartButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: '#666'
  }
});