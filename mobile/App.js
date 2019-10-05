import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
 'Unrecognized WebSocket',
 "Can't perform a React state update on an unmounted component",
 'Possible Unhandled Promise Rejection (id: 0)'
]);

import Routes from './src/routes';

export default function App() {
  return <Routes />
}
