import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const HoldingListItem = props => {
  const {avgPrice, close, ltp, quantity, symbol, profileAndLoss} = props;
  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={styles.symbolText}>{symbol}</Text>
        <Text>{`LTP: ₹ ${ltp}`}</Text>
      </View>
      <View style={styles.footContainer}>
        <Text>{quantity}</Text>
        <Text>{`P/L: ₹ ${Number(profileAndLoss).toFixed(2)}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  footContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  symbolText: {fontWeight: 'bold'},
});

export default HoldingListItem;
