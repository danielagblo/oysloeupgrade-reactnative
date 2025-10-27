import { StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, View, Text } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const sampleImage = require('../../oysloe-assets/Ad images/iphone.png');

export default function PostAdScreen() {
  const [images, setImages] = useState([
    { id: '1', uri: sampleImage },
    { id: '2', uri: sampleImage },
    { id: '3', uri: sampleImage },
    { id: '4', uri: sampleImage },
    { id: '5', uri: sampleImage },
    { id: '6', uri: sampleImage },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Home</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post Ad</Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.uploadBox}>
            <Ionicons name="cloud-upload-outline" size={32} color="#000" />
            <Text style={styles.uploadButtonText}>Upload Images</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.instructionScrollContainer}
          contentContainerStyle={styles.instructionContainer}
        >
          <TouchableOpacity style={styles.instructionButton}>
            <Text style={styles.instructionText}>6 images added</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.instructionButton}>
            <Text style={styles.instructionText}>Drag images to arrange</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.instructionButton}>
            <Text style={styles.instructionText}>Tap image twice to delete</Text>
          </TouchableOpacity>
        </ScrollView>

        
        <View style={styles.imageGrid}>
          <FlatList
            data={images}
            numColumns={3}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image source={item.uri} style={styles.image} />
              </View>
            )}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push('/post-ad-form')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 4,
  },
  backText: {
    fontSize: 16,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  uploadContainer: {
    marginTop: 32,
    marginHorizontal: 16,
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
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  instructionScrollContainer: {
    marginTop: 12,
  },
  instructionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 6,
  },
  instructionButton: {
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
    minWidth: 100,
  },
  instructionText: {
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
  },
  imageGrid: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 100,
  },
  imageContainer: {
    flex: 1/3,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 100,
    borderRadius: 90,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  nextButtonText: {
    color: '#333',
    fontSize: 20,
    fontWeight: '500',
  },
});

