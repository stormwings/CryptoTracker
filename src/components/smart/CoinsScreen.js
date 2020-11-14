import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import CoinListItem from './../dumb/CoinListItem';
import Http from './../../libs/http';

const CoinsScreen = ({ navigation }) => {
  const [coinsList, setCoinsList] = useState({});
  const [loading, setLoading] = useState(false);

  const handlePress = (coin) => {
    navigation.navigate('CoinDetailScreen', { coin });
  };

  const fetchCoins = async () => {
    setLoading(true);
    await Http.instance
      .get('https://api.coinlore.net/api/tickers/')
      .then(({ data }) => {
        setCoinsList(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loader} color="#fff" size="large" />
      ) : null}
      <Text style={styles.titleText}>Welcome to crypto world!</Text>
      <FlatList
        id="coinsList"
        data={coinsList}
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
