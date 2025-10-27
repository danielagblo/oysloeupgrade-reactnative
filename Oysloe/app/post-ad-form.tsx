import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const successImage = require('../oysloe-assets/Ads/success.png');

export default function PostAdFormScreen() {
  const [selectedPurpose, setSelectedPurpose] = useState('PayLater');
  const [locationTags, setLocationTags] = useState({
    area: '',
    map: '',
  });
  const [locationInputs, setLocationInputs] = useState({
    area: '',
    map: '',
  });
  const [pricing, setPricing] = useState({
    daily: '',
    weekly: '',
    monthly: '',
  });
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [showMapLocationModal, setShowMapLocationModal] = useState(false);
  const [showLocationRegionModal, setShowLocationRegionModal] = useState(false);
  const [showLocationAreaModal, setShowLocationAreaModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [locationName, setLocationName] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [durationType, setDurationType] = useState<'daily' | 'weekly' | 'monthly' | 'rent'>('daily');
  const [selectedDurations, setSelectedDurations] = useState({
    daily: '',
    weekly: '',
    monthly: '',
    rent: '',
  });
  const [selectedCategory, setSelectedCategory] = useState('');

  const dailyDurationOptions = ['30 days - 1 month', '60 days - 2 months', '90 days - 3 months'];
  const weeklyDurationOptions = ['8 weeks - 2 months', '12 weeks - 3 months', '16 weeks - 4 months', '20 weeks - 5 months'];
  const monthlyDurationOptions = Array.from({ length: 9 }, (_, i) => `${i + 4} month${i + 4 > 1 ? 's' : ''}`);
  const rentDurationOptions = ['1 day', '7 days', '14 days', '21 days', '30 days'];
  const categoryOptions = ['Electronics', 'Vehicles', 'Fashion', 'Property', 'Sporting', 'Industry', 'Furniture', 'Cosmetics', 'Grocery'];
  
  const subCategories: { [key: string]: string[] } = {
    'Electronics': [
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
      'Storage Devices (SSD, External HDD & etc)',
      'Keyboards & Mice',
      'Headphones & Earbuds',
      'Routers, modems, & Switches'
    ],
    'Vehicles': [
      'Cars',
      'SUVs',
      'Motorcycles',
      'Bicycles',
      'Trucks',
      'Buses',
      'Auto Parts & Accessories',
      'Tires & Rims',
      'Motor Oils & Fluids',
      'Car Audio & Electronics',
      'Car Care Products',
      'Garage Equipment'
    ],
    'Fashion': [
      'Women\'s Clothing',
      'Men\'s Clothing',
      'Kids\' Clothing',
      'Shoes',
      'Bags & Luggage',
      'Watches & Jewelry',
      'Accessories',
      'Sportswear',
      'Formal Wear',
      'Casual Wear',
      'Traditional Wear',
      'Fashion Accessories'
    ],
    'Property': [
      'Houses for Sale',
      'Apartments for Sale',
      'Land for Sale',
      'Houses for Rent',
      'Apartments for Rent',
      'Office Spaces',
      'Shops',
      'Warehouses',
      'Commercial Property',
      'Farmland',
      'Beachfront Property',
      'Investment Property'
    ],
    'Sporting': [
      'Football',
      'Basketball',
      'Tennis',
      'Golf',
      'Cricket',
      'Fitness Equipment',
      'Gym Equipment',
      'Outdoor Sports',
      'Water Sports',
      'Cycling Equipment',
      'Martial Arts Gear',
      'Team Sports Equipment'
    ],
    'Industry': [
      'Manufacturing Equipment',
      'Construction Machinery',
      'Industrial Tools',
      'Safety Equipment',
      'Packaging Materials',
      'Material Handling',
      'Electronics Manufacturing',
      'Woodworking Equipment',
      'Welding Supplies',
      'Industrial Chemicals',
      'Conveyors',
      'Quality Control Equipment'
    ],
    'Furniture': [
      'Living Room Furniture',
      'Bedroom Furniture',
      'Kitchen Furniture',
      'Office Furniture',
      'Dining Sets',
      'Outdoor Furniture',
      'Decorative Items',
      'Cabinets & Storage',
      'Tables',
      'Chairs & Seating',
      'Mattresses',
      'Curtains & Blinds'
    ],
    'Cosmetics': [
      'Skincare Products',
      'Makeup',
      'Hair Care',
      'Fragrances',
      'Personal Care',
      'Nail Products',
      'Beauty Tools',
      'Men\'s Grooming',
      'Natural & Organic',
      'Luxury Brands',
      'Bath & Body',
      'Anti-aging Products'
    ],
    'Grocery': [
      'Fruits & Vegetables',
      'Meat & Poultry',
      'Dairy Products',
      'Beverages',
      'Grains & Cereals',
      'Snacks',
      'Spices & Seasonings',
      'Canned Goods',
      'Frozen Foods',
      'Bakery Products',
      'Condiments & Sauces',
      'Organic Foods'
    ]
  };

  const popularRegions = ['Greater Accra', 'Eastern Region', 'Ashanti Region', 'Cape coast'];
  const otherRegions = [
    'Greater Accra',
    'Eastern Region',
    'Ashanti Region',
    'Cape coast',
    'Oti',
    'Savannah'
  ];

  const regionAreas: { [key: string]: { popular: string[], other: string[] } } = {
    'Greater Accra': {
      popular: ['Accra', 'Kwame Nkrumah Circle', 'Spintex'],
      other: ['Kanieshie', 'Afienya', 'Dowenya', 'Fashion', 'Accra', 'Kwame Nkrumah Circle', 'Spintex', 'Kanieshie', 'Afienya', 'Dowenya']
    },
    'Eastern Region': {
      popular: ['Koforidua', 'Akosombo', 'Aburi'],
      other: ['Begoro', 'Nsawam', 'New Juaben']
    },
    'Ashanti Region': {
      popular: ['Kumasi', 'Obuasi', 'Ejisu'],
      other: ['Mampong', 'Konongo', 'Ejura']
    },
    'Cape coast': {
      popular: ['Elmina', 'Winneba', 'Saltpond'],
      other: ['Dunkwa', 'Twifo Praso']
    },
    'Oti': {
      popular: ['Dambai', 'Kete Krachi'],
      other: ['Jasikan', 'Kpassa']
    },
    'Savannah': {
      popular: ['Damongo', 'Bole'],
      other: ['West Gonja', 'Salaga']
    }
  };

  const toggleLocationTag = (tag: string, type: 'area' | 'map') => {
    setLocationTags({
      ...locationTags,
      [type]: locationTags[type] === tag ? '' : tag,
    });
  };

  const handleDurationSelect = (duration: string) => {
    setSelectedDurations({
      ...selectedDurations,
      [durationType]: duration,
    });
    setShowDurationModal(false);
  };

  const openDurationModal = (type: 'daily' | 'weekly' | 'monthly' | 'rent') => {
    setDurationType(type);
    setShowDurationModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post Ad</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.label}>Product Category</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowCategoryModal(true)}>
            <Text style={styles.inputText}>{selectedCategory || 'Select product Category'}</Text>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Title</Text>
          <View style={styles.input}>
            <TextInput placeholder="Add a title" style={styles.textInput} />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.section}>
            <View style={styles.labelWithIcon}>
              <Text style={styles.label}>Declare ad purpose?</Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </View>
            <View style={styles.purposeContainer}>
              {['Sale', 'PayLater', 'Rent'].map((purpose) => (
                <TouchableOpacity
                  key={purpose}
                  style={[
                    styles.purposeButton,
                    selectedPurpose === purpose && styles.purposeButtonSelected,
                  ]}
                  onPress={() => setSelectedPurpose(purpose)}
                >
                  <View style={styles.radioContainer}>
                    <View
                      style={[
                        styles.radioOuter,
                        selectedPurpose === purpose && styles.radioOuterSelected,
                      ]}
                    >
                      {selectedPurpose === purpose && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.purposeText,
                        selectedPurpose === purpose && styles.purposeTextSelected,
                      ]}
                    >
                      {purpose}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {selectedPurpose === 'Sale' ? (
          <View style={styles.section}>
            <Text style={styles.label}>Price</Text>
            <View style={styles.priceInputContainer}>
              <Text style={styles.cediSymbol}>¢</Text>
              <TextInput
                placeholder="0"
                value={pricing.daily}
                onChangeText={(text) => setPricing({ ...pricing, daily: text })}
                keyboardType="numeric"
                style={styles.salePriceInput}
              />
            </View>
          </View>
        ) : selectedPurpose === 'Rent' ? (
          <View style={styles.section}>
            <Text style={styles.label}>Price</Text>
            <View style={styles.rentPriceRow}>
              <View style={styles.priceInputContainer}>
                <Text style={styles.cediSymbol}>¢</Text>
                <TextInput
                  placeholder="0"
                  value={pricing.daily}
                  onChangeText={(text) => setPricing({ ...pricing, daily: text })}
                  keyboardType="numeric"
                  style={styles.salePriceInput}
                />
              </View>
              <TouchableOpacity style={[styles.input, styles.rentDurationInput]} onPress={() => openDurationModal('rent')}>
                <Text style={styles.inputText}>{selectedDurations.rent || 'Duration'}</Text>
                <Ionicons name="chevron-down" size={20} color="#999" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.pricingSection}>
          <View style={styles.pricingCard}>
            <View style={styles.pricingCardHeader}>
              <Text style={styles.pricingCardTitle}>Daily</Text>
              <Text style={styles.pricingCardValue}>• ¢ 13,706</Text>
            </View>
            <View style={styles.pricingCardInputs}>
              <View style={styles.pricingInput}>
                <Text style={styles.cediSymbol}>¢</Text>
                <TextInput
                  placeholder="0"
                  value={pricing.daily}
                  onChangeText={(text) => setPricing({ ...pricing, daily: text })}
                  keyboardType="numeric"
                  style={styles.priceInput}
                />
              </View>
              <TouchableOpacity style={styles.pricingDropdown} onPress={() => openDurationModal('daily')}>
                <Text style={styles.inputText}>{selectedDurations.daily || 'Duration'}</Text>
                <Ionicons name="chevron-down" size={18} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pricingCard}>
            <View style={styles.pricingCardHeader}>
              <Text style={styles.pricingCardTitle}>Weekly</Text>
              <Text style={styles.pricingCardValue}>• ¢ 0</Text>
            </View>
            <View style={styles.pricingCardInputs}>
              <View style={styles.pricingInput}>
                <Text style={styles.cediSymbol}>¢</Text>
                <TextInput
                  placeholder="0"
                  value={pricing.weekly}
                  onChangeText={(text) => setPricing({ ...pricing, weekly: text })}
                  keyboardType="numeric"
                  style={styles.priceInput}
                />
              </View>
              <TouchableOpacity style={styles.pricingDropdown} onPress={() => openDurationModal('weekly')}>
                <Text style={styles.inputText}>{selectedDurations.weekly || 'Duration'}</Text>
                <Ionicons name="chevron-down" size={18} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pricingCard}>
            <View style={styles.pricingCardHeader}>
              <Text style={styles.pricingCardTitle}>Monthly</Text>
              <Text style={styles.pricingCardValue}>• ¢ 0</Text>
            </View>
            <View style={styles.pricingCardInputs}>
              <View style={styles.pricingInput}>
                <Text style={styles.cediSymbol}>¢</Text>
                <TextInput
                  placeholder="0"
                  value={pricing.monthly}
                  onChangeText={(text) => setPricing({ ...pricing, monthly: text })}
                  keyboardType="numeric"
                  style={styles.priceInput}
                />
              </View>
              <TouchableOpacity style={styles.pricingDropdown} onPress={() => openDurationModal('monthly')}>
                <Text style={styles.inputText}>{selectedDurations.monthly || 'Duration'}</Text>
                <Ionicons name="chevron-down" size={18} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        )}
        <View style={styles.sectionCard}>
          <View style={styles.section}>
            <View style={styles.labelWithIcon}>
              <Text style={styles.label}>Ad Area Location</Text>
              <TouchableOpacity onPress={() => setShowLocationRegionModal(true)}>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.locationInputField}>
              <Text style={[styles.locationTextInput, !locationTags.area && { color: '#999' }]}>
                {locationTags.area || 'Choose from dropdown'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoNoteContainer}>
          <Ionicons name="information-circle-outline" size={16} color="#999" />
          <Text style={styles.infoNoteText}>
            This is required only for verification and safety purpose
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.section}>
            <Text style={styles.label}>Ad Actual Map Location</Text>
            <TouchableOpacity style={styles.locationInputField} onPress={() => setShowMapLocationModal(true)}>
              <Text style={[styles.locationTextInput, !locationInputs.map && { color: '#999' }]}>
                {locationInputs.map || 'Name this location. Ex Accra Shop'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Key Features</Text>
          
          <TouchableOpacity style={styles.input}>
            <Text style={styles.inputText}>Brand</Text>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.input}>
            <Text style={styles.inputText}>Key 1</Text>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.input}>
            <Text style={styles.inputText}>Key 2</Text>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.input}>
            <Text style={styles.inputText}>Key 3</Text>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>
          
          <View style={styles.input}>
            <TextInput
              placeholder="Type more"
              style={[styles.textInput, styles.multilineInput]}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.finishButton} onPress={() => setShowSuccessModal(true)}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal
        visible={showDurationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDurationModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowDurationModal(false)}>
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.grabHandle} />
            
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Duration</Text>
              <TouchableOpacity onPress={() => setShowDurationModal(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.durationList}>
              {durationType === 'daily' ? (
                <>
                  {dailyDurationOptions.map((duration, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.durationOption,
                        selectedDurations.daily === duration && styles.durationOptionSelected,
                      ]}
                      onPress={() => handleDurationSelect(duration)}
                    >
                      <Text
                        style={[
                          styles.durationOptionText,
                          selectedDurations.daily === duration && styles.durationOptionTextSelected,
                        ]}
                      >
                        {duration}
                      </Text>
                      {selectedDurations.daily === duration && (
                        <Ionicons name="checkmark" size={20} color="#28a745" />
                      )}
                    </TouchableOpacity>
                  ))}
                </>
              ) : durationType === 'weekly' ? (
                weeklyDurationOptions.map((duration, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.durationOption,
                      selectedDurations.weekly === duration && styles.durationOptionSelected,
                    ]}
                    onPress={() => handleDurationSelect(duration)}
                  >
                    <Text
                      style={[
                        styles.durationOptionText,
                        selectedDurations.weekly === duration && styles.durationOptionTextSelected,
                      ]}
                    >
                      {duration}
                    </Text>
                    {selectedDurations.weekly === duration && (
                      <Ionicons name="checkmark" size={20} color="#28a745" />
                    )}
                  </TouchableOpacity>
                ))
              ) : durationType === 'monthly' ? (
                monthlyDurationOptions.map((duration, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.durationOption,
                      selectedDurations.monthly === duration && styles.durationOptionSelected,
                    ]}
                    onPress={() => handleDurationSelect(duration)}
                  >
                    <Text
                      style={[
                        styles.durationOptionText,
                        selectedDurations.monthly === duration && styles.durationOptionTextSelected,
                      ]}
                    >
                      {duration}
                    </Text>
                    {selectedDurations.monthly === duration && (
                      <Ionicons name="checkmark" size={20} color="#28a745" />
                    )}
                  </TouchableOpacity>
                ))
              ) : (
                rentDurationOptions.map((duration, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.durationOption,
                      selectedDurations.rent === duration && styles.durationOptionSelected,
                    ]}
                    onPress={() => handleDurationSelect(duration)}
                  >
                    <Text
                      style={[
                        styles.durationOptionText,
                        selectedDurations.rent === duration && styles.durationOptionTextSelected,
                      ]}
                    >
                      {duration}
                    </Text>
                    {selectedDurations.rent === duration && (
                      <Ionicons name="checkmark" size={20} color="#28a745" />
                    )}
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowCategoryModal(false)}>
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.grabHandle} />
            
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Select Category</Text>
            </View>

            <ScrollView style={styles.durationList}>
              {categoryOptions.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.durationOption}
                  onPress={() => {
                    setSelectedMainCategory(category);
                    setShowCategoryModal(false);
                    setShowSubCategoryModal(true);
                  }}
                >
                  <Text style={styles.durationOptionText}>
                    {category}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={showSubCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSubCategoryModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowSubCategoryModal(false)}>
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.grabHandle} />
            
            <View style={styles.bottomSheetHeader}>
              <TouchableOpacity onPress={() => {
                setShowSubCategoryModal(false);
                setShowCategoryModal(true);
              }} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.bottomSheetTitle}>{selectedMainCategory}</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.durationList}>
              {subCategories[selectedMainCategory]?.map((subCategory, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.durationOption,
                    selectedSubCategory === subCategory && styles.durationOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedSubCategory(subCategory);
                    setSelectedCategory(`${selectedMainCategory} - ${subCategory}`);
                    setShowSubCategoryModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.durationOptionText,
                      selectedSubCategory === subCategory && styles.durationOptionTextSelected,
                    ]}
                  >
                    {subCategory}
                  </Text>
                  {selectedSubCategory === subCategory && (
                    <Ionicons name="checkmark" size={20} color="#28a745" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={showMapLocationModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMapLocationModal(false)}
      >
        <Pressable style={styles.modalOverlayCenter} onPress={() => setShowMapLocationModal(false)}>
          <Pressable style={styles.mapLocationModal} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.mapModalTitle}>Would you want to save this location for future use?</Text>
            
            <View style={styles.mapModalLocation}>
              <Ionicons name="location" size={16} color="#666" />
              <Text style={styles.mapModalLocationText}>Greater Accra-Accra</Text>
            </View>
            
            <View style={styles.mapModalInput}>
              <TextInput
                placeholder="Name this location. Ex Accra Shop"
                value={locationName}
                onChangeText={setLocationName}
                style={styles.mapModalTextInput}
              />
            </View>
            
            <View style={styles.mapModalButtons}>
              <TouchableOpacity 
                style={styles.mapModalButton} 
                onPress={() => {
                  if (locationName) {
                    setLocationInputs({ ...locationInputs, map: locationName });
                    setLocationName('');
                    setShowMapLocationModal(false);
                  }
                }}
              >
                <Text style={styles.mapModalButtonText}>Save Location</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.mapModalButton} 
                onPress={() => {
                  setShowMapLocationModal(false);
                  setLocationName('');
                }}
              >
                <Text style={styles.mapModalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={showLocationRegionModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLocationRegionModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowLocationRegionModal(false)}>
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.grabHandle} />
            
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Select Region</Text>
              <TouchableOpacity onPress={() => setShowLocationRegionModal(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.durationList}>
              <View style={styles.locationSectionHeader}>
                <Text style={styles.locationSectionTitle}>Popular regions</Text>
              </View>
              {popularRegions.map((region, index) => (
                <TouchableOpacity
                  key={`popular-${index}`}
                  style={styles.durationOption}
                  onPress={() => {
                    setSelectedRegion(region);
                    setShowLocationRegionModal(false);
                    setShowLocationAreaModal(true);
                  }}
                >
                  <Text style={styles.durationOptionText}>
                    {region}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#999"                   />
                </TouchableOpacity>
              ))}

              <View style={styles.locationSectionHeader}>
                <Text style={styles.locationSectionTitle}>Other regions</Text>
              </View>
              {otherRegions.map((region, index) => (
                <TouchableOpacity
                  key={`other-${index}`}
                  style={styles.durationOption}
                  onPress={() => {
                    setSelectedRegion(region);
                    setShowLocationRegionModal(false);
                    setShowLocationAreaModal(true);
                  }}
                >
                  <Text style={styles.durationOptionText}>
                    {region}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={showLocationAreaModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLocationAreaModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowLocationAreaModal(false)}>
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.grabHandle} />
            
            <View style={styles.bottomSheetHeader}>
              <TouchableOpacity onPress={() => {
                setShowLocationAreaModal(false);
                setShowLocationRegionModal(true);
              }} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.bottomSheetTitle}>{selectedRegion}</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.durationList}>
              <View style={styles.locationSectionHeader}>
                <Text style={styles.locationSectionTitle}>Popular areas</Text>
              </View>
              {regionAreas[selectedRegion]?.popular.map((area, index) => (
                <TouchableOpacity
                  key={`popular-${index}`}
                  style={[styles.durationOption, selectedArea === area && styles.durationOptionSelected]}
                  onPress={() => {
                    setSelectedArea(area);
                    setLocationTags({ ...locationTags, area: `${selectedRegion} - ${area}` });
                    setSelectedArea('');
                    setShowLocationAreaModal(false);
                  }}
                >
                  <Text style={[styles.durationOptionText, selectedArea === area && styles.durationOptionTextSelected]}>
                    {area}
                  </Text>
                  {selectedArea === area && (
                    <Ionicons name="checkmark" size={20} color="#28a745" />
                  )}
                </TouchableOpacity>
              ))}

              <View style={styles.locationSectionHeader}>
                <Text style={styles.locationSectionTitle}>Other areas</Text>
              </View>
              {regionAreas[selectedRegion]?.other.map((area, index) => (
                <TouchableOpacity
                  key={`other-${index}`}
                  style={[styles.durationOption, selectedArea === area && styles.durationOptionSelected]}
                  onPress={() => {
                    setSelectedArea(area);
                    setLocationTags({ ...locationTags, area: `${selectedRegion} - ${area}` });
                    setSelectedArea('');
                    setShowLocationAreaModal(false);
                  }}
                >
                  <Text style={[styles.durationOptionText, selectedArea === area && styles.durationOptionTextSelected]}>
                    {area}
                  </Text>
                  {selectedArea === area && (
                    <Ionicons name="checkmark" size={20} color="#28a745" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <Pressable style={styles.successModalOverlay} onPress={() => setShowSuccessModal(false)}>
          <Pressable style={styles.successModal} onPress={(e) => e.stopPropagation()}>
            <View style={styles.successIconContainer}>
              <Image source={successImage} style={styles.successIconImage} resizeMode="contain" />
            </View>
            
            <Text style={styles.successTitle}>Submitted</Text>
            
            <View style={styles.successButtonContainer}>
              <TouchableOpacity 
                style={styles.postNewButton}
                onPress={() => {
                  setShowSuccessModal(false);
                  router.push('/(tabs)/post-ad');
                }}
              >
                <Text style={styles.postNewButtonText}>Post new</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.successCloseButton}
                onPress={() => setShowSuccessModal(false)}
              >
                <Text style={styles.successCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 0,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  smallInput: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
  },
  inputText: {
    fontSize: 14,
    color: '#999',
  },
  textInput: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  multilineInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  locationInputField: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginTop: 8,
    marginBottom: 8,
  },
  locationTextInput: {
    fontSize: 14,
    color: '#333',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginTop: 8,
    gap: 8,
    flex: 1,
  },
  salePriceInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },
  rentPriceRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  rentDurationInput: {
    flex: 1,
    marginTop: 0,
    maxWidth: 150,
  },
  purposeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  purposeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  purposeButtonSelected: {
    borderColor: '#2e64e5',
    backgroundColor: '#f0f5ff',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#2e64e5',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2e64e5',
  },
  purposeText: {
    fontSize: 12,
    color: '#666',
  },
  purposeTextSelected: {
    color: '#2e64e5',
    fontWeight: '500',
  },
  pricingSection: {
    marginTop: 20,
    gap: 12,
  },
  pricingCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
  },
  pricingCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pricingCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  pricingCardValue: {
    fontSize: 14,
    color: '#999',
  },
  pricingCardInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  pricingInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cediSymbol: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  priceInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },
  pricingDropdown: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagsContainer: {
    marginTop: 0,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  tagSelected: {
    borderColor: '#2e64e5',
    backgroundColor: '#f0f5ff',
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  tagTextSelected: {
    color: '#2e64e5',
    fontWeight: '500',
  },
  infoNoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  infoNoteText: {
    fontSize: 12,
    color: '#999',
    flex: 1,
  },
  finishButton: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 120,
    borderRadius: 90,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'center',
  },
  finishButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  grabHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  durationList: {
    maxHeight: 400,
  },
  durationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  durationOptionSelected: {
    backgroundColor: '#e8f5e9',
  },
  durationOptionText: {
    fontSize: 16,
    color: '#333',
  },
  durationOptionTextSelected: {
    color: '#28a745',
    fontWeight: '500',
  },
  modalOverlayCenter: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mapLocationModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  mapModalTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  mapModalLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  mapModalLocationText: {
    fontSize: 14,
    color: '#666',
  },
  mapModalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 20,
  },
  mapModalTextInput: {
    fontSize: 14,
    color: '#333',
  },
  mapModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  mapModalButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  mapModalButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  locationSectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
  },
  locationSectionTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 40,
    width: '80%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  successIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 90,
    padding: 20,
  },
  successIconImage: {
    width: 150,
    height: 150,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 32,
  },
  successButtonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  postNewButton: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  postNewButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  successCloseButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  successCloseButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});

