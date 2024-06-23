// components/RetrySnackbar.js
import React from 'react';
import { Snackbar, Button } from 'react-native-paper';

export default function RetrySnackbar({ visible, onDismiss, onRetry, message }) {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      action={{
        label: 'Retry',
        onPress: onRetry,
      }}
    >
      {message}
    </Snackbar>
  );
}
