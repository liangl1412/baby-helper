/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './Nav.scss';

class Nav extends Component {
  render() {
    const { location } = this.props;
    const currentItem = location.pathname ? location.pathname.replace('/', '') : 'home';
    return (
      <div className="nav">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[currentItem]}
          style={{ lineHeight: '64px' }}
          >
          <Menu.Item className="nav-item" key="home">
            <Link to="/"><Icon type="home" theme="outlined" /><span>Home</span></Link>
          </Menu.Item>
          <Menu.Item className="nav-item" key="activity">
            <Link to="/activity"><Icon type="profile" theme="outlined" /><span>Activity</span></Link>
          </Menu.Item>
          <Menu.Item className="nav-item" key="record">
            <Link to="/record"><Icon type="calendar" theme="outlined" /><span>Record</span></Link>
          </Menu.Item>
          <Menu.Item className="nav-item" key="photo">
            <Link to="/photo"><Icon type="picture" theme="outlined" /><span>Photo</span></Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
Nav.propTypes = {
  location: PropTypes.object,
};


export default Nav;
