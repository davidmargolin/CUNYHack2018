import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase";
import {AppLoading} from 'expo';
import Navigator from './navigation/Navigator'
import LoginScreen from './pages/LoginScreen'
export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
     login_status: -1,
     new_user: false
    }
  }

  setNewDisplayName(name){
    this.setState({displayname: name, new_user: true})
  }

  componentDidMount() {
    var config = {
      apiKey: "AIzaSyByWpAy1yK5XrD5ENlXEIIsC5VxQOxLY7A",
      authDomain: "mta-scanner.firebaseapp.com",
      databaseURL: "https://mta-scanner.firebaseio.com",
      projectId: "mta-scanner",
      storageBucket: "mta-scanner.appspot.com",
      messagingSenderId: "1081675998683"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (this.state.new_user){
          user.updateProfile({
            displayName: this.state.displayname,
          }).then(()=>{
            console.log("Display Name Set To: " + user.displayName)
          });
        }
        this.setState({login_status: 1})
      }else{
        this.setState({login_status: 0})
      }
    })
  }

  render() {
      if (this.state.login_status == 0){
        return(
          <LoginScreen updateName={this.setNewDisplayName.bind(this)}/>
        )
      }else if (this.state.login_status == 1){
        return(
          <Navigator />
        )
      }else{
        return(
          <AppLoading/>
        )
      }
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
