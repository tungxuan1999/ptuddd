import * as ActionTypes from './ActionTypes';

export const carts = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_CART:
      {
        state = state.filter((favorite) => favorite.type !== action.payload.type || favorite.dishId !== action.payload.dishId);
        return state.concat(action.payload);
      }
    case ActionTypes.DELETE_CART:
      return state.filter((favorite) => favorite.type !== action.payload.type || favorite.dishId !== action.payload.dishId);
    case ActionTypes.DELETE_CARTALL:
      return [];
    default:
      return state;
  }
};