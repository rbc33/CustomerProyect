import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import React, { useEffect, useRef } from 'react';
import { Alert, Keyboard, Platform, StyleSheet, Text, View } from 'react-native';
import Button from 'src/components/Button';

// Configuración de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const animalsOfTheWeek = [
  'Wallaby',
  'Peregrin Falcon',
  'Dolphin',
  'Elephant',
  'Okapi',
  'Poison Arrow Frog',
  'Dingo',
];

const onSubmit = async (seconds: number) => {
  Keyboard.dismiss();

  // Verificar permisos antes de programar
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Permissions required',
      'Please allow notifications to receive animal of the day updates',
      [{ text: 'OK', onPress: askNotification }]
    );
    return;
  }

  try {
    // Cancelar notificaciones anteriores
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Crear una fecha para el trigger con el retraso especificado
    const triggerDate = new Date();
    triggerDate.setSeconds(triggerDate.getSeconds() + seconds);

    const id = await Notifications.scheduleNotificationAsync({
      //   const schedulingOptions = {
      content: {
        title: `Your animal of the day is ${animalsOfTheWeek[Math.floor(Math.random() * animalsOfTheWeek.length)]}`,
        body: 'Open the app to read more about your animal of the day!',
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: 'blue',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
      },
    });

    // const id = await Notifications.scheduleNotificationAsync(schedulingOptions);
    console.log('Notification scheduled with ID:', id, 'for time:', triggerDate.toString());

    Alert.alert(
      'Success',
      'You will receive your animal of the day notification in ' + seconds + ' seconds!'
    );
  } catch (error) {
    console.error('Error scheduling notification:', error);
    Alert.alert('Error', 'Failed to schedule notification');
  }
};

const handleNotification = (notification: Notifications.Notification) => {
  console.log('Notification received:', notification);
};

const askNotification = async () => {
  // Solicitar permisos para iOS y Android
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (Device.isDevice && existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert(
      'Permission required',
      'Please enable notifications in your device settings to use this feature',
      [{ text: 'OK' }]
    );
    return false;
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  console.log('Notification permissions granted.');
  return true;
};

const AnimalOfTheDay = () => {
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    askNotification();

    // Listener para notificaciones recibidas cuando la app está en primer plano
    notificationListener.current =
      Notifications.addNotificationReceivedListener(handleNotification);

    // Listener para respuestas a notificaciones (cuando el usuario toca la notificación)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animal of the Day</Text>
      <Text style={styles.description}>
        Press the button to get your very own animal of the day!
      </Text>

      <Button onPress={() => onSubmit(10)} text="Schedule (5s)" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default AnimalOfTheDay;
