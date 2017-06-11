import React, { Component } from 'react';
import { Animated, Dimensions, PanResponder, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5;
const SWIPE_OUT_DURATION = 200;
const SWIPE = { RIGHT: 'right', LEFT: 'left' };

class Deck extends Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY(0, 0);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, { dx }) => this.position.setValue({ x: dx }),
      onPanResponderRelease: (event, { dx }) => {
        if (dx >= SWIPE_THRESHOLD) {
          this.forceSwipe(SWIPE.RIGHT);
        } else if (dx <= -SWIPE_THRESHOLD) {
          this.forceSwipe(SWIPE.LEFT);
        } else {
          this.resetPosition();
        }
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

  forceSwipe(direction) {
    if (direction !== SWIPE.LEFT && direction !== SWIPE.RIGHT) {
      throw new Error('invalid swipe direction');
    }

    const x =  direction === SWIPE.RIGHT ? SCREEN_WIDTH : -SCREEN_WIDTH;

    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start();
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

	render() {
		return (
      <View>
        {this.props.data.map(this.renderCard.bind(this))}
      </View>
		);
	}
}

export default Deck;
