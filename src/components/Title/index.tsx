import React from "react";
import { Text } from "react-native";

import stylesFn from "./styles";

interface TitleProps {
	text: string;
}

const Title = ({ text }: TitleProps) => {
	const styles = stylesFn();

	return <Text style={styles.title}>{text}</Text>;
};
export default Title;
