import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, actionTypes } from 'redux-firestore';
import firebase from 'firebase/app'
import LoadingActions from './loadingReducer';
import 'firebase/auth';
import 'firebase/firestore';
import makeRootReducer from './reducers';
import rootSaga from '../sagas';
import {
  firebase as fbConfig,
  env
} from '../config';

export default (initialState = {}) => {
  // ======================================================
  // Firebase Initialization
  // ======================================================
  firebase.initializeApp(fbConfig);

  // ======================================================
  // Redux + Firebase Config (react-redux-firebase & redux-firestore)
  // ======================================================

  const defaultConfig = {
    userProfile: 'users', // root that user profiles are written to
    presence: 'presence', // list currently online users under "presence" path in RTDB
    enableLogging: false, // enable/disable Firebase Database Logging
    useFirestoreForProfile: true, // Save profile to Firestore instead of Real Time Database
    // profileFactory: (userData, profileData) => {
    //   const { user } = userData;
    //   return {
    //     uid: user.uid,
    //     email: user.email,
    //     created: user.createdAt,
    //     role: 'user',
    //     active: true
    //   }
    // }
  };

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  if (env === 'dev') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [];
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  const customMiddleWare = store => next => (action) => {
    if (action.type === actionTypes.LISTENER_RESPONSE) {
      store.dispatch(LoadingActions.toggleShowLoading(false));
    } else if (action.type === actionTypes.SET_LISTENER) {
      store.dispatch(LoadingActions.toggleShowLoading(true));
    }

    next(action);
  };

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      reduxFirestore(firebase),
      reactReduxFirebase(firebase, defaultConfig),
      applyMiddleware(...middleware, customMiddleWare),
      ...enhancers
    )
  );


  store.asyncReducers = {};
  let sagasManager = sagaMiddleware.run(rootSaga, getFirebase);


  if (module.hot) {
    module.hot.accept(() => {
      const reducers = require('./reducers').default; // eslint-disable-line
      store.replaceReducer(reducers(store.asyncReducers));
      const newYieldedSagas = require('../sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};
