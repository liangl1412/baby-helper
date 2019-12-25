import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import {
  Slider, DatePicker, Radio, Row, Col, Select
} from 'antd';
import moment from 'moment';
import {
  YOUTUBE, REDDIT, LINKEDIN, TWITTER, POSITION
} from '../../const';
import Table from '../../component/Table';
import './index.scss';

const { Option } = Select;
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';


class Dashboard extends Component {
  state = {
    ageStart: 11,
    ageEnd: 100,
    dateStart: moment().subtract(7, 'd').format(dateFormat),
    dateEnd: moment().format(dateFormat),
    social: YOUTUBE,
    position: 'Engineering',
    oldQuery: { collection: 'leads' }
  }

  componentDidMount() {
    this.updateLeadData();
  }

  componentWillUnmount() {
    this.props.firestore.unsetListener(this.state.oldQuery);
  }

  onAgeChange = (value) => {
    this.setState({
      ageStart: value[0],
      ageEnd: value[1]
    }, this.updateLeadData);
  }

  onDateChange = (dates, dateStrings) => {
    this.setState({
      dateStart: dateStrings[0],
      dateEnd: dateStrings[1]
    });
  }

  socialChange = (e) => {
    this.setState({
      social: e.target.value
    }, this.updateLeadData);
  }

  onPositionChange = (value) => {
    this.setState({
      position: value
    });
  }

  updateLeadData = () => {
    const { firestore } = this.props;
    const {
      social, ageEnd, ageStart, oldQuery
    } = this.state;
    firestore.unsetListener(oldQuery);
    const query = {
      collection: 'leads',
      where: [
        ['social_media', '==', social],
        ['watched', '==', false]
      ],
      orderBy: 'pred_age',
      startAt: ageStart,
      endAt: ageEnd,
      storeAs: 'leads'
    };
    this.setState({ oldQuery: query });
    this.props.firestore.setListener(query);
  }

  render() {
    return (
      <div className="container dashboard">
        <h1 className="title">Recruiter's Dashboard</h1>
        <Row className="filter-section">
          <Col lg={6} sm={24} className="filter-age">
            <h2>Age Range</h2>
            <Slider
              range
              step={1}
              tooltipVisible
              tooltipPlacement="bottom"
              defaultValue={[this.state.ageStart, this.state.ageEnd]}
              onAfterChange={this.onAgeChange}
            />
          </Col>
          { this.state.social !== LINKEDIN &&
            <Col lg={8} sm={24} className="filter-date">
              <h2>Date Posted</h2>
              <RangePicker
                defaultValue={[moment(this.state.dateStart, dateFormat), moment(this.state.dateEnd, dateFormat)]}
                format={dateFormat}
                onChange={this.onDateChange}
              />
            </Col>
          }

          { this.state.social === LINKEDIN &&
            <Col lg={8} sm={24} className="filter-position">
              <h2>Position</h2>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select position"
                onChange={this.onPositionChange}
                // filterOption={(input, option) =>
                //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
              >
                {
                  POSITION.map((option) => {
                    return <Option key={option.key} value={option.key}>{option.label}</Option>;
                  })
                }
              </Select>
            </Col>
          }

          <Col lg={10} sm={24} className="filter-media">
            <h2>&nbsp;</h2>
            <Radio.Group defaultValue={this.state.social} buttonStyle="solid" onChange={this.socialChange}>
              <Radio.Button value={YOUTUBE}>Youtube</Radio.Button>
              <Radio.Button value={REDDIT}>Reddit</Radio.Button>
              <Radio.Button value={LINKEDIN}>LinkedIn</Radio.Button>
              <Radio.Button value={TWITTER}>Twitter</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Table data={this.props.leads} social={this.state.social} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  firestore: PropTypes.object,
  leads: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    firebaseProps: state.firebase,
    leads: state.firestore.ordered.leads
  };
};

export default compose(
  withFirestore,
  withFirebase,
  connect(mapStateToProps, null)
)(Dashboard);
