import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import {
  Avatar
} from 'antd';
import moment from 'moment';
import './Feeding.scss';

class Activity extends Component {
  componentDidMount() {
    this.lastFeeding();
  }

  lastFeeding = () => {
    const { firestore } = this.props;
    const lastMonth = moment().subtract(30, 'days').toDate();
    console.log(lastMonth);
    firestore.get({
      collection: 'babyRecord',
      doc: 'GIBbjlkrHixZXYlWKioH',
      subcollections: [{ collection: 'records' }],
      orderBy: ['ts', 'desc'],
      where: [
        ['type', '==', 'feed'],
        ['ts', '>', lastMonth]
      ],
      storeAs: 'lastFeeding'
    }).then(doc => {
      console.log(doc);
    });
  }

  render() {
    return (
      <div className="activity-card feed">
        <div className="activity-label">2h ago(80ml)</div>
      </div>
    );
  }
}

Activity.propTypes = {
  firestore: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    firebaseProps: state.firebase,
    lastFeeding: state.firestore.data.lastFeeding
  };
};

export default compose(
  withFirestore,
  withFirebase,
  connect(mapStateToProps, null)
)(Activity);
