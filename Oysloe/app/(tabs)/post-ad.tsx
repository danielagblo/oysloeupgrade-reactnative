import { StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, View, Text, ImageSourcePropType } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const sampleImage = require('../../oysloe-assets/Ad images/iphone.png');

type ImageItem = { id: string; uri: ImageSourcePropType };

export default function PostAdScreen() {
  const insets = useSafeAreaInsets();
  const [images, setImages] = useState<ImageItem[]>([
    { id: '1', uri: sampleImage },
    { id: '2', uri: sampleImage },
    { id: '3', uri: sampleImage },
    { id: '4', uri: sampleImage },
    { id: '5', uri: sampleImage },
    { id: '6', uri: sampleImage }
  ]);

  return (
    _jsxs(View, { style: styles.container, children: [
      _jsxs(View, { style: styles.header, children: [
        _jsx(TouchableOpacity, { onPress: () => router.back(), style: styles.backButton, children:
          _jsx(Text, { style: styles.backText, children: "\u2190 Home" }) }
        ),
        _jsx(Text, { style: styles.headerTitle, children: "Post Ad" }),
        _jsx(View, { style: { width: 80 } })] }
      ),

      _jsxs(ScrollView, { style: styles.content, showsVerticalScrollIndicator: false, children: [
        _jsx(View, { style: styles.uploadContainer, children:
          _jsxs(TouchableOpacity, { style: styles.uploadBox, children: [
            _jsx(Ionicons, { name: "cloud-upload-outline", size: 32, color: "#000" }),
            _jsx(Text, { style: styles.uploadButtonText, children: "Upload Images" })] }
          ) }
        ),

        _jsxs(ScrollView, {
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          style: styles.instructionScrollContainer,
          contentContainerStyle: styles.instructionContainer, children: [

          _jsx(TouchableOpacity, { style: styles.instructionButton, children:
            _jsx(Text, { style: styles.instructionText, children: "6 images added" }) }
          ),
          _jsx(TouchableOpacity, { style: styles.instructionButton, children:
            _jsx(Text, { style: styles.instructionText, children: "Drag images to arrange" }) }
          ),
          _jsx(TouchableOpacity, { style: styles.instructionButton, children:
            _jsx(Text, { style: styles.instructionText, children: "Tap image twice to delete" }) }
          )] }
        ),


        _jsx(View, { style: styles.imageGrid, children:
          _jsx(FlatList, {
            data: images,
            numColumns: 3,
            scrollEnabled: false,
            keyExtractor: (item: ImageItem) => item.id,
            renderItem: ({ item }: { item: ImageItem }) =>
            _jsx(View, { style: styles.imageContainer, children:
              _jsx(Image, { source: item.uri, style: styles.image }) }
            ) }

          ) }
        )] }
      ),

      _jsx(View, { style: [styles.bottomContainer, { bottom: insets.bottom + 72 }], children:
        _jsx(TouchableOpacity, {
          style: styles.nextButton,
          onPress: () => router.push('/post-ad-form'), children:

          _jsx(Text, { style: styles.nextButtonText, children: "Next" }) }
        ) }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  backButton: {
    padding: 4
  },
  backText: {
    fontSize: 16,
    color: '#000'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000'
  },
  content: {
    flex: 1
  },
  uploadContainer: {
    marginTop: 32,
    marginHorizontal: 16
  },
  uploadBox: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    gap: 8
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500'
  },
  instructionScrollContainer: {
    marginTop: 12
  },
  instructionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 6
  },
  instructionButton: {
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
    minWidth: 100
  },
  instructionText: {
    fontSize: 8,
    color: '#666',
    textAlign: 'center'
  },
  imageGrid: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 100
  },
  imageContainer: {
    flex: 1 / 3,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  nextButton: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 100,
    borderRadius: 90,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  nextButtonText: {
    color: '#333',
    fontSize: 20,
    fontWeight: '500'
  }
});