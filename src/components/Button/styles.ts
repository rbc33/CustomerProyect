import { BorderRadius } from './../../../node_modules/lightningcss/node/ast.d';
import { StyleSheet } from 'react-native';

const stylesFn = () => {
  return StyleSheet.create({
    button: {
      margin: 5,
      padding: 10,
      borderRadius: 5,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      width: 180,
    },
  });
};

export default stylesFn;
