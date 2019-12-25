import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

// import { reducer as form } from 'redux-form'
// import { reducer as notifications } from 'modules/notification'

export function makeRootReducer(asyncReducers) {
  return combineReducers({
    // Add sync reducers here
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    loadingStatus: require('./loadingReducer').reducer,
    // form,
    // notifications,
    ...asyncReducers
  })
}


export default makeRootReducer;
