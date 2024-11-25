import React from 'react';
import { registerRootComponent } from 'expo';
import AppNavigator from './App/navigation/index.jsx';

export default function App() {
  return <AppNavigator />;
}

registerRootComponent(App);
