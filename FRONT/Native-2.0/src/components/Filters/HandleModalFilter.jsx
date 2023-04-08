import React from 'react';
import { StyleSheet, View } from 'react-native';

const HandleModalFilter = () => {
  return <View style={styles.handle} />;
};

const styles = StyleSheet.create({
  handle: {
    width: 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginTop: 8,
    alignSelf: 'center',
  },
});

export default HandleModalFilter;