import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  toggleShowLoading: ['showLoading'] // actionType should be one of 'sendLink' and 'signIn'
});

export const LoadingTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  showLoading: false
});

/* ------------- Reducers ------------- */

// update show loading state
export const updateShowLoadingState = (state, { showLoading }) => {
  return state.merge({ showLoading });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_SHOW_LOADING]: updateShowLoadingState,
});
