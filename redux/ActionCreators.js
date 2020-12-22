import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { accountUrl } from '../shared/accountUrl';
import { Alert } from 'react-native';

// leaders
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());
  return fetch(baseUrl + 'leaders')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};
export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});
export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});
export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

// dishes
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());
  return fetch(baseUrl + 'dishes')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};
export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});
export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});
export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

// comments
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};
export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});
export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});
export const postComment = (dishId, rating, author, comment, type) => (dispatch) => {
  setTimeout(() => {
    var newcmt = { dishId: dishId, rating: rating, author: author, comment: comment, date: new Date().toISOString(), type: type };
    dispatch(addComment(newcmt));
  }, 2000);
};
export const addComment = (newcmt) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: newcmt
});

// promotions
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());
  return fetch(baseUrl + 'promotions')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};
export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});
export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});
export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

// favorites
export const postFavorite = (dishId, type) => (dispatch) => {
  setTimeout(() => {
    var newFavorite = { dishId: dishId, type: type };
    dispatch(addFavorite(newFavorite));
  }, 2000);
};
export const addFavorite = (newFavorite) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: newFavorite
});
export const deleteFavorite = (newFavorite) => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: newFavorite
});

export const deleteFavoriteAll = () => ({
  type: ActionTypes.DELETE_FAVORITEALL,
  payload: null
});


//// products
export const fetchProducts = () => (dispatch) => {
  dispatch(productsLoading());
  return fetch(baseUrl + 'products')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(products => dispatch(addProducts(products)))
    .catch(error => dispatch(productsFailed(error.message)));
};
export const productsLoading = () => ({
  type: ActionTypes.PRODUCTS_LOADING
});
export const productsFailed = (errmess) => ({
  type: ActionTypes.PRODUCTS_FAILED,
  payload: errmess
});
export const addProducts = (products) => ({
  type: ActionTypes.ADD_PRODUCTS,
  payload: products
});

//login
export const login = (username, password) => {
  // const { username, password } = loginInput;
  return (dispatch) => { // don't forget to use dispatch here!
    return fetch(accountUrl + 'api/login', {
      method: 'POST',
      headers: {  // these could be different for your API call
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "USERNAME": username, "PASSWORD": password }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) { // response success checking logic could differ
          dispatch(setLoginState({ ...json })); // our action is called here
          Alert.alert("Thông báo", json.notication);
        } else {
          Alert.alert("Thông báo", json.notication);
        }
      })
      .catch((err) => {
        Alert.alert("Thông báo", 'Some error occured, please retry');
        console.log(err);
      });
  };
};

export const setLoginState = (loginData) => {
  return {
    type: ActionTypes.LOGIN_STATE,
    payload: loginData,
  };
};

export const setLogoutState = () => {
  return {
    type: ActionTypes.LOGOUT_STATE,
    payload: {
      isLoggedIn: false,
      data: {
        USERNAME: '',
        EMAIL: '',
        IMAGE: '',
        FIRSTNAME: '',
        LASTNAME: '',
      }
    },
  };
};

//register
export const register = (name, password, email, firstname, lastname, image) => {
  // const { username, password } = loginInput;
  return (dispatch) => { // don't forget to use dispatch here!
    return fetch(accountUrl + 'api/register', {
      method: 'POST',
      headers: {  // these could be different for your API call
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "USERNAME": name, "PASSWORD": password, "EMAIL": email, "IMAGE": image, "FIRSTNAME": firstname, "LASTNAME": lastname }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) { // response success checking logic could differ
          // dispatch(setLoginState({ ...json, userId: name })); // our action is called here
          dispatch(setLoginState({ ...json }));
          Alert.alert("Thông báo", json.notication)
        } else {
          Alert.alert("Thông báo", json.notication);
        }
      })

  };
};

//cart
// favorites
export const postCart = (dishId, type, count) => (dispatch) => {
  setTimeout(() => {
    var newCart = { dishId: dishId, type: type, count: count };
    dispatch(addCart(newCart));
  }, 2000);
};
export const addCart = (newCart) => ({
  type: ActionTypes.ADD_CART,
  payload: newCart
});
export const deleteCart = (newCart) => ({
  type: ActionTypes.DELETE_CART,
  payload: newCart
});
export const deleteCartAll = () => ({
  type: ActionTypes.DELETE_CARTALL,
  payload: null
});