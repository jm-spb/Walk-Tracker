import React from 'react';

import no_internet from '../../assets/no_internet.webp';

const OfflineMsg = () => (
  <div className="walk-tracker">
    <div className="walk-tracker__offline">
      <img src={no_internet} alt="no internet connection" />
    </div>
  </div>
);

export default OfflineMsg;
