import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { colors } from '../styles/colors'; // Adjust import path based on your project structure
import { sizes } from '../styles/sizes'; // Adjust import path based on your project structure
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LeftNavBar(props) {
  // Replace with your actual logo image source
  const logo = require('../assets/logo2.png');

  // Replace with your actual profile picture and user information
  const profilePic = require('../assets/profile2.png');
  const userName = "John Doe";
  const userEmail = "johndoe@example.com";

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        {/* Logo and App Name */}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.appName}>Photo4u</Text>
        </View>

        {/* Profile Section */}
        <View style={[styles.profileContainer, { backgroundColor: 'rgba(249, 211, 116, 0.7)' }]}>
          <View style={styles.profileDetails}>
            <Image source={profilePic} style={styles.profilePicture} />
            <View style={styles.textContainer}>
              <View style={styles.userNameContainer}>
                <Text style={styles.userName}>{userName}</Text>
              </View>
              <Text style={styles.userEmail}>{userEmail}</Text>
            </View>
          </View>
        </View>

        {/* Navigation Buttons */}
        <TouchableOpacity style={styles.navButton}>
          <Icon name="home" size={30} color={colors.main} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Icon name="star" size={30} color={colors.main} style={styles.navIcon} />
          <Text style={styles.navText}>Favourites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Icon name="file" size={30} color={colors.main} style={styles.navIcon} />
          <Text style={styles.navText}>All Files</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Icon name="clock-o" size={30} color={colors.main} style={styles.navIcon} />
          <Text style={styles.navText}>Recent</Text>
        </TouchableOpacity>

        {/* Settings and Logout */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.bottomButton}>
            <Icon name="cog" size={30} color={colors.gray} style={styles.bottomIcon} />
            <Text style={styles.bottomText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton} onPress={() => props.navigation.navigate('Login')}>
            <Icon name="sign-out" size={30} color={colors.gray} style={styles.bottomIcon} />
            <Text style={styles.bottomText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: sizes.padding,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.margin,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
    marginBottom: 10,
  },
  appName: {
    fontSize: sizes.title,
    color: colors.black,
    fontWeight: 'bold',
  },
  profileContainer: {
    marginBottom: sizes.margin,
    borderRadius: 15,
    overflow: 'hidden',
  },
  profileDetails: {
    padding: sizes.padding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    marginLeft: sizes.margin,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.black,
  },
  userEmail: {
    fontSize: sizes.small,
    color: colors.black,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.margin / 2,
  },
  navIcon: {
    marginRight: 10,
  },
  navText: {
    fontSize: sizes.medium,
    color: colors.black,
  },
  bottomButtons: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.2)',
    paddingTop: sizes.padding,
    marginTop: 'auto', // Move to the bottom of the screen
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes.padding / 5,
  },
  bottomIcon: {
    marginRight: 10,
  },
  bottomText: {
    fontSize: sizes.medium,
    color: colors.black,
  },
});
