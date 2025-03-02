import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styleFn from './style';

const Loading = () => {
  const styles = styleFn();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>'Loading...'</Text>
    </View>
  );
};
export default Loading;
