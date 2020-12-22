import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE:
      if (state.some(el => el.dishId === action.payload.dishId && el.type === action.payload.type))
        return state;
      else
        return state.concat(action.payload);
    case ActionTypes.DELETE_FAVORITE:
      return state.filter((favorite) => favorite.type !== action.payload.type || favorite.dishId !== action.payload.dishId);
    case ActionTypes.DELETE_FAVORITEALL:
      return [];
    default:
      return state;
  }
};