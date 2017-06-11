import Expo from 'expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import words from './data/words.json';
import WordList from './src/WordList';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WordList words={words} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  }
});

Expo.registerRootComponent(App);
