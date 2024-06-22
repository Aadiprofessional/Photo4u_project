import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

export default function ImageDetailScreen({ navigation, route }) {
  const { imageUrl } = route.params;

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={sizes.icon} color={colors.primary} />
      </TouchableOpacity>

      {/* Expanded image */}
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        resizeMode="contain"
      />

      {/* Action buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="heart-outline" size={sizes.icon} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="share-social-outline" size={sizes.icon} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="chatbubble-ellipses-outline" size={sizes.icon} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: sizes.padding * 2,
    left: sizes.padding,
    zIndex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: sizes.padding * 2,
  },
  iconButton: {
    marginHorizontal: sizes.padding / 2,
  },
});
