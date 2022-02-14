import React from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import DropdownComponent from '../Dropdown';
import getRoutesColors from '../../utils/getRoutesColors';
import renderMarkers from '../../utils/renderMarkers';

import { mapboxToken } from '../../mapConfig';
import { useAppSelector } from '../../hooks/redux';

mapboxgl.accessToken = mapboxToken;

// in order to render mapbox when deploy on the web
(mapboxgl as any).workerClass =
  require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const RoutesMap = (): JSX.Element => {
  const [theme, setTheme] = React.useState('mapbox://styles/mapbox/light-v10');
  const mapContainerRef = React.useRef(null);
  const { routes } = useAppSelector((state) => state);
  const routesColors = getRoutesColors({ routesCount: routes.length, brightness: 5 });

  React.useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current as unknown as HTMLElement,
      style: theme,
      center: [30.3086, 59.9375],
      zoom: 12,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // unable to resolve type issues with features array
    const mapFeatures: any = routes.map((route, idx) => ({
      type: 'Feature',
      properties: {
        color: routesColors[idx],
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

    renderMarkers({ routes, renderMap: map, routesColors });
  }, [theme]);

  return (
    <div className="walk-tracker__map" ref={mapContainerRef}>
      <DropdownComponent onMapThemeChange={setTheme} />
    </div>
  );
};

export default RoutesMap;
