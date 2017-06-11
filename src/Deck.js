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

  renderCard(item, index) {
    return index === 0 ?
      this.renderFirstCard(item) :
      this.props.renderCard(item, index);
  }

  renderFirstCard(item) {
    return (
      <Animated.View key={item.id} style={this.position.getLayout()} {...this.panResponder.panHandlers}>
        {this.props.renderCard(item)}
      </Animated.View>
    );
  }

  renderCards() {
    return this.props.data.map(this.renderCard.bind(this));
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
