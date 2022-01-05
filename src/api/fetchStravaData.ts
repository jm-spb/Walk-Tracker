import axios from 'axios';

import { IFetchStravaData } from '../types';

const fetchStravaData: IFetchStravaData = async (
  clientID,
  clientSecret,
  refreshToken,
  authLink,
  activitiesLink,
) => {
  const stravaAuthResponse = await axios.all([
    axios.post(
      `${authLink}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`,
    ),
  ]);

  const stravaActivityResponse = await axios.get(
    `${activitiesLink}?access_token=${stravaAuthResponse[0].data.access_token}`,
  );

  return stravaActivityResponse;
};

export default fetchStravaData;
