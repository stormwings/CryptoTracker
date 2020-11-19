import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import CoinListItem from './../dumb/CoinListItem';
import CoinInputSearch from './../dumb/CoinInputSearch';
import Http from './../../libs/http';

const CoinsScreen = ({ navigation }) => {
  const [allCoins, setAllCoins] = useState({});
  const [coins, setCoins] = useState({});
  const [loading, setLoading] = useState(false);

  const handlePress = (coin) => {
    navigation.navigate('CoinDetailScreen', { coin });
  };

  const fetchCoins = async () => {
    setLoading(true);
    await Http.instance
      .get('https://api.coinlore.net/api/tickers/')
      .then(({ data }) => {
        setAllCoins(data);
        setCoins(data);
        setLoading(false);
      });
  };

  const handleSearch = (query) => {
    const searchEqual = (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.symbol.toLowerCase().includes(query.toLowerCase());

    const filteredCoins = allCoins.filter(searchEqual);

    setCoins(filteredCoins);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <View style={styles.container}>
      <CoinInputSearch onChange={(value) => handleSearch(value)} />
      {loading ? (
        <ActivityIndicator style={styles.loader} color="#fff" size="large" />
      ) : null}
      <Text style={styles.titleText}>Welcome to crypto world!</Text>
      <FlatList
        id="coinsList"
        data={coins}
        renderItem={({ item }) => (
          <CoinListItem item={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#111A43',
  },
  loader: {
    marginTop: 60,
  },
  titleText: {
    marginTop: 10,
    color: '#fff',
    textAlign: 'center',
  },
};

export default CoinsScreen;
