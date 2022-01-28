import React from 'react';
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';

import { IOnMapThemeChange } from '../../types';

const mapThemes = [
  'Streets theme',
  'Outdoors theme',
  'Light theme',
  'Dark theme',
  'Satellite',
  'Satellite Streets',
  'Navigation Day',
  'Navigation Night',
];

const mapConfig = [
  'mapbox://styles/mapbox/streets-v11',
  'mapbox://styles/mapbox/outdoors-v11',
  'mapbox://styles/mapbox/light-v10',
  'mapbox://styles/mapbox/dark-v10',
  'mapbox://styles/mapbox/satellite-v9',
  'mapbox://styles/mapbox/satellite-streets-v11',
  'mapbox://styles/mapbox/navigation-day-v1',
  'mapbox://styles/mapbox/navigation-night-v1',
];

const DropdownComponent = ({ onMapThemeChange }: IOnMapThemeChange) => (
  <Dropdown
    className="walk-tracker__dropdown"
    onChange={(e) => onMapThemeChange(mapConfig[mapThemes.indexOf(e.value)])}
    options={mapThemes}
    placeholder="Select map theme"
  />
);

export default DropdownComponent;
