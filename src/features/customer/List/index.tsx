import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

import { Customer, useListCustomers } from '../hooks';
import Row from './row';
import styles from './styles';

const List = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { navigate } = useNavigation();
  const currentCustomers = useListCustomers();
  const route = useRoute();
  const { region } = route.params || {}; // Extraer la región de los parámetros de la ruta

  useEffect(() => {
    if (region && currentCustomers) {
      // Filtrar clientes por región si se proporciona una región
      const filteredCustomers = currentCustomers.filter(customer => customer.region === region);
      setCustomers(filteredCustomers);
    } else {
      // Si no hay región o no hay clientes, mostrar todos los clientes
      setCustomers(currentCustomers || []);
    }
  }, [currentCustomers, region]); // Ejecutar cuando cambie currentCustomers o region

  return (
    <View>
      <Text>{region ? `Customers in ${region}` : 'All Customers'}</Text>

      {customers && customers.length > 0 ? (
        <FlatList
          data={customers}
          renderItem={(props) => <Row {...props} />}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <>
          <Text>{region ? `No Customers in ${region}` : 'No Customers'}</Text>
          <Button title="Add Customer" onPress={() => navigate('Add Customer')} />
        </>
      )}
    </View>
  );
};

export default List;
