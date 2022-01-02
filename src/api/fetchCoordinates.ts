import axios from 'axios';
import polyline from '@mapbox/polyline';

type IFetch = (
  clientID: string,
  clientSecret: string,
  refreshToken: string,
  authLink: string,
  activitiesLink: string,
) => Promise<number[][]>;

const fetchCoordinates: IFetch = async (
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

  console.log(stravaActivityResponse);

  const decodedCoords = polyline.decode(
    stravaActivityResponse.data[0].map.summary_polyline,
  );

  const formatedCoords = decodedCoords.map((coord) => coord.reverse());

  return formatedCoords;
};

export default fetchCoordinates;
