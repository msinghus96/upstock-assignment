import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const ErrorHandler = props => {
  const {error, refetch} = props;
  if (!error) {
    return;
  }
  return (
    <TouchableOpacity style={styles.errorContainer} onPress={refetch}>
      <Text>{`${error} try again`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ErrorHandler;
