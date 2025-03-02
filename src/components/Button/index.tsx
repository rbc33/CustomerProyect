import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import stylesFn from './styles';

interface ButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  marginBottom?: number;
}

const Button = ({ onPress, text, marginBottom, disabled = false }: ButtonProps) => {
  const styles = stylesFn();

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={{ ...styles.button, marginBottom: marginBottom }}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Button;
