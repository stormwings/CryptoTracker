import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';

const CoinInputSearch = (props) => {
  const [query, setQuery] = useState();

  const handleText = (text) => {
    setQuery(text);

    if (props.onChange) {
      props.onChange(text);
    }
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={query}
        placeholder="Search Coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinInputSearch;
