import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers/rootReducer';

export default function configureAppStore(preloadedState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
