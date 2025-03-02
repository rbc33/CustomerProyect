import { StyleSheet } from 'react-native';

const styleFn = (disabled, reverse) => {
  return StyleSheet.create({
    container: {
      borderRadius: 9.34,
      paddingHorizontal: 30,
      paddingVertical: 10,
    },
    text: {
      fontFamily: 'Avenir',
      alignSelf: 'center',
      textAlign: 'center',
    },
  });
};

export default styleFn;
