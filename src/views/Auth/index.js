import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';
import './index.scss';
import logo from '../../images/logo.png';


class SignIn extends Component {
  googleLogin = () => {
    this.props.firebase.login({ provider: 'google', type: 'popup' });
  }

  render() {
    const { auth, profile } = this.props.firebaseProps;

    // sync profile after login
    if (!profile.email && auth.uid) {
      this.props.firebase.updateProfile({
        uid: auth.uid,
        email: auth.email,
        created: auth.createdAt
      });
    }
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="login-container">
        <img className="logo" src={logo} alt="logo" />
        <Button type="primary" icon="google" size={20} onClick={this.googleLogin}>
          Login With Google
        </Button>
      </div>
    );
  }
}

SignIn.propTypes = {
  firebase: PropTypes.object,
  firebaseProps: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    firebaseProps: state.firebase
  };
};

export default compose(
  withFirebase,
  connect(mapStateToProps, null)
)(SignIn);
