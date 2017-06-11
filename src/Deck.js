import React, { Component } from 'react';
import { Animated, PanResponder, View } from 'react-native';

class Deck extends Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY(0, 0);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, { dx, dy }) => {
        this.position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: () => {}
    });
  }

  renderCards() {
    const { data, renderCard } = this.props;

    return data.map(renderCard);
  }

	render() {
		return (
      <Animated.View style={this.position.getLayout()} {...this.panResponder.panHandlers}>
        {this.renderCards()}
      </Animated.View>
		);
	}
}

export default Deck;
