import React from 'react';
import { Snackbar, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const CustomSnackbar = ({ visible, onDismiss, onRetry }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: colors.error, // Red color for error
  },
});

export default CustomSnackbar;
