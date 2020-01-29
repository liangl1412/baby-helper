import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { Avatar } from 'antd';
import { formatDob } from '../utils';
import './Header.scss';

class Header extends Component {
  logout = () => {
    this.props.firebase.logout();
  };

  componentDidMount() {
    this.getBabyInfo();
  }

  getBabyInfo = () => {
    const { firestore } = this.props;
    firestore.get({
      collection: 'baby',
      doc: 'GIBbjlkrHixZXYlWKioH',
      storeAs: 'babyInfo'
    });
  }

  render() {
    const { babyInfo = {} } = this.props;
    const { avatar, dob, fname, lname } = babyInfo;
    const dobString = dob ? formatDob(dob.seconds) : false;
    return (
      <div className="header">
        <div className="header-title-section">
          <h1>{fname} {lname}</h1>
          {dobString && <p className="age">{dobString}</p>}
        </div>
        <Avatar src={avatar} />
      </div>
    );
  }
}
Header.propTypes = {
  firestore: PropTypes.object,
  firebase: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    firebaseProps: state.firebase,
    babyInfo: state.firestore.data.babyInfo
  };
};

export default compose(
  withFirestore,
  withFirebase,
  connect(mapStateToProps, null)
)(Header);
