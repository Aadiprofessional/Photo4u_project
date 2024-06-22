import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
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
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: sizes.padding,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    paddingHorizontal: sizes.padding,
    marginRight: sizes.margin,
    borderRadius: 5,
  },
});
