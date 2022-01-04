export interface IFetchStravaData {
  (
    clientID: string,
    clientSecret: string,
    refreshToken: string,
    authLink: string,
    activitiesLink: string,
  ): any;
}

export interface IRouteRenderData {
  name: string;
  distance: number;
  average_speed: number;
  max_speed: number;
  moving_time: number;
  coords: number[][];
}

interface IMapPolyline {
  id: string;
  summary_polyline: string;
  resource_state: number;
}

export interface IRouteResponseData {
  name: string;
  distance: number;
  average_speed: number;
  max_speed: number;
  moving_time: number;
  map: IMapPolyline;
}

export interface IRoutesProps {
  data: IRouteRenderData[];
}
