import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  Text,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import PickerItem, { PickerItemProps } from "./PickerItem";

export interface RegionItem {
  value: string;
  label: string;
}

interface AppPickerProps extends Omit<TextInputProps, "style"> {
  icon?: string;
  items: RegionItem[];
  onSelectItem: (item: RegionItem) => void;
  placeholder?: string;
  selectedItem?: RegionItem;
}

const AppPicker = ({
  icon,
  items,
  selectedItem,
  onSelectItem,
  placeholder,
}: AppPickerProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            {icon && (
              <MaterialCommunityIcons
                name={icon}
                size={22}
                color="#6e6969"
                style={styles.icon}
              />
            )}
            {selectedItem ? (
              <Text style={styles.text}>{selectedItem.label}</Text>
            ) : (
              <Text style={styles.placeholder}>{placeholder}</Text>
            )}
            <MaterialCommunityIcons
              name="chevron-double-down"
              size={30}
              color="#0c0c0c"
              style={styles.chevron}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={showModal} animationType="slide">
        <View>
          <Button title="Close" onPress={() => setShowModal(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <PickerItem
                item={item}
                onPress={() => {
                  onSelectItem(item);
                  setShowModal(false);
                }}
              />
            )}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 18,
    color: "#000",
  },
  placeholder: {
    flex: 1,
    fontSize: 18,
    color: "#6e6969",
  },
  chevron: {
    alignSelf: "flex-end",
  },
});

export default AppPicker;
