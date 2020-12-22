import React, { Component } from 'react';
import { Text } from 'react-native';
import { ScrollView, View, Button, Image } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Input, CheckBox } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => ({
  login: state.login,
});

class Information extends Component {
  render() {
    return (
      <Animatable.View style={{ justifyContent: 'center', margin: 20 }} animation="fadeInDown" duration={2000} delay={1000}>
        <Image style={{ margin: 10, width: 80, height: 60 }}
          source={{ uri: this.props.login.data.IMAGE }}
          loadingIndicatorSource={baseUrl + 'images/logo.jpg'} />
        <Input
          placeholder='Username'
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          value={this.props.login.data.USERNAME}
          editable = {false} />
        <Input
          placeholder='First Name'
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          value={this.props.login.data.FIRSTNAME}
          editable = {false} />
        <Input
          placeholder='Last Name'
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          value={this.props.login.data.LASTNAME}
          editable = {false} />
        <Input
          placeholder='Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
          value={this.props.login.data.EMAIL}
          editable = {false} />
      </Animatable.View>
    );
  }
}
export default connect(mapStateToProps, null)(Information);