// redux
import { connect } from 'react-redux';
import { fetchLeaders, fetchDishes, fetchComments, fetchPromos, fetchProducts, setLogoutState } from '../redux/ActionCreators';
const mapDispatchToProps = dispatch => ({
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchProducts: () => dispatch(fetchProducts()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  logout: () => dispatch(setLogoutState()),
});

const mapStateToProps = (state) => ({
  login: state.login,
});

import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { Icon, Image } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Carts from './CartComponent';
import Product from './ProductComponent';
import Information from './Information';
import { baseUrl } from '../shared/baseUrl';

import Login from './LoginComponent';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './RegisterComponent';
import { Button } from 'react-native';

const TabNavigator = createBottomTabNavigator();
function TabNavigatorScreen() {
  return (
    <TabNavigator.Navigator initialRouteName='Login'
      tabBarOptions={{
        activeBackgroundColor: '#7cc',
        inactiveBackgroundColor: '#fff',
        activeTintColor: '#fff',
        inactiveTintColor: 'gray'
      }}>
      <TabNavigator.Screen name='Login' component={Login}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (<Icon name='sign-in' type='font-awesome' size={size} color={color} />)
        }} />
      <TabNavigator.Screen name='Register' component={Register}
        options={{
          tabBarLabel: 'Register',
          tabBarIcon: ({ color, size }) => (<Icon name='user-plus' type='font-awesome' size={size} color={color} />)
        }} />
    </TabNavigator.Navigator>
  );
}

