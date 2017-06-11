import React, { Component } from 'react';
import { Animated, Dimensions, PanResponder, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5;

class Deck extends Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY(0, 0);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, { dx }) => this.position.setValue({ x: dx }),
      onPanResponderRelease: (event, { dx }) => {
        if (dx >= SWIPE_THRESHOLD) {
          // swipe right
          return;
        }

        if (dx <= -SWIPE_THRESHOLD) {
          // swipe left
          return;
        }

        this.resetPosition();
      }
    });
  }

  getCardStyle() {
    const { position } = this;

    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  resetPosition() {
    Animated.spring(this.position, {
        toValue: { x: 0, y: 0 }
    }).start();
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
