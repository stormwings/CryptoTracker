import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  Image,
  FlatList,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';

import CoinMarketItem from './../dumb/CoinMarketItem';
import Http from '../../libs/http';
import { useFavoritesReducer } from './../../redux/actions/FavoritesActions';
import { urlCryptoPriceChart } from '../../redux/urls';

const CoinDetailScreen = (props) => {
  const [markets, updateMarkets] = useState([]);
  const [charts, updateCharts] = useState(null);
  const [favoritesReducer, favoriteActions] = useFavoritesReducer();

  const { coin } = props.route.params;

  const isFavorite = favoritesReducer.favorites.some(
    (element) => element.id === coin.id,
  );

  const getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');

      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  const addFavorite = () => {
    favoriteActions.addFavorite(coin);
  };

  const removeFavorite = () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: () => {
          favoriteActions.removeFavorite(coin.id);
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

  const getPrices = async () => {
    const url = urlCryptoPriceChart(coin.nameid);
    const result = await Http.instance.get(url);

    updateCharts(result);
  };

  useEffect(() => {
    getMarkets(coin.id);
    getPrices();
  }, [coin.id]);

  if (charts) {
    console.log(charts.prices[0][1]);
    console.log(charts.prices[1][1]);
    console.log(charts.prices[2][1]);
    console.log(charts.prices[3][1]);
    console.log(charts.prices[4][1]);
    console.log(charts.prices[5][1]);
  }

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

      <View>
        {charts ? (
          <LineChart
            data={{
              labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
              datasets: [
                {
                  data: [
                    charts.prices[0][1],
                    charts.prices[1][1],
                    charts.prices[2][1],
                    charts.prices[3][1],
                    charts.prices[4][1],
                    charts.prices[5][1],
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width}
            height={220}
            yAxisLabel="$"
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#000000',
              backgroundGradientTo: '#000000',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: 'black',
              },
            }}
            bezier
            style={styles.chart}
          />
        ) : null}
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
  chart: {
    alignSelf: 'center',
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
