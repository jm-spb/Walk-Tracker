import React from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import { IRoutesProps } from '../types';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;

const RoutesMap = ({ data }: IRoutesProps): JSX.Element => {
  const mapContainerRef = React.useRef(null);

  // React.useEffect(() => {
  // if (mapContainerRef.current) return;
  console.log('render');
  console.log(data[0].distance);

  if (data[0].distance) {
    console.log(data[0].distance);
    const map = new mapboxgl.Map({
      container: mapContainerRef.current || 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [30.308611, 59.9375],
      zoom: 12.5,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    const mapFeatures: any = data.map((route) => ({
      type: 'Feature',
      properties: {
        color: '#F7455D', // red
      },
      geometry: {
        type: 'LineString',
        // coordinates: activityCoordinates,
        coordinates: route.coords,
      },
    }));

    console.log(mapFeatures);

    map.on('load', () => {
      map.addSource('lines', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: mapFeatures,
          // features: [
          //   {
          //     type: 'Feature',
          //     properties: {
          //       color: '#F7455D', // red
          //     },
          //     geometry: {
          //       type: 'LineString',
          //       coordinates: [[30.308611, 59.9375]],
          //     },
          //   },
          // ],
        },
      });

      map.addLayer({
        id: 'lines',
        type: 'line',
        source: 'lines',
        paint: {
          'line-width': 3,
          'line-color': ['get', 'color'],
        },
      });
    });

    // clean up on unmount
    // return () => map.remove();
  }
  // }, [loaded]);

  return <div className="map" ref={mapContainerRef} />;
};

export default RoutesMap;
