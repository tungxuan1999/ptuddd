// redux
import { connect } from 'react-redux';
import { deleteFavorite, deleteFavoriteAll } from '../redux/ActionCreators';
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    products: state.products,
    favorites: state.favorites
  }
};
const mapDispatchToProps = dispatch => ({
  deleteFavorite: (newFavorite) => dispatch(deleteFavorite(newFavorite)),
  deleteFavoriteAll: () => dispatch(deleteFavoriteAll())
});

import React, { Component } from 'react';
import { FlatList, Text, Alert, View, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Button } from 'react-native';

class Favorites extends Component {
  render() {
    if (this.props.dishes.isLoading || this.props.products.isLoading) {
      return (<Loading />);
    } else if (this.props.dishes.errMess || this.props.products.errMess) {
      return (<View>
        <Text>{this.props.dishes.errMess}</Text>
        <Text>{this.props.products.errMess}</Text>
      </View>);
    } else {
      return (
        <ScrollView>
          <Text>Cún cưng</Text>
          <FlatList data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el.dishId === dish.id && el.type === 0))}
            renderItem={({ item, index }) => this.renderMenuItem(item, index, 0)}
            keyExtractor={item => item.id.toString()} />
          <Text>Sản phẩm cho cún cưng</Text>
          <FlatList data={this.props.products.products.filter(dish => this.props.favorites.some(el => el.dishId === dish.id && el.type === 1))}
            renderItem={({ item, index }) => this.renderMenuItem(item, index, 1)}
            keyExtractor={item => item.id.toString()} />
          <Button title='Xóa tất cả' color='#7cc' onPress={() => this.props.deleteFavoriteAll()} />
        </ScrollView>
      );
    }
  }

  renderMenuItem(item, index, typeaaa) {
    const rightButton = [
      {
        text: 'Delete', type: 'delete',
        onPress: () => {
          Alert.alert(
            'Delete Favorite?',
            'Are you sure you wish to delete the favorite dish ' + item.name + '?',
            [
              { text: 'Cancel', onPress: () => { /* nothing */ } },
              { text: 'OK', onPress: () => this.props.deleteFavorite({ dishId: item.id, type: typeaaa }) }
            ],
            { cancelable: false }
          );
        }
      }
    ];
    const { navigate } = this.props.navigation;
    return (
      <Swipeout right={rightButton} autoClose={true}>
        <Animatable.View animation="fadeInRightBig" duration={2000} style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
        }}>
          <ListItem key={index} onPress={() => navigate('Dishdetail', typeaaa === 0 ? { dishId: item.id, type: typeaaa } : { productsId: item.id, type: typeaaa })}>
            <Avatar source={{ uri: baseUrl + item.image }} />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Animatable.View>
      </Swipeout>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);