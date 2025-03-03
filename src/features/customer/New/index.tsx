import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from "react";
import {
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Form from "../Form";
import { useNewCustomer, useCreateCustomerStatus } from "../hooks";

// Configuración de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Add this array at the top level of the file
const NOTIFICATION_MESSAGE = {
  title: "New Customer Created",
  body: "A new customer has been successfully added to your database!",
};

const onNotify = async (seconds: number) => {
  Keyboard.dismiss();

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permissions Required",
      "Please allow notifications to receive updates",
      [{ text: "OK", onPress: askNotification }],
    );
    return;
  }

  try {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const triggerDate = new Date();
    triggerDate.setSeconds(triggerDate.getSeconds() + seconds);

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: NOTIFICATION_MESSAGE.title,
        body: NOTIFICATION_MESSAGE.body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: "blue",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
      },
    });

    console.log(
      "Notification scheduled with ID:",
      id,
      "for time:",
      triggerDate.toString(),
    );

    Alert.alert(
      "Success",
      `You will receive a notification in ${seconds} seconds!`,
    );
  } catch (error) {
    console.error("Error scheduling notification:", error);
    Alert.alert("Error", "Failed to schedule notification");
  }
};

const handleNotification = (notification: Notifications.Notification) => {
  console.log("Notification received:", notification);
};

const askNotification = async () => {
  // Solicitar permisos para iOS y Android
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (Device.isDevice && existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert(
      "Permission required",
      "Please enable notifications in your device settings to use this feature",
      [{ text: "OK" }],
    );
    return false;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  console.log("Notification permissions granted.");
  return true;
};

const New = () => {
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();
  const { onSubmit } = useNewCustomer();
  const status = useCreateCustomerStatus();

  useEffect(() => {
    askNotification();

    // Listener para notificaciones recibidas cuando la app está en primer plano
    notificationListener.current =
      Notifications.addNotificationReceivedListener(handleNotification);

    // Listener para respuestas a notificaciones (cuando el usuario toca la notificación)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!,
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  const handleSubmit = async () => {
    await onSubmit();
    await onNotify(5);
  };

  return <Form handleSubmit={handleSubmit} status={status} customerID={null} />;
};

export default New;
