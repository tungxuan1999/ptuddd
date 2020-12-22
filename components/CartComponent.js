// redux
import { connect } from 'react-redux';
import { deleteCart, deleteCartAll, postCart } from '../redux/ActionCreators';
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    products: state.products,
    carts: state.carts,
  }
};
const mapDispatchToProps = dispatch => ({
  postCart: (dishId, type, count) => dispatch(postCart(dishId, type, count)),
  deleteCart: (newFavorite) => dispatch(deleteCart(newFavorite)),
  deleteCartAll: () => dispatch(deleteCartAll())
});

import React, { Component } from 'react';
import { FlatList, Text, Alert, View, ScrollView } from 'react-native';
import { ListItem, Avatar, Input } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Button } from 'react-native';
import NumericInput from 'react-native-numeric-input'

class Carts extends Component {

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
              { text: 'OK', onPress: () => this.props.deleteCart({ dishId: item.id, type: typeaaa }) }
            ],
            { cancelable: false }
          );
        }
      }
    ];
    const { navigate } = this.props.navigation;
    
    var counts = this.props.carts.find(ct => ct.dishId === item.id && ct.type === typeaaa).count;
    var sumprice = counts * item.price;
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
            <ListItem.Content>
              <ListItem.Title>Số lượng</ListItem.Title>
              <ListItem.Subtitle>
                <NumericInput type='up-down' onChange={value => this.props.postCart(item.id, typeaaa, value)} minValue={1} value={counts} />
                <Text>Giá: {sumprice}tr VNĐ</Text>
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Animatable.View>
      </Swipeout>
    );
  }

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
          <Text style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}>Cún cưng</Text>
          <FlatList data={this.props.dishes.dishes.filter(dish => this.props.carts.some(el => el.dishId === dish.id && el.type === 0))}
            renderItem={({ item, index }) => this.renderMenuItem(item, index, 0)}
            keyExtractor={item => item.id.toString()} />
          <Text style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}>Sản phẩm cho cún cưng</Text>
          <FlatList data={this.props.products.products.filter(dish => this.props.carts.some(el => el.dishId === dish.id && el.type === 1))}
            renderItem={({ item, index }) => this.renderMenuItem(item, index, 1)}
            keyExtractor={item => item.id.toString()} />
            {/* <Text style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}>Tổng tiền: {this.sumprices()}tr VNĐ</Text> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' }}>
            <Button title='Xóa tất cả' color='#7cc' style={{ margin: 20 }} onPress={() => this.props.deleteCartAll()} />
            <Button title='Thanh toán' color='#7cc' style={{ margin: 20 }} onPress={() => this.paycart()} />
          </View>

        </ScrollView>
      );
    }
  }

  paycart()
  {
    Alert.alert("Thanh toán thành công");
    this.props.deleteCartAll();
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(Carts);