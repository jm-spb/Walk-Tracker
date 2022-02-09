import React from 'react';

import error_img from '../../assets/error_img.webp';

const ErrorMsg = () => (
  <div className="walk-tracker">
    <div className="walk-tracker__error">
      <img src={error_img} alt="fail to fetch data" />
      <p>Ooops! Unable to fetch Walk Tracker Data.</p>
      <p>Please try again later!</p>
    </div>
  </div>
);

export default ErrorMsg;
