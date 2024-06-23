import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { colors } from '../styles/colors';

const CenteredRetrySnackbar = ({ visible, message, onDismiss, onRetry }) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      style={styles.centeredSnackbar}
    >
      <View style={styles.snackbarContent}>
        <Text style={styles.snackbarText}>{message}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  centeredSnackbar: {
    backgroundColor: colors.error,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  snackbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  snackbarText: {
    color: colors.white,
    flex: 1,
  },
  retryButton: {
    backgroundColor: colors.main,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  retryText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default CenteredRetrySnackbar;
