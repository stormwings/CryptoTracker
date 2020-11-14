import React from 'react';
import { View, Text, Pressable } from 'react-native';

const CoinDetailScreen = (props) => {
  const { coin } = props.route.params;
  console.log(coin);
  return (
    <View>
      <Text>This is a coin detail</Text>
      <Pressable style={styles.btn} onPress={() => true}>
        <Text style={styles.btnText}>Ir a Detail</Text>
      </Pressable>
    </View>
  );
};

const styles = {
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

export default CoinDetailScreen;
