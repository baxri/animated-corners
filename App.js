import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';

import Corners from "./components/Corners";
import FacebookHeads from "./components/FacebookHeads";
import KittenCards from "./components/KittenCards";

export default class App extends React.Component {
  render() {


    return (
      <View style={styles.container}>

        {/* <Corners / */}
        {/* <FacebookHeads /> */}
        <KittenCards />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
