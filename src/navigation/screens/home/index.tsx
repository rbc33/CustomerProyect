import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Button from '~/components/Button';
import Title from '~/components/Title';
import welcomeStyles from './styles';

export default function Welcome() {
  const styles = StyleSheet.create(welcomeStyles());
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Customers Manager</Text>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => navigate('Add Customer')}
              text="Add an Customer"
              disabled={false}
              marginBottom={20}
            />

            <Button
              onPress={() => navigate('Customers', { region: 'North East' })}
              text="North East"
              disabled={false}
            />
            <Button
              onPress={() => navigate('Customers', { region: 'North West' })}
              text="North West"
              disabled={false}
            />
            <Button
              onPress={() => navigate('Customers', { region: 'South East' })}
              text="South East"
              disabled={false}
            />
            <Button
              onPress={() => navigate('Customers', { region: 'South West' })}
              text="South West"
              disabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
