import React, { Component } from 'react';
import { ScrollView, View, Button, Image } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { register } from '../redux/ActionCreators';
import * as SecureStore from 'expo-secure-store';

const mapDispatchToProps = (dispatch) => ({
  signup: (name, password, email, firstname, lastname, image) => dispatch(register(name, password, email, firstname, lastname, image)),
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: baseUrl + 'images/logo.jpg',
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      remember: false
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={{ justifyContent: 'center', margin: 20 }}>
          <View style={{ flex: 1, flexDirection: 'row', margin: 20 }}>
            <Image style={{ margin: 10, width: 80, height: 60 }}
              source={{ uri: this.state.imageUrl }}
              loadingIndicatorSource={baseUrl + 'images/logo.jpg'} />
            <View style={{ justifyContent: 'center' }}>
              <Button title='Camera' onPress={() => this.getImageFromCamera()} />
            </View>
          </View>
          <Input
            placeholder='Username'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })} />
          <Input
            placeholder='Password'
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })} />
          <Input
            placeholder='First Name'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            value={this.state.firstname}
            onChangeText={(firstname) => this.setState({ firstname })} />
          <Input
            placeholder='Last Name'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            value={this.state.lastname}
            onChangeText={(lastname) => this.setState({ lastname })} />
          <Input
            placeholder='Email'
            leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })} />
          {/* <CheckBox containerStyle={{ backgroundColor: null }}
            title='Remember Me' center
            checked={this.state.remember}
            onPress={() => this.setState({ remember: !this.state.remember })} /> */}
          <View style={{ marginTop: 20 }}>
            <Button title='Register' color='#7cc' onPress={() => this.handleRegister()} />
          </View>
        </View>
      </ScrollView>
    );
  }
  async getImageFromCamera() {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
      let capturedImage = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3] });
      if (!capturedImage.cancelled) {
        //alert(JSON.stringify(capturedImage));
        this.setState({ imageUrl: capturedImage.uri });
      }
    }
  }
  handleRegister() {
    if (this.state.remember) {
      SecureStore
        .setItemAsync('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password }))
        .catch((error) => console.log('Could not save user info', error));
      this.signup(this.state.username, this.state.password, this.state.email, this.state.firstname, this.state.lastname, this.state.imageUrl);
    }
    else{
      SecureStore
        .deleteItemAsync('userinfo')
        .catch((error) => alert('Could not delete user info', error));
      this.signup(this.state.username, this.state.password, this.state.email, this.state.firstname, this.state.lastname, this.state.imageUrl);
    }
  }

  signup(name, password, email, firstname, lastname, image) {
    this.props.signup(name, password, email, firstname, lastname, image);
  }
}
export default connect(null, mapDispatchToProps)(Register);