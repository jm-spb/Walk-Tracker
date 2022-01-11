import React from 'react';
import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Spinner = (): JSX.Element => (
  <div className="walk-tracker__spinner">
    <Loader type="Circles" color="#00BFFF" height={80} width={80} />
    <h2>Strava Data is loading. Please wait...</h2>
  </div>
);

export default Spinner;
