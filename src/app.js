import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import {
  Redirect, BrowserRouter, Switch, Route
} from 'react-router-dom';
import './app.scss';
import LoadingBar from './component/LoadingBar';
import Nav from './component/Nav';
import Dashboard from './views/Dashboard';
import SignIn from './views/Auth';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (authed ?
        <>
          <Nav {...props} />
          <Component {...props} />
        </> :
        <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />)}
        />
  );
};

PrivateRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func,
  authed: PropTypes.string
};

const App = (props) => {
  const { auth } = props.firebaseProps;
  if (!auth.isLoaded) {
    return <LoadingBar />;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <PrivateRoute authed={auth.uid} path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  firebaseProps: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    firebaseProps: state.firebase
  };
};


export default compose(
  withFirebase,
  connect(mapStateToProps, null)
)(App);
