import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color={colors.black} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: colors.background,
    paddingVertical: sizes.padding,
    paddingHorizontal: sizes.padding,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: colors.black,
  },
});
