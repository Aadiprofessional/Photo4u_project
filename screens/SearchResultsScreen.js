import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

const { width } = Dimensions.get('window');
const API_KEY = '6f102c62f41998d151e5a1b48713cf13';

export default function SearchResultsScreen({ route, navigation }) {
  const { query } = route.params;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    searchImages(query, page);
  }, [query, page]);

  const searchImages = async (query, page) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&format=json&nojsoncallback=1&extras=url_s&text=${query}&page=${page}`);
      const urls = response.data.photos.photo.map(photo => ({
        id: photo.id,
        url: photo.url_s
      }));

      if (page === 1) {
        setImages(urls);
      } else {
        setImages(prevImages => [...prevImages, ...urls]);
      }
    } catch (error) {
      console.error('Error searching images:', error);
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

  if (loading && images.length === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
  imageGrid: {
    padding: sizes.margin / 4,
  },
  image: {
    width: width / 2 - sizes.margin,
    height: width / 2 - sizes.margin,
    margin: sizes.margin / 2,
    borderRadius: 15,
  },
});
