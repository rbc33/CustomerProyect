import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

import stylesFn from "./styles";
import { HomeScreenNavigationProp } from "~/navigation";
import { clear } from "~/utilities/async_storage";

const Home = () => {
	const { navigate } = useNavigation<HomeScreenNavigationProp>();
	const styles = stylesFn();

	return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>Welcome to Customers Manager Plus </Text>
			<TouchableOpacity onPress={() => navigate("Home")} style={styles.button}>
				<Text>Click to continue...</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => clear()} style={styles.button}>
				<Text>Clear Storage...</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Home;
