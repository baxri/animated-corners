import React, { Component } from 'react'
import { StyleSheet, Text, View, Animated, Dimensions, PanResponder, Image } from 'react-native'

import me from '../assets/me.jpg';

export default class FacebookHeads extends Component {

    constructor(props) {
        super(props)

        this.state = {
            heads: [
                {
                    image: me,
                    animation: new Animated.ValueXY(),
                    text: 'George B.'
                },
                {
                    image: me,
                    animation: new Animated.ValueXY(),
                },
                {
                    image: me,
                    animation: new Animated.ValueXY(),
                },
                {
                    image: me,
                    animation: new Animated.ValueXY(),
                },
                {
                    image: me,
                    animation: new Animated.ValueXY(),
                }
            ]
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, { dx, dy }) => {
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!
                // gestureState.d{x,y} will be set to zero now

                this.state.heads.map(({ animation }) => {
                    animation.extractOffset();
                    // setValue Animated bug fix
                    animation.setValue({ x: 0, y: 0 });

                });
            },
            onPanResponderMove: (evt, { dx, dy }) => {
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}

                this.state.heads[0].animation.setValue({
                    x: dx,
                    y: dy,
                });

                this.state.heads.slice(1).map(({ animation }, index) => {

                    Animated.sequence([
                        Animated.delay(index * 10),
                        Animated.spring(animation, {
                            toValue: { x: dx, y: dy }
                        })
                    ]).start();
                });
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.heads
                    .slice(0)
                    .reverse()
                    .map((item, index, items) => {
                        const pan = index === items.length - 1 ? this._panResponder.panHandlers : {};

                        return (
                            <Animated.View
                                {...pan}
                                key={index}
                                style={[styles.wrap, { transform: item.animation.getTranslateTransform() }]}
                            >
                                <Image source={item.image} style={styles.head} />
                                <Text>{item.text}</Text>
                            </Animated.View>
                        );
                    })}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    box: {

    },

    wrap: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 80,
    },
    head: {
        width: 80,
        height: 80,
        borderRadius: 40,
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    },


});