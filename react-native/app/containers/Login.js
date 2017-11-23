/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';


import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView, Button,
    Alert
} from 'react-native';
import {Actions} from "react-native-router-flux";



users = [
    {
        user: 'admin@gmail.com',
        password: 'admin'
    },
    {
        user: 'lee@gmail.com',
        password: 'johncena'
    },
    {
        user: 'john@gmail.com',
        password: 'amigomiguel'
    },
    {
        user: 'Ala@gmail.com',
        password: 'Alagmail'
    },
]

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {currentUser: '',
                      currentPassword: ''}
    }



    registerNewAccount() {
        //TODO create actions and add to state. retain username
        Alert.alert("Be patient, my child", "The honor of gods has been bestowed upon you. " +
            "Soon, my child, you will taste the divine power")
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    };

    validatePassword = (password) => {
        //TODO create a more powerful security check
        return password.length > 4 && password.match("^[a-zA-Z].*$") != null
    }

    attemptLogin() {
        //console.log("IS this a valid mail:",this.validateEmail(this.state.currentUser))
        //console.log("IS this a valid password:", this.validatePassword(this.state.currentPassword))
       if (!this.validateEmail(this.state.currentUser) || !this.validatePassword(this.state.currentPassword)){
           Alert.alert('Invalid characters', 'Please enter a valid email address and a password longer than 4 characters')
       }
       for (let i = 0; i < users.length; i++) {
           if (users[i].user == this.state.currentUser && users[i].password == this.state.currentPassword)  {
               //TODO differentiate between the 2 type of users
               Actions.adminView()
               return;
           }
       }
       //If no user has been found alert the user for incorrect input
       Alert.alert('Incorrect data', 'The data provided does not suffice in entering the cube')
    }

    render() {
    return (
      <ScrollView style={{padding: 20}}>
          <View style={{flexDirection: 'column'}}>
              <Text style={styles.welcome}>
                  Username
              </Text>
              <TextInput
                onChangeText = {(text) => this.state.currentUser = text}
              />
          </View>
          <View style={{flexDirection: 'column'}}>
              <Text style={styles.welcome}>
                  Password
              </Text>
              <TextInput
                secureTextEntry = {true}
                onChangeText = {(text) => this.state.currentPassword = text}
              />
          </View>
          <View style={{margin: 7}}/>
          <Button
              title = "Submit"
              onPress = {() => {
                  this.attemptLogin();
              }}
          />
          <View style={{margin: 10}}/>
          <Button
              title = "Register"
              onPress = {() => {
                   this.registerNewAccount();
              }}
          />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
