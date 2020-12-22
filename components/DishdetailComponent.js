// redux
import { connect } from 'react-redux';
import { postFavorite, postComment, postCart } from '../redux/ActionCreators';
const mapStateToProps = state => {
  return {
    products: state.products,
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
    carts: state.carts,
  }
};
const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId, type) => dispatch(postFavorite(dishId, type)),
  postComment: (dishId, rating, author, comment, type) => dispatch(postComment(dishId, rating, author, comment, type)),
  postCart: (dishId, type, count) => dispatch(postCart(dishId, type, count)),
});

import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, YellowBox, Modal, Button, PanResponder, Alert } from 'react-native';
import { Card, Image, Icon, Rating, Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseUrl';

class RenderDish extends Component {
  render() {
    // gesture
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
      if (dx < -200) return 1; // right to left
      else if (dx > 200) return 2; // left to right
      return 0;
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => { return true; },
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDrag(gestureState) === 1) {
          Alert.alert(
            'Add Favorite',
            'Are you sure you wish to add ' + dish.name + ' to favorite?',
            [
              { text: 'Cancel', onPress: () => { /* nothing */ } },
              { text: 'OK', onPress: () => { this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite() } },
            ],
            { cancelable: false }
          );
        }
        else if (recognizeDrag(gestureState) === 2) {
          this.props.onPressComment();
        }
        return true;
      }
    });
    // render
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <Card {...panResponder.panHandlers}>
          <Image source={{ uri: baseUrl + dish.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
          </Image>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon raised reverse name={this.props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'
              onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
            <Icon raised reverse name='pencil' type='font-awesome' color='#f50'
              onPress={() => this.props.onPressComment()} />
            <Icon raised reverse name='cart-plus' type='font-awesome' color='#f50'
              onPress={() => this.props.onPressCart()} />
          </View>
        </Card>
      );
    }
    const product = this.props.product;
    if (product != null) {
      return (
        <Card {...panResponder.panHandlers}>
          <Image source={{ uri: baseUrl + product.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle>{product.name}</Card.FeaturedTitle>
          </Image>
          <Text style={{ margin: 10 }}>{product.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon raised reverse name={this.props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'
              onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
            <Icon raised reverse name='pencil' type='font-awesome' color='#f50'
              onPress={() => this.props.onPressComment()} />
            <Icon raised reverse name='cart-plus' type='font-awesome' color='#f50'
              onPress={() => this.props.onPressCart()} />
          </View>
        </Card>
      );
    }
    return (<View />);
  }
}

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    const type = this.props.type;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <FlatList data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={item => item.id.toString()} />
      </Card>
    );
  }

  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating startingValue={item.rating} imageSize={16} readonly style={{ flexDirection: 'row' }} />
        <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
      </View>
    );
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 3,
      author: '',
      comment: ''
    };
    YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']); // ref: https://forums.expo.io/t/warning-virtualizedlists-should-never-be-nested-inside-plain-scrollviews-with-the-same-orientation-use-another-virtualizedlist-backed-container-instead/31361/6
  }

  render() {
    const dishId = parseInt(this.props.route.params.dishId);
    const productsId = parseInt(this.props.route.params.productsId);
    const type = parseInt(this.props.route.params.type);
    return (
      <ScrollView>
        {type === 0 ?
          <>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
              <RenderDish dish={this.props.dishes.dishes[dishId]}
                favorite={this.props.favorites.some(el => el.dishId === dishId && el.type === type)}
                onPressFavorite={() => this.markFavorite(dishId, type)}
                onPressComment={() => this.setState({ showModal: true })}
                onPressCart={() => this.addShopCart(dishId, type, 1)} />
            </Animatable.View>
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
              <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId && comment.type === type)} />
            </Animatable.View>
          </> : <>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
              <RenderDish product={this.props.products.products[productsId]}
                favorite={this.props.favorites.some(el => el.dishId === productsId && el.type === type)}
                onPressFavorite={() => this.markFavorite(productsId, type)}
                onPressComment={() => this.setState({ showModal: true })}
                onPressCart={() => this.addShopCart(dishId, type, 1)}
              />
            </Animatable.View>
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
              <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === productsId && comment.type === type)} />
            </Animatable.View>
          </>
        }

        <Modal visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <View style={{ justifyContent: 'center', margin: 20 }}>
            <Rating startingValue={this.state.rating} showRating={true}
              onFinishRating={(value) => this.setState({ rating: value })} />
            <View style={{ height: 20 }} />
            <Input value={this.state.author} placeholder='Author' leftIcon={{ name: 'user-o', type: 'font-awesome' }}
              onChangeText={(text) => this.setState({ author: text })} />
            <Input value={this.state.comment} placeholder='Comment' leftIcon={{ name: 'comment-o', type: 'font-awesome' }}
              onChangeText={(text) => this.setState({ comment: text })} />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              {type === 0 ?
                <>
                  <Button title='SUBMIT' color='#7cc'
                    onPress={() => { this.submitComment(dishId, type); this.setState({ showModal: false }); }} />
                </> : <>
                  <Button title='SUBMIT' color='#7cc'
                    onPress={() => { this.submitComment(productsId, type); this.setState({ showModal: false }); }} />
                </>
              }
              <View style={{ width: 10 }} />
              <Button title='CANCEL' color='#7cc'
                onPress={() => { this.setState({ showModal: false }); }} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }

  markFavorite(dishId, type) {
    this.props.postFavorite(dishId, type);
  }

  submitComment(dishId, type) {
    //alert(dishId + ':' + this.state.rating + ':' + this.state.author + ':' + this.state.comment);
    this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment, type);
  }

  addShopCart(dishId, type, count) {
    this.props.postCart(dishId, type, count);
    Alert.alert("Thêm thành công, vui lòng qua giỏ hàng để điều chỉnh số lượng");
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);