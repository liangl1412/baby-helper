import React from 'react';
// import moment from 'moment';
import Feeding from '../../component/ActivityCard/Feeding';
import './index.scss';

const Activity = () => {
  return (
    <div className="container activity">
      <Feeding />
      <div className="activity-card diaper">
        <div className="activity-label">1h ago(Poop)</div>
      </div>
      <div className="activity-card sleep">
        <div className="activity-label">Last: 3h 20min</div>
      </div>
      <div className="activity-card">
        <div className="activity-label">2h ago(L)</div>
      </div>
    </div>
  );
};

export default Activity;
