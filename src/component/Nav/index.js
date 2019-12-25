import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFirebase, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import './index.scss';

class Nav extends Component {
  logout = () => {
    this.props.firebase.logout();
  };

  render() {
    const { location } = this.props;
    let currentItem = 'dashboard';
    if (location.pathname === '/watchlist') {
      currentItem = 'watchlist';
    }

    return (
      <div className="nav">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[currentItem]}
          style={{ lineHeight: '64px' }}
          >
          <Menu.Item className="nav-item" key="dashboard"><Link to="/">Find Recruits</Link></Menu.Item>
          <Menu.Item className="nav-item" key="watchlist"><Link to="/watchlist">Watch List</Link></Menu.Item>
          <Menu.Item className="nav-item" key="logout" onClick={this.logout}>Logout</Menu.Item>
        </Menu>
      </div>
    );
  }
}
Nav.propTypes = {
  firebase: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    watchList: state.firestore.ordered.watchList,
    firebaseProps: state.firebase,
  };
};


export default compose(
  connect(mapStateToProps, null),
  firestoreConnect((props) => {
    return [
      {
        collection: 'leads',
        where: [
          ['watched', '==', true],
          ['watcher', '==', props.firebaseProps.auth.uid]
        ],
        storeAs: 'watchList'
      }
    ];
  }),
  withFirebase
)(Nav);
