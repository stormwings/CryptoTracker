import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Http from '../../libs/http';

const CoinsScreen = ({ navigation }) => {
  const [coinsList, setCoinsList] = useState(null);

  const HandlePress = () => {
    navigation.navigate('CoinDetailScreen');
  };

  const fetchCoins = async () => {
    await Http.instance
      .get('https://api.coinlore.net/api/tickers/')
      .then((result) => {
        setCoinsList(result);
      });
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <View style={styles.container}>
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
  titleText: {
    color: 'white',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: '#0E74F6',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
};

export default CoinsScreen;
