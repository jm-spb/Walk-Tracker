import getRandomColor from './getRandomColor';
import { GetRoutesColorsType } from '../types';

const getRoutesColors: GetRoutesColorsType = ({ routesCount, brightness }) =>
  new Array(routesCount).fill(null).map((_) => getRandomColor(brightness));

export default getRoutesColors;
