import React from 'react';
import { SafeAreaView } from 'react-native';
import AnimalOfTheDay from '~/features/animal/AnimalOfTheDay';

const NewScreen = () => {
  return (
    <SafeAreaView>
      <AnimalOfTheDay />
    </SafeAreaView>
  );
};
export default NewScreen;
