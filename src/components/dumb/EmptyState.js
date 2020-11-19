import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>you don't have any item yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default EmptyState;
