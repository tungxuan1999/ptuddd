import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {
  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card>
          <Card.Title>Liên hệ</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10 }}>Đại học Hoa Sen</Text>
          <Text style={{ margin: 10 }}>Email:tungxuan154199905@gmail.com</Text>
          <Text style={{ margin: 10 }}>Facebook: www.facebook.com/Linning154</Text>
          <Button title=' Gửi Mail' buttonStyle={{ backgroundColor: '#7cc' }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.sendMail} />
        </Card>
      </Animatable.View>
    );
  }
  sendMail() {
    MailComposer.composeAsync({
      recipients: ['tungxuan154199905@gmail.com'],
      subject: 'From Confusion',
      body: 'Hello my friends ...'
    });
  }
}
export default Contact;