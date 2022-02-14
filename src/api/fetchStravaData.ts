import axios from 'axios';

import { IFetchStravaData, IRouteResponseData } from '../types';

const fetchStravaData: IFetchStravaData = async (
  clientID,
  clientSecret,
  refreshToken,
  authLink,
  activitiesLink,
) => {
  const stravaAuthResponse = await axios.post(
    `${authLink}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`,
  );

  const stravaActivityResponse = await axios.get(
    `${activitiesLink}?access_token=${stravaAuthResponse.data.access_token}`,
  );

  const formatedResponse: IRouteResponseData[] = stravaActivityResponse.data.map(
    ({
      name,
      distance,
      average_speed,
      max_speed,
      moving_time,
      map,
    }: IRouteResponseData) => ({
      name,
      distance,
      average_speed,
      max_speed,
      moving_time,
      map,
    }),
  );

  return formatedResponse;
};

export default fetchStravaData;
