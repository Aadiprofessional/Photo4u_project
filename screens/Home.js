import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import SearchBar from './SearchBar'; // Import the SearchBar component

const { width } = Dimensions.get('window');
const API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s';
const CACHE_KEY = 'cached_image_urls';

export default function Home({ navigation, handleLogout }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);

        // Check if there are cached images
        const cachedUrls = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedUrls) {
          setImages(JSON.parse(cachedUrls));
          setLoading(false);
        }

        // Fetch new images from API
        const response = await axios.get(API_URL);
        const urls = response.data.photos.photo.map(photo => ({
          id: photo.id,
          url: photo.url_s
        }));

        setImages(urls);
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(urls));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&text=${query}`);
      const urls = response.data.photos.photo.map(photo => ({
        id: photo.id,
        url: photo.url_s
      }));
      setImages(urls);
    } catch (error) {
      console.error('Error searching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <Image
      style={styles.image}
      source={{ uri: item.url }}
      resizeMode="cover"
    />
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Navigation Icons */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
          <View style={styles.iconWrapper}>
            <Icon name="home" size={30} color={colors.main} style={styles.navIcon} />
          </View>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Favorites')}>
          <View style={styles.iconWrapper}>
            <Icon name="star" size={30} color={colors.main} style={styles.navIcon} />
          </View>
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('AllFiles')}>
          <View style={styles.iconWrapper}>
            <Icon name="file" size={30} color={colors.main} style={styles.navIcon} />
          </View>
          <Text style={styles.navText}>All Files</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Recent')}>
          <View style={styles.iconWrapper}>
            <Icon name="clock-o" size={30} color={colors.main} style={styles.navIcon} />
          </View>
          <Text style={styles.navText}>Recent</Text>
        </TouchableOpacity>
      </View>

      {/* Image Grid */}
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Changed to show images in two columns
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.imageGrid}
      />

      {/* Plus Icon */}
      <TouchableOpacity style={styles.plusIconContainer}>
        <View style={styles.plusIconCircle}>
          <Icon name="plus" size={30} color={colors.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.padding,
    marginBottom: sizes.margin,
    borderBottomWidth: 0, // Removed the bottom border between search bar and icons
  },
  iconButton: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: colors.white,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    marginBottom: 5,
  },
  navText: {
    fontSize: sizes.medium,
    color: colors.black,
  },
  imageGrid: {
    padding: sizes.margin / 4,
  },
  image: {
    width: width / 2 - sizes.margin, // Adjusted to show two images per row
    height: width / 2 - sizes.margin,
    margin: sizes.margin / 2,
    borderRadius: 15,
  },
  plusIconContainer: {
    position: 'absolute',
    bottom: sizes.padding * 2,
    right: sizes.padding * 2,
  },
  plusIconCircle: {
    backgroundColor: colors.main,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
