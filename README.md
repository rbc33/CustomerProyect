# React Native Customers App

This is a React Native application built with Expo for managing customer information.

## Technologies Used

- React Native
- Expo
- TypeScript
- Redux for state management
- React Navigation for routing

## Features

- Create, read, update, and delete customers
- Filter and sort customer lists
- Form validation
- Push notifications
- Custom UI components

## Custom Components

The app includes a custom Picker component that was adapted from the CodeWithMosh React Native course. This component provides a consistent UI for selection inputs across both iOS and Android platforms.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Installation

# Install dependencies

```bash
npm install
```

### Running the App

# Start the Expo development server

```bash
npm start
```

Then, you can:

- Press \`i\` to open in iOS simulator
- Press \`a\` to open in Android emulator
- Scan the QR code with the Expo Go app on your physical device

## Project Structure

```
/src
  /components      # Reusable UI components
  /features        # Feature-based modules
    /customer      # Customer management feature
      /Form        # Customer form components
      /List        # Customer listing components
      /New         # New customer creation
  /utilities       # Helper functions and constants
```

## Notes

- The app uses Expo Notifications for push notifications
- Custom form validation is implemented for data integrity
- The app demonstrates proper state management with Redux
