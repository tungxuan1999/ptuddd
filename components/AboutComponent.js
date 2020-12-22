// redux
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
    leaders: state.leaders
  }
};

import React, { Component } from 'react';
import { ScrollView, Text, FlatList, YellowBox } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

class RenderHistory extends Component {
  render() {
    return (
      <Card>
        <Card.Title>Lịch sử thành lập</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 10 }}>Shop Dogs được thành lập năm 22/12/2020 ở Việt Nam.</Text>
        <Text style={{ margin: 10 }}>Rất mong các bạn ủng hộ...</Text>
        <Text style={{ margin: 10 }}>Tuyển gấp nhân viênnnnn!!!</Text>
      </Card>
    );
  }
}

class RenderLeadership extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Loading />
        </Card>
      );
    } else if (this.props.errMess) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Text>{this.props.errMess}</Text>
        </Card>
      );
    } else {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <FlatList data={this.props.items}
            renderItem={({ item, index }) => this.renderLeaderItem(item, index)}
            keyExtractor={item => item.id.toString()} />
        </Card>
      );
    }
  }

  renderLeaderItem(item, index) {
    return (
      <ListItem key={index}>
        <Avatar rounded source={{ uri: baseUrl + item.image }} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: 'bold' }}>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }
}

class About extends Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']); // ref: https://forums.expo.io/t/warning-virtualizedlists-should-never-be-nested-inside-plain-scrollviews-with-the-same-orientation-use-another-virtualizedlist-backed-container-instead/31361/6
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderHistory />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderLeadership
            items={this.props.leaders.leaders}
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess} />
        </Animatable.View>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(About);