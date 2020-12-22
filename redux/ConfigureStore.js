// redux
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// redux-persist
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
const config = { key: 'root', storage: AsyncStorage, debug: true };

import { leaders } from './leaders';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { favorites } from './favorites';
import { products } from './products';
import { login } from './login';
import { carts } from './carts';

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, { leaders, dishes, comments, promotions, favorites, products, login, carts }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return { persistor, store };
};