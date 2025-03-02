import { StyleSheet } from "react-native";

const stylesFn = () =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			padding: 20,
		},
		paragraph: {
			fontSize: 18,
			textAlign: "center",
			marginBottom: 20,
		},
		button: {
			margin: 5,
			padding: 10,
			borderRadius: 5,
			borderWidth: 2,
		},
	});
export default stylesFn;
