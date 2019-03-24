import React, { Component } from 'react'
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'

const BOX_SIZE = 100;

export default class Corners extends Component {

    constructor(props) {
        super(props)

        this.state = {
            animation: new Animated.ValueXY(),
        }
    }

    componentDidMount() {

        const { width, height } = Dimensions.get('window');

        Animated.sequence([

            Animated.spring(this.state.animation.y, {
                toValue: height - BOX_SIZE,
                duration: 500,
            }),

            Animated.spring(this.state.animation.x, {
                toValue: width - BOX_SIZE,
                duration: 500,
            }),

            Animated.spring(this.state.animation.y, {
                toValue: 0,
                duration: 500,
            }),

            Animated.spring(this.state.animation.x, {
                toValue: 0,
                duration: 500,
            }),

        ]).start();
    }

    render() {

        const animatedStyles = {
            transform: this.state.animation.getTranslateTransform(),
        };

        return (
            <Animated.View style={[styles.box, animatedStyles]}>

            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        width: BOX_SIZE,
        height: BOX_SIZE,
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});