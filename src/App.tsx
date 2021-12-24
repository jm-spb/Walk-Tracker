import React from 'react';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import mapboxgl from 'mapbox-gl';

import './App.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;

// interface IViewport {
//   latitude: number;
//   longitude: number;
//   width: string;
//   height: string;
//   zoom: number;
// }

const clientID = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const refreshToken = process.env.REACT_APP_REFRESH_TOKEN;
const authLink = 'https://www.strava.com/oauth/token';
const activitiesLink = 'https://www.strava.com/api/v3/athlete/activities';

const App = (): JSX.Element => {
  const mapContainerRef = React.useRef(null);
  // const map = React.useRef(null);
  // const mapCurrent = map.current!
  // const [viewport, setViewport] = React.useState<IViewport>({
  //   latitude: 59.9375,
  //   longitude: 30.308611,
  //   width: '100vw',
  //   height: '100vh',
  //   zoom: 10,
  // });

  const [activityCoordinates, setActivityCoordinates] = React.useState<
    [number, number][]
  >([]);
  console.log(activityCoordinates);

  React.useEffect(() => {
    // initialize map only once
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current as unknown as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [30.308611, 59.9375],
      zoom: 12.5,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // clean up on unmount
    // return () => map.remove();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const stravaAuthResponse = await axios.all([
        axios.post(
          `${authLink}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`,
        ),
      ]);

      const stravaActivityResponse = await axios.get(
        `${activitiesLink}?access_token=${stravaAuthResponse[0].data.access_token}`,
      );

      const coords = polyline.decode(stravaActivityResponse.data[0].map.summary_polyline);
      setActivityCoordinates(coords);
    };

    fetchData();
  }, []);

  return <div className="App" ref={mapContainerRef} />;
};

export default App;
