import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import './App.scss';

import RoutesMap from './components';
import { fetchRoutes } from './store/trackerSlice';

// import { IRouteRenderData, IRouteResponseData } from './types';
// import {
//   clientID,
//   clientSecret,
//   refreshToken,
//   authLink,
//   activitiesLink,
// } from './mapConfig';

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  const { status } = useSelector((state: RootStateOrAny) => state);
  console.log(status);

  return (
    <div className="App">
      {status === 'fulfilled' ? (
        <RoutesMap />
      ) : (
        <div>
          <h1>FETCHING DATA</h1>
        </div>
      )}
    </div>
  );
};

export default App;
