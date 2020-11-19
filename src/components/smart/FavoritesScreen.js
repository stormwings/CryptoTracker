import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CoinListItem from './../dumb/CoinListItem';
import EmptyState from './EmptyState';
import Storage from './../../libs/storage';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllkeys();

      const keys = allKeys.filter((key) => key.includes('favorite-'));

      const favs = await Storage.instance.multiGet(keys);

      const receivedFavorites = favs.map((fav) => JSON.parse(fav[1]));

      setFavorites(receivedFavorites);
    } catch (err) {
      console.log('get favorites err', err);
    }
  };

  const handlePress = (coin) => {
    navigation.navigate('CoinDetailScreen', { coin });
  };

  useEffect(() => {
    const unsuscribe = navigation.addListener('focus', () => {
      getFavorites();
    });

    return unsuscribe;
  }, [navigation]);

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
