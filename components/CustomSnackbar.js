import React from 'react';
import { Snackbar, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const CustomSnackbar = ({ visible, onDismiss, onRetry }) => {
  return (
    <View style={styles.container}>
      <View style={styles.timeline} />
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        action={
          <Button color={colors.white} onPress={onRetry}>
            Retry
          </Button>
        }
        style={styles.snackbar}
      >
        No internet connection. Please check your network settings.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  timeline: {
    width: 3,
    height: '100%',
    backgroundColor: colors.main, // Adjust this to your main color
    position: 'absolute',
    top: 0,
    left: 20, // Adjust the left position as needed
  },
  snackbar: {
    backgroundColor: colors.primary,
  },
});

export default CustomSnackbar;
