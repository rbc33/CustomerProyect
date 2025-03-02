import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import EditCustomer from './screens/customers/Edit';
import CustomersList from './screens/customers/List';
import AddCustomer from './screens/customers/New';
import HomeScreen from './screens/home/';
import WelcomeScreen from './screens/welcome';

// Definición de tipos para la navegación
export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  'Add Customer': undefined;
  'Edit Customer': { customerID: number };
  Customers: {
    region: string;
  };
};

// Tipos para useNavigation
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Tipos específicos para cada pantalla
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type AddCustomerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Add Customer'
>;
export type EditCustomerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Edit Customer'
>;
export type CustomersScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Customers'
>;

// Tipos para useRoute
export type CustomersScreenRouteProp = RouteProp<RootStackParamList, 'Customers'>;
export type EditCustomerScreenRouteProp = RouteProp<RootStackParamList, 'Edit Customer'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Customer" component={AddCustomer} />
        <Stack.Screen name="Edit Customer" component={EditCustomer} />
        <Stack.Screen name="Customers" component={CustomersList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
