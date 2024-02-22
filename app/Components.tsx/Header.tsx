import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function Header(props): React.JSX.Element {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 45,
    backgroundColor: 'rgb(114, 20, 121)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Header;
