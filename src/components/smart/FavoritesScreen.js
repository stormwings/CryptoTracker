import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CoinListItem from './../dumb/CoinListItem';
import EmptyState from './../dumb/EmptyState';
import { useFavoritesReducer } from './../../redux/actions/FavoritesActions';

const FavoritesScreen = ({ navigation }) => {
  const [{ favorites }] = useFavoritesReducer();

  const handlePress = (coin) => {
    navigation.navigate('CoinDetailScreen', { coin });
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 && <EmptyState />}

      {favorites.length > 0 && (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <CoinListItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});

export default FavoritesScreen;
