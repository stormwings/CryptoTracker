import React from 'react';
import { View, Text, Image, Platform } from 'react-native';

const CoinListItem = ({ item }) => {
  const ImgArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('./../../assets/arrow_up.png');
    } else {
      return require('./../../assets/arrow_down.png');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.nameText}>{item.symbol}</Text>
        <Text style={styles.symbolText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image style={styles.icon} source={ImgArrow()} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingLeft: Platform.OS === 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 16,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
  },
  icon: {
    height: 22,
    marginLeft: 8,
    width: 22,
  },
};

export default CoinListItem;
