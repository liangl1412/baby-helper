import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import {
  Table as AntTable, Tooltip, Icon, Spin, Button, Modal
} from 'antd';
import { generateCols } from '../../utils';
import './index.scss';


class Table extends Component {
  // loadMore = () => {
  //   // Get Redux-Firestore Object from Store
  //   const { firestore } = this.store;

  //   // Get current State from Store
  //   const { firestore: { ordered: { 'cars.1': items } } } = this.store.getState();

  //   // Get Snapshot of the last queried document
  //   var snapshot = await firestore.collection( 'cars' ).doc( items[ items.length - 1 ].id ).get();

  //   // Do the firestore query with startFrom = snapshot to get the next page of results
  //   firestore.get( {
  //       collection: 'cars',
  //       limit: 10,
  //       startAfter: snapshot
  //   } );
  // }
  state = {
    visible: false,
    modalText: ''
  };

  showModal = (modalText) => {
    this.setState({
      visible: true,
      modalText
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  watchBtn = (record) => {
    const { uid } = this.props.firebaseProps.auth;
    const { watched = false, id } = record;
    const iconTheme = watched ? 'filled' : '';
    const classes = watched ? 'table-icon active' : 'table-icon';
    return (
      <span
        className={classes}
        onClick={() => {
          if (watched) {
            this.props.firestore.update({ collection: 'leads', doc: id }, { watched: !watched, watcher: null });
          } else {
            this.props.firestore.update({ collection: 'leads', doc: id }, { watched: !watched, watcher: uid });
          }
        }}
      >
        <Tooltip placement="top" title="Watchlist"><Icon type="star" theme={iconTheme} /></Tooltip>
      </span>
    );
  }

  deleteBtn = (record) => {
    const { id } = record;
    return (
      <span
        className="table-icon"
        onClick={() => {
          this.props.firestore.delete({ collection: 'leads', doc: id });
        }}
      >
        <Tooltip placement="top" title="Remove User"><Icon type="delete" /></Tooltip>
      </span>
    );
  }

  commentBtn = (record) => {
    const { comment_link = false, user_comment_link = false, tweet_link = false } = record;
    const commentLink = comment_link || user_comment_link || tweet_link || '';
    const tootTip = tweet_link ? 'Go To Tweet' : 'Go To Comment';
    return (
      <a
        className="table-icon"
        href={commentLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Tooltip placement="top" title={tootTip}><Icon type="profile" /></Tooltip>
      </a>
    );
  }

  profileBtn = (record) => {
    const { user_link } = record;
    return (
      <a
        className="table-icon"
        href={user_link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Tooltip placement="top" title="Go To User"><Icon type="user" /></Tooltip>
      </a>
    );
  }

  moreBtn = (record) => {
    return (
      <span className="table-icon" onClick={() => this.showModal(record)}>
        <Tooltip placement="top" title="More Details">
          <Icon type="contacts" />
        </Tooltip>
      </span>
    );
  }

  contactBtn = (record) => {
    const { uid } = this.props.firebaseProps.auth;
    const { contacted = false, id } = record;
    const type = contacted ? 'primary' : '';
    const icon = contacted ? 'check' : '';
    return (
      <Button
        type={type}
        icon={icon}
        shape="circle"
        onClick={() => {
          if (contacted) {
            this.props.firestore.update({ collection: 'leads', doc: id }, { contacted: !contacted, contacter: null });
          } else {
            this.props.firestore.update({ collection: 'leads', doc: id }, { contacted: !contacted, contacter: uid });
          }
        }}
      />
    );
  }


  render() {
    const { social, data, loading } = this.props;
    const columns = generateCols(social, this.watchBtn, this.deleteBtn, this.commentBtn, this.profileBtn, this.moreBtn, this.contactBtn);
    if (loading) return <Spin className="table-loading-icon full-center" tip="Loading..." />;
    return (
      <>
        <AntTable
          rowKey="id"
          columns={columns}
          expandIconColumnIndex={2}
          expandIconAsCell={false}
          // expandedRowRender={record => <p style={{ margin: 0 }}>{record.user_comment || record.comment_text || record.tweet_text}</p>}
          dataSource={data}
          rowClassName={(record, index) => (index % 2 === 0 ? 'odd' : 'even')}
        />
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <pre>{JSON.stringify(this.state.modalText, undefined, 2)}</pre>
        </Modal>
      </>
    );
  }
}

Table.propTypes = {
  firebaseProps: PropTypes.object,
  firestore: PropTypes.object,
  loading: PropTypes.bool,
  social: PropTypes.string,
  data: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    firebaseProps: state.firebase,
    loading: state.loadingStatus.showLoading
  };
};


export default compose(
  withFirestore,
  connect(mapStateToProps, null),
)(Table);
