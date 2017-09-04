import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios'
const client = require('socket.io-client')


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      classText: 'package testapp; \r\n \r\n'
      +' public class TestApp {  \r\n\r\n1``'
      +' public static void main(String[] args){ \r\n \r\n }'
      +' \r\n\r\n }'
    }

    this.sendToServer = this.sendToServer.bind(this)
  }

  sendToServer(e){
    console.log('hit here')
    var socket = client.connect('ws://localhost:15000', {reconnect: true})
    
    socket.on('connect', function (socket) {
        console.log('Connected!');
        socket.emit('send_class_to_compile', {data: 'here is some data'})
    });
    
    
  }

  render() {
    console.log('i\'m rendering');
    return (
      <View style={styles.container}>
        <Text>Testing Class Compiler</Text>
        <TextInput
        multiline={true}
        style={{height: '70%', width: '100%', borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({classText: text})}
        value={this.state.classText}
      />

      <Button
          onPress={this.sendToServer}
          title="Send To Server"
          color="#841584"
          accessibilityLabel="Send To Server to Compile and get Response"
        />
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
