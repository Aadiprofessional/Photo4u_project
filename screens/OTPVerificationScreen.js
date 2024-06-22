import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../styles/colors';

export default function OTPVerificationScreen({ navigation }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array to hold OTP digits
  const [timer, setTimer] = useState(30); // Timer for resend OTP
  const inputRefs = useRef([]);

  // Effect to start countdown for resend OTP
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOTP = () => {
    // Logic to resend OTP
    setTimer(30); // Reset timer
    // Implement your resend OTP functionality here
    console.log('Resending OTP...');
  };

  const handleVerifyOTP = () => {
    // Logic to verify OTP
    const otpCode = otp.join(''); // Convert array to string
    // Implement your OTP verification logic here
    console.log('Verifying OTP...', otpCode);

    // Navigate to HomeDrawer on successful OTP verification
    navigation.navigate('HomeDrawer');
  };

  const handleChangeText = (index, value) => {
    // Update OTP array with new value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input if value is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleLeftAlign}>Almost there!</Text>
      <Text style={styles.subtitleLeftAlign}>Please enter the 6-digit code sent to your email contact.uiuxexperts@gmail.com for verification.</Text>

      {/* OTP Input Fields */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <View key={index} style={[styles.otpInputContainer, { borderColor: digit ? colors.main : '#F2F2F2' }]}>
            <TextInput
              ref={ref => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              placeholder="•"
              placeholderTextColor="#C4C4C4"
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChangeText(index, text)}
              selectionColor={colors.main} // Cursor color
              autoFocus={index === 0} // Auto-focus on the first input
            />
          </View>
        ))}
      </View>

      {/* Verify Button */}
      <TouchableOpacity onPress={handleVerifyOTP} style={styles.verifyButton}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>

      {/* Resend OTP and Timer */}
      <View style={styles.resendContainer}>
        <TouchableOpacity onPress={handleResendOTP}>
          <Text style={styles.resendText}>
            Didn't receive any code? Resend Again
          </Text>
        </TouchableOpacity>
        <Text style={styles.timerText}>
          {timer > 0 ? `Request new code in 00:${timer < 10 ? `0${timer}` : timer}s` : ''}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 40, // Adjust as per design
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF', // Background color for the entire screen
  },
  titleLeftAlign: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop:50,
    marginBottom: 10,
    textAlign: 'left', // Align text to the left
    width: '100%', // Ensure text takes full width
  },
  subtitleLeftAlign: {
    textAlign: 'left', // Align text to the left
    marginBottom: 30,
    color: '#555555',
    width: '100%', // Ensure text takes full width
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInputContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  verifyButton: {
    width: '95%',
    backgroundColor: colors.main,
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20, // Add margin top to separate from resend container
  },
  verifyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10, // Adjust margin top as needed
  },
  resendText: {
    color: colors.black,
    marginBottom: 5,
    fontWeight:"Semibold",
    textAlign: 'center', // Align text to center
  },
  timerText: {
    color: '#555555',
    textAlign: 'center', // Align text to center
  },
});
