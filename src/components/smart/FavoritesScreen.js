import React from 'react';
import { View, StyleSheet } from 'react-native';
import EmptyState from './EmptyState';

const FavoritesScreen = () => (
  <View style={styles.container}>
    <EmptyState />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});

export default FavoritesScreen;
