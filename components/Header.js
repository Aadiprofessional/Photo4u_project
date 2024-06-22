// components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.roundButton}>
        <Image source={require('../assets/profile.png')} style={styles.profileImage} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Home</Text>
      <TouchableOpacity onPress={() => console.log('Notifications')} style={styles.notificationButton}>
        <Icon name="bell" size={24} color={colors.black} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    marginTop: 20, // 20px margin from top
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black, // Text color changed to black
  },
  notificationButton: {
    padding: 10,
  },
});
