import React, { Component } from 'react';
import { Animated, PanResponder, View } from 'react-native';

class Deck extends Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY(0, 0);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, { dx }) => this.position.setValue({ x: dx }),
      onPanResponderRelease: () => {}
    });
  }

  getCardStyle() {
    const { position } = this;

    const rotate = position.x.interpolate({
      inputRange: [-500, 0, 500],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCard(item, index) {
    return index === 0 ?
      this.renderFirstCard(item) :
      this.props.renderCard(item, index);
  }

  renderFirstCard(item) {
    const { panHandlers } = this.panResponder;

    return (
      <Animated.View {...panHandlers} key={item.id} style={this.getCardStyle()}>
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
