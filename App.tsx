import React from "react";

import { useColorScheme } from "react-native";
import { Provider } from "react-redux";

import Navigation from "src/navigation";
import initializeStore from "src/store";

export default function App() {
	const store = initializeStore();
	return (
		<Provider store={store}>
			<Navigation />
		</Provider>
	);
}
