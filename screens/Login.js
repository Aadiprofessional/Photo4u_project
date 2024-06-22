import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../styles/colors';

export default function LoginScreen({ navigation, handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginPress = () => {
    // Perform login logic (authentication, API calls, etc.)
    // For demonstration, assume login is successful and navigate to OTPVerificationScreen
    handleLogin();
    navigation.navigate('OTPVerification');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/login.png')} style={styles.image} />
      
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#C4C4C4" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="rgba(196, 196, 196, 1)"
          value={email}
          onChangeText={text => setEmail(text)}
          selectionColor="#FF7686" // Cursor color
          underlineColorAndroid="transparent" // Remove underline on Android
        />
      </View>
      
      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#C4C4C4" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(196, 196, 196, 1)"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
          selectionColor="#FF7686" // Cursor color
          underlineColorAndroid="transparent" // Remove underline on Android
        />
        <TouchableOpacity onPress={handleShowPassword} style={styles.eyeButton}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#C4C4C4" />
        </TouchableOpacity>
      </View>
      
      {/* Remember me and Forgot Password */}
      <View style={styles.optionsContainer}>
        <View style={styles.rememberMeContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.checkbox}>
            {/* Placeholder icon for remember me checkbox */}
            <Icon name="square-o" size={20} color="#C4C4C4" />
          </TouchableOpacity>
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      
      {/* Login Button */}
      <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      
      {/* Signup */}
      <View style={styles.signupContainer}>
        <Text style={styles.newMemberText}>New Member?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Register now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF', // Background color for the entire screen
  },
  image: {
    width: 310,
    height: 270,
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F2F2F2', // Background color for the input container
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#242424', // Text color for input
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  eyeButton: {
    padding: 10,
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 150, // Adjusted from 200 to 20 for better spacing
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 8,
  },
  forgotPasswordButton: {},
  forgotPasswordText: {
    color: colors.main,
  },
  loginButton: {
    width: '95%',
    backgroundColor: colors.main,
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newMemberText: {
    marginRight: 5,
  },
  signupButton: {},
  signupButtonText: {
    color: colors.main,
  },
});
