import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1850bf',
    underlineColor: 'transparent',
  },
};
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
