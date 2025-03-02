import React from 'react';
import { View, SafeAreaView } from 'react-native';
import List from '~/features/customer/List';

// top level display component only - declares a view that will be part of navigation
const NewScreen = () => (
  <SafeAreaView>
    <View>
      <List />
    </View>
  </SafeAreaView>
);

export default NewScreen;
