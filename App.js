import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios'
//import GoogleSignIn from 'react-native-google-signin'; 
const client = require('socket.io-client') 

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      classText: 'package Java; \r\n \r\n'
      +' public class TestApp {  \r\n\r\n'
      +' public static void main(String[] args){ \r\n '
      +'  for(int i = 0; i < 100; i++) { \r\n'
      +'     System.out.println(\"Testing\: " + i);' 
      +'    \r\n }'
      +'\r\n }'
      +' \r\n\r\n }' 
    }

  }

  sendToServer(a,b,c){
    console.log('hit here 123')
    var self = this;
    this.socket = client.connect('ws://73.187.131.221:15000', {reconnect: true})
    
    this.socket.on('connect', () => {
        console.log('Connected!');
        this.socket.emit('send_class_to_compile', {data: self.state.classText})
    });
    
    this.socket.on('receive_error', (data)=>{
      Alert.alert(
        'Java Error! Nice one idiot',
        data,
        [
          //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
    })

    this.socket.on('receive_output',(data)=>{
      Alert.alert(
        'Java Output From Successful Compile',
        data,
        [
          //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )

    })
    
  }

  async _signIn(){
    const user = await GoogleSignIn.signInPromise();
    console.log(user);
  }

  render() {
    console.log('i\'m rendering');
    return (
      <View style={styles.container}>
        <Text>Testing Class Compiler</Text>
        <TextInput
        multiline={true}
        blurOnSubmit={false}
        style={{height: '70%', width: '100%', borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => {
          this.setState({classText: text})}
          }
        value={this.state.classText}
      />

      <Button
          onPress={this.sendToServer.bind(this)}
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
