import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import SearchBar from '../components/SearchBar';

const { width } = Dimensions.get('window');
const API_KEY = '6f102c62f41998d151e5a1b48713cf13';
const CACHE_KEY = 'cached_image_urls';

export default function HomeScreen({ navigation }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchRecentImages(page);
  }, [page]);

  const fetchRecentImages = async (page) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const cachedUrls = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedUrls && page === 1) {
        setImages(JSON.parse(cachedUrls));
        setLoading(false);
      }

      const response = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=${page}&api_key=${API_KEY}&format=json&nojsoncallback=1&extras=url_s`);
      const newImages = response.data.photos.photo.map(photo => ({
        id: photo.id,
        url: photo.url_s
      }));

      if (page === 1) {
        setImages(newImages);
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newImages));
      } else {
        setImages(prevImages => [...prevImages, ...newImages]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      if (page === 1) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const loadMoreImages = () => {
    if (!loadingMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderFooter = () => {
    return loadingMore ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.main} />
      </View>
    ) : null;
  };

  const renderItem = ({ item }) => (
    <Image
      style={styles.image}
      source={{ uri: item.url }}
      resizeMode="cover"
    />
  );

  const handleSearch = (query) => {
    navigation.navigate('SearchResults', { query });
  };

  if (loading && images.length === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
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
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.imageGrid}
        onEndReached={loadMoreImages}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
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
    width: width / 2 - sizes.margin,
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
