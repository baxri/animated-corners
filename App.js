import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';

import Corners from "./components/Corners";
import FacebookHeads from "./components/FacebookHeads";

export default class App extends React.Component {
  render() {


    return (
      <View style={styles.container}>

        {/* <Corners / */}
        <FacebookHeads />

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
