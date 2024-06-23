import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Image, Dimensions } from 'react-native';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import CustomSnackbar from '../components/CustomSnackbar'; // Assuming you have a custom snackbar component
import { colors } from '../styles/colors'; // Assuming you have defined colors in your styles
import { sizes } from '../styles/sizes'; // Assuming you have defined sizes in your styles

const { width } = Dimensions.get('window');

const API_KEY = '6f102c62f41998d151e5a1b48713cf13'; // Replace with your Flickr API key

const SearchResultsScreen = ({ route }) => {
  const { query } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    fetchSearchResults();
  }, []);

  const fetchSearchResults = async () => {
    setLoading(true);
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      setNetworkError(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&format=json&nojsoncallback=1&extras=url_s&text=${query}`);
      if (response.data.stat === 'ok') {
        const results = response.data.photos.photo.map(photo => ({
          id: photo.id,
          url: photo.url_s,
        }));
        setData(results);
      } else {
        console.error('Flickr API Error:', response.data.message);
        // Handle API error scenario
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Handle network error or other errors
    } finally {
      setLoading(false);
    }
  };

  const retrySearch = () => {
    setNetworkError(false);
    fetchSearchResults();
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (networkError) {
    return (
      <View style={styles.container}>
        <CustomSnackbar
          visible={networkError}
          message="Network unavailable"
          onDismiss={() => setNetworkError(false)}
          onRetry={retrySearch}
          centerRetry={true}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Image
            style={styles.image}
            source={{ uri: item.url }}
            resizeMode="cover"
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.imageGrid}
      />
    </View>
  );
};

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

export default SearchResultsScreen;
