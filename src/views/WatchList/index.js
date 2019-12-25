import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import Table from '../../component/Table';

const WatchList = (props) => {
  return (

    <div className="container dashboard">
      <h1 className="title">Watch List</h1>
      <Table data={props.watchList} />
    </div>
  );
};

WatchList.propTypes = {
  watchList: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    firebaseProps: state.firebase,
    watchList: state.firestore.ordered.watchList
  };
};


export default compose(
  withFirestore,
  withFirebase,
  connect(mapStateToProps, null)
)(WatchList);
