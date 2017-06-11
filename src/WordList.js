/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { head } from 'ramda';

type WordType = {
  word: String,
  definitions: String[]
}

const renderSubtitle = definitions => (
  <Text numberOfLines={1} style={styles.subtitle}>
    {head(definitions)}
  </Text>
);

// eslint-disable-next-line react/prop-types
const renderListItem = ({ word, definitions }) => (
  <ListItem
    key={word}
    title={word}
    leftIcon={{ name: 'stars', size: 32 }}
    subtitle={renderSubtitle(definitions)}
  />
);

const WordList = ({ words } : { words: WordType[] }) => (
  <List style={{ flex: 1 }}>
    {words.map(renderListItem)}
  </List>
);

const styles = StyleSheet.create({
  subtitle: {
    color: '#aaa'
  }
});

WordList.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    definitions: PropTypes.arrayOf(PropTypes.string).isRequired
  })).isRequired
};

export default WordList;
