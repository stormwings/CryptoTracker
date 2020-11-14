import React from 'react';
import { View, Text, Pressable } from 'react-native';

const CoinsScreen = ({ navigation }) => {
  const HandlePress = () => {
    navigation.navigate('CoinDetailScreen');
  };

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
