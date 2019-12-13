
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, BarCodeScanner, Permissions } from 'expo';
import Button from 'react-native-button';




export default class App extends React.Component {
  render() {
    return (

      <View style={styles.container}>

      <Button>press me</Button>
        <Text>henlo</Text>

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
