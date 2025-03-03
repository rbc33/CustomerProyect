import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Customer, useRemoveCustomer } from "../hooks";
import { SwipeRow } from "react-native-swipe-list-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import { EditCustomerScreenNavigationProp } from "src/navigation";

interface RowProps {
	item: Customer;
}

const Row = ({ item }: RowProps) => {
	const { navigate } = useNavigation<EditCustomerScreenNavigationProp>();
	const { onRemove } = useRemoveCustomer(item.id);

	const renderHiddenItem = () => (
		<View
			style={{
				alignItems: "center",
				backgroundColor: "red",
				flex: 1,
				flexDirection: "row",
				justifyContent: "flex-end", // Cambiado a flex-end
				paddingRight: 15, // Cambiado paddingLeft por paddingRight
			}}
		>
			<TouchableOpacity
				style={{
					backgroundColor: "red",
					justifyContent: "center",
					alignItems: "center",
					width: 50, // Aumentado para coincidir con rightOpenValue
					height: "100%",
				}}
				onPress={onRemove}
			>
				<Ionicons name="trash-outline" size={24} color="white" />
			</TouchableOpacity>
		</View>
	);

	return (
		<SwipeRow
			rightOpenValue={-75}
			disableRightSwipe
			previewRowKey={`${item.id}`}
			closeOnRowPress
			useNativeDriver={false}
		>
			{renderHiddenItem()}
			<TouchableOpacity
				onLongPress={() => navigate("Edit Customer", { customerID: item.id })}
			>
				<View
					key={item.id}
					style={{
						borderWidth: 1,
						padding: 10,
						backgroundColor: "white", // Añadido fondo blanco
					}}
				>
					<Text key="id">ID: {item.id}</Text>
					<Text key="fn">First Name: {item.firstName}</Text>
					<Text key="ln">Last Name: {item.lastName}</Text>
					<Text key="ac">Active?: {item.active ? "active" : "inactive"}</Text>
					<Text key="reg">Region: {item.region}</Text>
				</View>
			</TouchableOpacity>
		</SwipeRow>
	);
};

export default Row;
