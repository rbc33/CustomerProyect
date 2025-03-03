import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { RegionItem } from "./Picker";

export interface PickerItemProps {
  item: RegionItem;
  onPress: () => void;
}

const PickerItem = ({ item, onPress }: PickerItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: {
    fontSize: 16,
  },
});

export default PickerItem;
