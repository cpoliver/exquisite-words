import React, { Component } from 'react';
import { Animated, View } from 'react-native';

class Deck extends Component {
  renderCards() {
    const { data, renderCard } = this.props;

    return data.map(renderCard);
  }

	render() {
		return (
      <View>
        {this.renderCards()}
      </View>
		);
	}
}

export default Deck;
