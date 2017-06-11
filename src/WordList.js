/* @flow */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { head } from 'ramda';

const renderSubtitle = definitions => (
  <Text numberOfLines={1} style={styles.subtitle}>
    {head(definitions)}
  </Text>
);

const renderListItem = ({ word, type, definitions }) => (
  <ListItem
    key={word}
    title={word}
    leftIcon={{ name: 'stars', size: 32 }}
    subtitle={renderSubtitle(definitions)}
  />
);

const WordList = ({ words }) => (
  <List style={{ flex: 1 }}>
    {words.map(renderListItem)}
  </List>
);

const styles = StyleSheet.create({
  subtitle: {
    color: '#aaa'
  }
});

export default WordList;
