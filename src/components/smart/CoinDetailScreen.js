import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  Image,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';

import CoinMarketItem from './../dumb/CoinMarketItem';
import Http from '../../libs/http';
import Storage from './../../libs/storage';

const CoinDetailScreen = (props) => {
  const [markets, updateMarkets] = useState([]);
  const [isFavorite, setFavorite] = useState(false);

  const { coin } = props.route.params;

  const getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');

      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  const addFavorite = async () => {
    const currentCoin = JSON.stringify(coin);
    const key = `favorite-${coin.id}`;

    const stored = await Storage.instance.store(key, currentCoin);

    if (stored) {
      setFavorite(true);
    }
  };

  const removeFavorite = async () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${coin.id}`;

          await Storage.instance.remove(key);

          setFavorite(false);
        },
        style: 'destructive',
      },
    ]);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const getSections = (item) => {
    const sections = [
      {
        title: 'Market cap',
        data: [item.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [item.volume24],
      },
      {
        title: 'Change 24h',
        data: [item.percent_change_24h],
      },
    ];

    return sections;
  };

  const getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

    const result = await Http.instance.get(url);

    updateMarkets(result);
  };

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const key = `favorite-${coin.id}`;
        const favStr = await Storage.instance.get(key);

        if (favStr != null) {
          setFavorite(true);
        }
      } catch (err) {
        console.log('get favorites err', err);
      }
    };

    getMarkets(coin.id);
    getFavorites();
  }, [coin.id]);

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImg}
            source={{ uri: getSymbolIcon(coin.name) }}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <Pressable
          onPress={toggleFavorite}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.btnFavoriteText}>
            {isFavorite ? 'Remove Favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>

      <SectionList
        style={styles.section}
        sections={getSections(coin)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />

      <Text style={styles.marketsTitle}>Markets</Text>

      <FlatList
        style={styles.list}
        horizontal={true}
        data={markets}
        keyExtractor={(item, index) => `${item.name}-${index.toString()}`}
        renderItem={({ item }) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: 'white',
    fontSize: 14,
  },
  sectionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketsTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: 'white',
  },
  btnFavoriteAdd: {
    backgroundColor: 'darkblue',
  },
  btnFavoriteRemove: {
    backgroundColor: 'cyan',
  },
});

export default CoinDetailScreen;
