// redux
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
    dishes: state.dishes
  }
};

import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

class Menu extends Component {
  render() {
    if (this.props.dishes.isLoading) {
      return (<Loading />);
    } else if (this.props.dishes.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {
      return (
        <FlatList data={this.props.dishes.dishes}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={item => item.id.toString()} />
      );
    }
  }

  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000} style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
      }}>
        <ListItem key={index} onPress={() => navigate('Dishdetail', { dishId: item.id, type: 0 })}>
          <Avatar source={{ uri: baseUrl + item.image }} />
          <Text>Giá: {item.price}tr VNĐ</Text>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Animatable.View>
    );
  }
}
export default connect(mapStateToProps)(Menu);