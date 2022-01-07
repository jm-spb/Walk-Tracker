/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import mapboxgl from 'mapbox-gl';
import { RootStateOrAny, useSelector } from 'react-redux';

import 'mapbox-gl/dist/mapbox-gl.css';

// import { IRoutesProps } from '../types';
import getRandomColor from '../scripts/randomColor';
import { mapboxToken } from '../mapConfig';

mapboxgl.accessToken = mapboxToken;

(mapboxgl as any).workerClass =
  require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const RoutesMap = (): JSX.Element => {
  const mapContainerRef = React.useRef(null);
  const { routes } = useSelector((state: RootStateOrAny) => state);

  React.useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current as unknown as HTMLElement,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [30.3086, 59.9375],
      zoom: 12.5,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    const mapFeatures: any = routes.map((route: any) => ({
      type: 'Feature',
      properties: {
        color: getRandomColor(5),
      },
      geometry: {
        type: 'LineString',
        coordinates: route.coords,
      },
    }));

    map.on('load', () => {
      map.addSource('lines', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: mapFeatures,
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
  }, []);

  return <div className="map" ref={mapContainerRef} />;
};

export default RoutesMap;
