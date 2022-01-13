import mapboxgl from 'mapbox-gl';

import { ICreateMarker, IRenderMarkers } from '../types';
import formatElapsedTime from './formatElapsedTime';

const createMarker = ({
  renderMap,
  markerColor,
  markerType,
  coords,
  name,
  distance,
  moving_time,
  average_speed,
  max_speed,
}: ICreateMarker) => {
  new mapboxgl.Marker({ color: markerColor })
    .setLngLat(coords)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h2>${name}</h2>
        <i>${markerType}</i>
      <p><b>Total Distance: </b>${distance} km</p>
      <p><b>Elapsed Time: </b>${formatElapsedTime(moving_time)}</p>
      <p><b>Average Speed: </b>${average_speed} m/s</p>
      <p><b>Max Speed: </b>${max_speed} m/s</p>      
      `,
      ),
    )
    .addTo(renderMap);
};

const renderMarkers = ({ routes, renderMap, routesColors }: IRenderMarkers) => {
  routes.forEach(
    ({ coords, name, distance, moving_time, average_speed, max_speed }, idx) => {
      // Route Start Marker
      createMarker({
        renderMap,
        markerColor: routesColors[idx],
        markerType: 'Route Start Point',
        coords: coords[0],
        name,
        distance,
        moving_time,
        average_speed,
        max_speed,
      });

      // Route End Marker
      createMarker({
        renderMap,
        markerColor: routesColors[idx],
        markerType: 'Route End Point',
        coords: coords[coords.length - 1],
        name,
        distance,
        moving_time,
        average_speed,
        max_speed,
      });
    },
  );
};

export default renderMarkers;
