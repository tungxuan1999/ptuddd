import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

import { login } from '../redux/ActionCreators';

const mapDispatchToProps = (dispatch) => ({
  login : (name, password) => dispatch(login(name,password))
  
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false
    }
  }
  componentDidMount() {
    SecureStore.getItemAsync('userinfo')
      .then((userdata) => {
        let userinfo = JSON.parse(userdata);
        if (userinfo) {
          this.setState({ username: userinfo.username });
          this.setState({ password: userinfo.password });
          this.setState({ remember: true })
        }
      })
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', margin: 20 }}>
        <Input
          placeholder='Username'
          leftIcon={{ name: 'user-o', type: 'font-awesome' }}
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })} />
        <Input
          placeholder='Password'
          leftIcon={{ name: 'key', type: 'font-awesome' }}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })} />
        <CheckBox containerStyle={{ backgroundColor: null }}
          title='Remember Me' center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })} />
        <View style={{ marginTop: 20 }}>
          <Button title='Login' color='#7cc' onPress={() => this.handleLogin()} />
        </View>
      </View>
    );
  }
  handleLogin() {
    if (this.state.remember) {
      SecureStore
        .setItemAsync('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password }))
        .catch((error) => alert('Could not save user info', error));
      this.login(this.state.username,this.state.password);
      alert(this.state.username)
    } else {
      SecureStore
        .deleteItemAsync('userinfo')
        .catch((error) => alert('Could not delete user info', error));
        this.login(this.state.username,this.state.password);
    }
  }

  login(name, password) {
    this.props.login(name,password);
  }
}
export default connect(null,mapDispatchToProps)(Login);