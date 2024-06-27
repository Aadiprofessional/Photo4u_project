// SearchBar.js

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust this based on the icon library you choose
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={colors.gray}
          value={query}
          onChangeText={setQuery}
          caretHidden={false} // Show the cursor
          caretColor={colors.primary} // Set the cursor color
        />
        <TouchableOpacity onPress={handleSearch} style={styles.iconContainer}>
          <Icon name="search" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: sizes.padding,
    paddingVertical: sizes.padding / 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    shadowRadius: 7,
    elevation: 9, // For Android shadow
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: colors.lightGray,
    paddingHorizontal: sizes.padding,
    marginRight: sizes.margin,
    borderRadius: 5,
    color: colors.black,
    fontSize: sizes.font,
  },
  iconContainer: {
    backgroundColor: colors.blue,
    padding: sizes.padding / 2,
    borderRadius: 8,
  },
});
