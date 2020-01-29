import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import {
  Avatar
} from 'antd';
// import moment from 'moment';
import './index.scss';

class Home extends Component {
  componentDidMount() {
    this.getBabyInfo();
  }

  // componentWillUnmount() {
  //   this.props.firestore.unsetListener(this.state.oldQuery);
  // }

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
    console.log(dob);
    return (
      <div className="container Home">
        <Avatar src={avatar} />
        <h1>{fname} {lname}</h1>
      </div>
    );
  }
}

Home.propTypes = {
  firestore: PropTypes.object
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
)(Home);
