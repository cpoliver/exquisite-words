import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

class Ball extends Component {
  render() {
    return (
      <View style={styles.ball} />
    );
  }
}

const styles = StyleSheet.create({
  ball: {
    borderColor: 'black',
    borderRadius: 30,
    borderWidth: 30,
    height: 60,
    width: 60
  }
});

export default Ball;
