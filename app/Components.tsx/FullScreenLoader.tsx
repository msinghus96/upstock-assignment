import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const FullScreenLoader = props => {
  const {loading} = props;
  if (!loading) {
    return;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FullScreenLoader;
