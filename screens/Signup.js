import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../styles/colors';

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignup = () => {
    // Implement your signup logic here
    console.log('Signing up...', fullName, email, phoneNo, password);

    // Assuming validation passes, navigate to OTP verification screen
    navigation.navigate('OTPVerification', {
      email: email, // Pass email to OTPVerificationScreen for verification
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/signup.png')} style={styles.image} />

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#C4C4C4" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="rgba(196, 196, 196, 1)"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          selectionColor="#FF7686" // Cursor color
          underlineColorAndroid="transparent" // Remove underline on Android
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#C4C4C4" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(196, 196, 196, 1)"
          value={email}
          onChangeText={(text) => setEmail(text)}
          selectionColor="#FF7686" // Cursor color
          underlineColorAndroid="transparent" // Remove underline on Android
          keyboardType="email-address" // Show email keyboard
        />
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#C4C4C4" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="rgba(196, 196, 196, 1)"
          value={phoneNo}
          onChangeText={(text) => setPhoneNo(text)}
          selectionColor="#FF7686" // Cursor color
          underlineColorAndroid="transparent" // Remove underline on Android
          keyboardType="phone-pad" // Show numeric keyboard
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#C4C4C4" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(196, 196, 196, 1)"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          selectionColor="#FF7686"
          underlineColorAndroid="transparent" // Remove underline on Android
        />
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#C4C4C4" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="rgba(196, 196, 196, 1)"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          selectionColor="#FF7686" // Cursor color
          underlineColorAndroid="transparent" // Remove underline on Android
        />
      </View>

      {/* Terms and Conditions */}
      <View style={styles.termsContainer}>
        <TouchableOpacity onPress={() => setAgreeTerms(!agreeTerms)} style={styles.checkbox}>
          {agreeTerms ? (
            <Icon name="check-square" size={20} color={colors.main} />
          ) : (
            <Icon name="square-o" size={20} color="#C4C4C4" />
          )}
        </TouchableOpacity>
        <Text style={styles.termsText}>By checking the box you agree to our Terms and Conditions.</Text>
      </View>

      {/* Signup Button */}
      <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Signup</Text>
      </TouchableOpacity>

      {/* Already have an account */}
      <View style={styles.loginContainer}>
        <Text style={styles.alreadyMemberText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
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
    width: 260,
    height: 210,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: '#555555',
  },
  signupButton: {
    width: '95%',
    backgroundColor: colors.main,
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 70,
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  alreadyMemberText: {
    marginRight: 5,
  },
  loginButton: {},
  loginButtonText: {
    color: colors.main,
  },
});
