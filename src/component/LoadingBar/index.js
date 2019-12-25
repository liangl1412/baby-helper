import React from 'react';
import { Spin } from 'antd';


const LoadingBar = () => {
  return (
    <div className="full-wrap full-center">
      <Spin className="center" tip="Loading..." />
    </div>
  );
};

export default LoadingBar;
