import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
 'Unrecognized WebSocket'
]);

import Routes from './src/routes';

export default function App() {
  return <Routes />
}
