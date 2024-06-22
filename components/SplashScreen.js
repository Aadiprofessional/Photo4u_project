// components/SplashScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../styles/colors';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulated loading time (e.g., fetching initial data, checking auth)
    const timeout = setTimeout(() => {
      // Replace with logic to navigate to appropriate screen (e.g., login or home)
      // For demonstration, navigating to HomeScreen after 2 seconds
      navigation.replace('Login'); // Navigate to the Login screen after splash
    }, 2000); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timeout); // Clean up timeout on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Replace with your logo image */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Photo4u</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main, // Replace with your splash screen background color
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontWeight:'bold',
    color: colors.background, // Replace with your text color
  },
});

export default SplashScreen;
