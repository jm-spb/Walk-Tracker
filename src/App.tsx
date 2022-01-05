import React from 'react';
import polyline from '@mapbox/polyline';

import './App.scss';

import fetchStravaData from './api/fetchStravaData';
import RoutesMap from './components';

import { IRouteRenderData, IRouteResponseData } from './types';
import {
  clientID,
  clientSecret,
  refreshToken,
  authLink,
  activitiesLink,
} from './mapConfig';

const App = (): JSX.Element => {
  const [routeData, setRouteData] = React.useState<IRouteRenderData[]>([
    {
      name: '',
      distance: 0,
      average_speed: 0,
      max_speed: 0,
      moving_time: 0,
      coords: [[0, 0]],
    },
  ]);

  React.useEffect(() => {
    async function fetchAndSetRouteData() {
      const responseData = await fetchStravaData(
        clientID,
        clientSecret,
        refreshToken,
        authLink,
        activitiesLink,
      );

      const formatedData = responseData.data?.map(
        ({
          name,
          distance,
          average_speed,
          max_speed,
          moving_time,
          map: { summary_polyline },
        }: IRouteResponseData) => ({
          name,
          distance,
          average_speed,
          max_speed,
          moving_time,
          coords: polyline.decode(summary_polyline).map((coord) => coord.reverse()),
        }),
      );

      setRouteData(formatedData);
    }

    fetchAndSetRouteData();
  }, []);

  console.log(routeData);

  return (
    <div className="App">
      {routeData[0].distance ? (
        <RoutesMap data={routeData} />
      ) : (
        <div>
          <h1>FETCHING DATA</h1>
        </div>
      )}
    </div>
  );
};

export default App;
