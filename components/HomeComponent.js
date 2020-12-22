// redux
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders
  }
};

import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Card, Image } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

class RenderItem extends Component {
  render() {
    if (this.props.isLoading) {
      return (<Loading />);
    } else if (this.props.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {
      const item = this.props.item;
      if (item != null) {
        return (
          <Card>
            <Image source={{ uri: baseUrl + item.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Card.FeaturedTitle>{item.name}</Card.FeaturedTitle>
              <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
            </Image>
            <Text style={{ margin: 10 }}>{item.description}</Text>
          </Card>
        );
      }
      return (<View />);
    }
  }
}

class Home extends Component {
  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Image
            source={{ uri: baseUrl + 'images/main1.jpg' }}
            style={{
              width: "100%",
              height: 700,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Animatable.View>
        {/* <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderItem
            item={this.props.dishes.dishes.filter((dish) => dish.featured === true)[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess} />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" duration={2000} delay={1000}>
          <RenderItem
            item={this.props.promotions.promotions.filter((promo) => promo.featured === true)[0]}
            isLoading={this.props.promotions.isLoading}
            errMess={this.props.promotions.errMess} />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderItem
            item={this.props.leaders.leaders.filter((leader) => leader.featured === true)[0]}
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess} />
        </Animatable.View> */}
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Home);