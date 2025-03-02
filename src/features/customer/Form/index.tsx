import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Switch, Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { useUpdateFields } from "../hooks";
import formStyles from "./styles";

import Button from "~/components/Button";
import { INPROGRESS, PENDING } from "~/utilities/helpers";

type RootStackParamList = {
	Customers: {
		filter?: string;
		sortBy?: string;
		someData?: any;
	};
};

type NavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"Customers"
>;

const Form = ({ handleSubmit, status, customerID }) => {
	const styles = formStyles();
	const { navigate } = useNavigation<NavigationProp>();
	const { fields, setFormField } = useUpdateFields(customerID);

	const { firstName, lastName, active, region } = fields;

	const onSubmit = () => {
		handleSubmit();
		setTimeout(() => {
			navigate("Customers", {
				filter: "recent",
				sortBy: "name",
				someData: { lastAdded: `${firstName} ${lastName}` },
			});
		}, 1000);
	};

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<TextInput
					key="firstName"
					placeholder={firstName || "First Name"}
					value={firstName || ""}
					style={{
						borderWidth: 1,
						borderColor: "black",
						borderRadius: 4,
						padding: 15,
					}}
					onChangeText={(v) => setFormField("firstName", v)}
				/>

				<View style={{ height: 15, width: "100%" }} />

				<TextInput
					key="lastName"
					placeholder={lastName || "Last Name"}
					value={lastName || ""}
					style={{
						borderWidth: 1,
						borderColor: "black",
						borderRadius: 4,
						padding: 15,
					}}
					onChangeText={(v) => setFormField("lastName", v)}
				/>

				<View style={{ height: 15, width: "100%" }} />

				<RNPickerSelect
					placeholder={{ label: "Select a region...", value: null }}
					value={region}
					onValueChange={(v) => setFormField("region", v)}
					items={[
						{ label: "North East", value: "North East" },
						{ label: "North West", value: "North West" },
						{ label: "South East", value: "South East" },
						{ label: "South West", value: "South West" },
					]}
					style={{
						inputIOS: {
							fontSize: 16,
							paddingVertical: 12,
							paddingHorizontal: 10,
							marginVertical: 12,
							borderWidth: 1,
							borderColor: "black",
							borderRadius: 4,
							color: "black",
							paddingRight: 30, // para dejar espacio para el icono
							backgroundColor: "white",
						},
						inputAndroid: {
							fontSize: 16,
							paddingHorizontal: 10,
							paddingVertical: 8,
							// marginVertical: 12,
							borderWidth: 1,
							borderColor: "black",
							borderRadius: 4,
							color: "black",
							paddingRight: 30, // para dejar espacio para el icono
							backgroundColor: "white",
						},
						placeholder: {
							color: "gray",
						},
					}}
					useNativeAndroidPickerStyle={false}
				/>

				<View style={{ height: 15, width: "100%" }} />

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						padding: 15,
						borderWidth: 1,
						borderColor: "black",
						borderRadius: 4,
						marginBottom: 15,
					}}
				>
					<Text>Active</Text>
					<Switch
						value={active || false}
						onValueChange={(v) => setFormField("active", v)}
						trackColor={{ false: "#767577", true: "#81b0ff" }}
						thumbColor={active ? "#f5dd4b" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
					/>
				</View>

				<Button
					onPress={onSubmit}
					text="Submit"
					disabled={status !== PENDING && status !== INPROGRESS}
				/>
			</View>
		</View>
	);
};

export default Form;
