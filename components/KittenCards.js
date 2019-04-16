import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, Animated, PanResponder, Image } from 'react-native'

import Cat1 from '../images/cat1.jpeg';
import Cat2 from '../images/cat2.jpeg';
import Cat3 from '../images/cat3.jpeg';
import Cat4 from '../images/cat4.jpeg';

const SWIPE_THRESHOLD = 120;
const { height } = Dimensions.get('window');

export default class KittenCards extends Component {

    constructor(props) {
        super(props)

        this.state = {
            items: [
                {
                    image: Cat1,
                    id: 1,
                    text: "Sweet Cat"
                },
                {
                    image: Cat2,
                    id: 2,
                    text: "Sweeter Cat"
                },
                {
                    image: Cat3,
                    id: 3,
                    text: "Sweetest Cat"
                },
                {
                    image: Cat4,
                    id: 4,
                    text: "Aww"
                }
            ],
            animation: new Animated.ValueXY(),
            opacity: new Animated.Value(1),
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            // onPanResponderMove: (evt, { dx, dy }) => {

            //     // The most recent move distance is gestureState.move{X,Y}
            //     // The accumulated gesture distance since becoming responder is
            //     // gestureState.d{x,y}

            // },

            onPanResponderMove: Animated.event([
                null,
                {
                    dx: this.state.animation.x,
                    // dy: this.state.animation.y
                }
            ]),

            onPanResponderRelease: (evt, { dx, vx, vy }) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded


                if (Math.abs(dx) < SWIPE_THRESHOLD) {
                    Animated.spring(this.state.animation, {
                        toValue: { x: 0, y: 0 }
                    }).start();
                } else {

                    let final = 0;

                    if (dx > 0) {
                        final = 200;
                    } else {
                        final = -200;
                    }

                    
                    Animated.decay(this.state.animation, {
                        velocity: { x: final, y: vy },
                        deceleration: .50
                    }).start(this.transitionNext);
                }

            },

        });
    }

    transitionNext = () => {
        this.setState({ items: this.state.items.slice(1) }, () => {
            this.state.animation.setValue({ x: 0, y: 0 })
        });
    }

    render() {

        const { animation } = this.state;

        const rotate = animation.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['-30deg', '0deg', '30deg'],
            // extrapolate: 'clamp',
        });

        const opacity = animation.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: [.5, 1, .5],
            // extrapolate: 'clamp',
        });

        const animatedCardStyle = {
            opacity: this.state.opacity,
            transform: [{
                rotate
            },
            ...this.state.animation.getTranslateTransform()
            ]
        };

        const animatedImageStyle = {
            opacity,
        };

        return (
            <View style={styles.container}>
                <View style={styles.top}>

                    {
                        this.state.items.slice(0, 2).reverse().map(({ image, id, text }, index, items) => {

                            const isLastItem = index === items.length - 1;
                            const panHandlers = isLastItem ? this._panResponder.panHandlers : {};

                            const cardStyle = isLastItem ? animatedCardStyle : undefined;
                            const imageStyle = isLastItem ? animatedImageStyle : undefined;

                            return (<Animated.View key={id} style={[styles.card, cardStyle]}>
                                <Animated.Image
                                    source={image}
                                    resizeMode="cover"
                                    style={[styles.image, imageStyle]}
                                    {...panHandlers}
                                />
                                <View style={[styles.lowerText]}>
                                    <Text >{text}</Text>
                                </View>
                            </Animated.View>)
                        })
                    }

                </View>
                <View style={styles.buttonBar}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },

    card: {
        flex: 1,
        width: 300,
        height: 300,
        position: 'absolute',
        borderRadius: 3,
        shadowColor: '#000',
        shadowOpacity: .1,
        shadowOffset: { x: 0, y: 0 },
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: '#FFF'
    },

    image: {
        width: null,
        height: null,
        flex: 0.8,
        borderRadius: 2,
    },

    lowerText: {
        flex: 0.2,
        backgroundColor: '#FFF',
        padding: 5,
    }
})