const LoginNavigator = createStackNavigator();
function LoginNavigatorScreen() {
  return (
    <LoginNavigator.Navigator initialRouteName='LoginRegister'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <LoginNavigator.Screen name='LoginRegister' component={TabNavigatorScreen}
        options={({ navigation }) => ({
          headerTitle: 'Đăng nhập | Đăng ký',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </LoginNavigator.Navigator>
  );
}

const HomeNavigator = createStackNavigator();
function HomeNavigatorScreen() {
  return (
    <HomeNavigator.Navigator initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <HomeNavigator.Screen name='Home' component={Home}
        options={({ navigation }) => ({
          headerTitle: 'Trang chủ',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </HomeNavigator.Navigator>
  );
}

const AboutNavigator = createStackNavigator();
function AboutNavigatorScreen() {
  return (
    <AboutNavigator.Navigator initialRouteName='About'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <AboutNavigator.Screen name='About' component={About}
        options={({ navigation }) => ({
          headerTitle: 'Thông tin về chúng tôi',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </AboutNavigator.Navigator>
  );
}

const MenuNavigator = createStackNavigator();
function MenuNavigatorScreen() {
  return (
    <MenuNavigator.Navigator initialRouteName='Menu'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <MenuNavigator.Screen name='Menu' component={Menu}
        options={({ navigation }) => ({
          headerTitle: 'Menu cún',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <MenuNavigator.Screen name='Dishdetail' component={Dishdetail}
        options={{
          headerTitle: 'Thông tin cún'
        }} />
    </MenuNavigator.Navigator >
  );
}

const ProductsNavigator = createStackNavigator();
function ProductsNavigatorScreen() {
  return (
    <ProductsNavigator.Navigator initialRouteName='Product'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <ProductsNavigator.Screen name='Product' component={Product}
        options={({ navigation }) => ({
          headerTitle: 'Sản phẩm cho cún',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <ProductsNavigator.Screen name='Dishdetail' component={Dishdetail}
        options={{
          headerTitle: 'Thông tin sản phẩm'
        }} />
    </ProductsNavigator.Navigator >
  );
}

const ContactNavigator = createStackNavigator();
function ContactNavigatorScreen() {
  return (
    <ContactNavigator.Navigator initialRouteName='Contact'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <ContactNavigator.Screen name='Contact' component={Contact}
        options={({ navigation }) => ({
          headerTitle: 'Liên hệ',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </ContactNavigator.Navigator>
  );
}

const InformationNavigator = createStackNavigator();
function InformationNavigatorScreen() {
  return (
    <InformationNavigator.Navigator initialRouteName='Information'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <InformationNavigator.Screen name='Information' component={Information}
        options={({ navigation }) => ({
          headerTitle: 'Thông tin tài khoản',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </InformationNavigator.Navigator>
  );
}

const ReservationNavigator = createStackNavigator();
function ReservationNavigatorScreen() {
  return (
    <ReservationNavigator.Navigator initialRouteName='Reservation'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <ReservationNavigator.Screen name='Reservation' component={Reservation}
        options={({ navigation }) => ({
          headerTitle: 'Đặt bàn gặp',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </ReservationNavigator.Navigator>
  );
}

const FavoritesNavigator = createStackNavigator();
function FavoritesNavigatorScreen() {
  return (
    <FavoritesNavigator.Navigator initialRouteName='Favorites'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <FavoritesNavigator.Screen name='Favorites' component={Favorites}
        options={({ navigation }) => ({
          headerTitle: 'Yêu thích',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <MenuNavigator.Screen name='Dishdetail' component={Dishdetail}
        options={{
          headerTitle: 'Thông tin'
        }} />
    </FavoritesNavigator.Navigator>
  );
}

const CartsNavigator = createStackNavigator();
function CartsNavigatorScreen() {
  return (
    <CartsNavigator.Navigator initialRouteName='Carts'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <CartsNavigator.Screen name='Carts' component={Carts}
        options={({ navigation }) => ({
          headerTitle: 'Giỏ hàng',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <MenuNavigator.Screen name='Dishdetail' component={Dishdetail}
        options={{
          headerTitle: 'Thông tin'
        }} />
    </CartsNavigator.Navigator>
  );
}

const MainNavigator = createDrawerNavigator();
class CustomDrawerContent extends Component {
  render() {
    var props = this.props;
    return (
      <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: '#7cc', height: 80, alignItems: 'center', flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Image source={{ uri: baseUrl + 'images/logo.jpg' }} style={{ margin: 10, width: 60, height: 60 }} />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>Shop Dogs</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem label='Trợ giúp'
          icon={({ focused, color, size }) => <Icon name='help' size={size} color={focused ? '#7cc' : '#ccc'} />}
          onPress={() => Linking.openURL('fb://facewebmodal/f?href=https://www.facebook.com/Linning154')} />
        {this.props.login.isLoggedIn === true ? (
          <>
            <DrawerItem label='Đăng xuất'
              icon={({ focused, color, size }) => <Icon name='sign-out' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />}
              onPress={() => this.props.logout()} />
          </>) : (<></>)}
      </DrawerContentScrollView>
    );
  }
}

class MainNavigatorScreen extends Component {
  render() {
    return (
      <MainNavigator.Navigator initialRouteName='Home' drawerContent={props => <CustomDrawerContent {...props} logout={this.props.logout} login={this.props.login} />}>
        <MainNavigator.Screen name='Home' component={HomeNavigatorScreen}
          options={{
            headerShown: false,
            title: 'Trang chủ',
            drawerIcon: ({ focused, size }) => (<Icon name='home' size={size} color={focused ? '#7cc' : '#ccc'} />)
          }} />
        {this.props.login.isLoggedIn === true ? (
          <>
            <MainNavigator.Screen name='Information' component={InformationNavigatorScreen}
              options={{
                headerShown: false,
                title: 'Thông tin tài khoản',
                drawerIcon: ({ focused, size }) => (<Icon name='info' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
              }} />
            <MainNavigator.Screen name='Menu' component={MenuNavigatorScreen}
              options={{
                headerShown: false,
                title: 'Menu cún',
                drawerIcon: ({ focused, size }) => (<Icon name='menu' size={size} color={focused ? '#7cc' : '#ccc'} />)
              }} />
            <MainNavigator.Screen name='Product' component={ProductsNavigatorScreen}
              options={{
                headerShown: false,
                title: 'Menu sản phẩm',
                drawerIcon: ({ focused, size }) => (<Icon name='menu' size={size} color={focused ? '#7cc' : '#ccc'} />)
              }} />
            <MainNavigator.Screen name='Reservation' component={ReservationNavigatorScreen}
              options={{
                headerShown: false,
                title: 'Đặt lịch gặp',
                drawerIcon: ({ focused, size }) => (<Icon name='cutlery' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
              }} />
            <MainNavigator.Screen name='Favorites' component={FavoritesNavigatorScreen}
              options={{
                headerShown: false,
                title: 'Yêu thích',
                drawerIcon: ({ focused, size }) => (<Icon name='heart' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
              }} />
            <MainNavigator.Screen name='Cart' component={CartsNavigatorScreen}
              options={{
                headerShown: false,
                title: 'Giỏ hàng',
                drawerIcon: ({ focused, size }) => (<Icon name='cart-plus' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
              }} />
          </>) : (<>
            <MainNavigator.Screen name='Login | Register' component={LoginNavigatorScreen}
              options={{
                headerShown: false,
                title: 'Đăng nhập | Đăng kí',
                drawerIcon: ({ focused, size }) => (<Icon name='sign-in' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
              }} />
          </>)}

        <MainNavigator.Screen name='About' component={AboutNavigatorScreen}
          options={{
            headerShown: false,
            title: 'Thông tin về chúng tôi',
            drawerIcon: ({ focused, size }) => (<Icon name='info' size={size} color={focused ? '#7cc' : '#ccc'} />)
          }} />

        <MainNavigator.Screen name='Contact' component={ContactNavigatorScreen}
          options={{
            headerShown: false,
            title: 'Liên hệ',
            drawerIcon: ({ focused, size }) => (<Icon name='address-card' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
          }} />
      </MainNavigator.Navigator>
    );
  }
}

class Main extends Component {
  componentDidMount() {
    // redux
    this.props.fetchLeaders();
    this.props.fetchDishes();
    this.props.fetchProducts();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen login={this.props.login} logout={this.props.logout} />
      </NavigationContainer>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);