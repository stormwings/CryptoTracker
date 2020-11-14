import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import CoinListItem from './../dumb/CoinListItem';
import Http from './../../libs/http';

const CoinsScreen = ({ navigation }) => {
  const [coinsList, setCoinsList] = useState({});
  const [loading, setLoading] = useState(false);

  const HandlePress = () => {
    navigation.navigate('CoinDetailScreen');
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
        renderItem={({ item }) => <CoinListItem item={item} />}
      />
      <Pressable style={styles.btn} onPress={HandlePress}>
        <Text style={styles.btnText}>Ir a Detail</Text>
      </Pressable>
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
  btn: {
    padding: 8,
    backgroundColor: '#0E74F6',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
};

export default CoinsScreen;
