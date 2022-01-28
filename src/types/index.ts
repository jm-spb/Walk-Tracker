interface IRouteDataWithoutCoords {
  name: string;
  distance: number;
  average_speed: number;
  max_speed: number;
  moving_time: number;
}

export interface IRouteRenderData extends IRouteDataWithoutCoords {
  coords: [number, number][];
}

interface IMapPolyline {
  id: string;
  summary_polyline: string;
  resource_state: number;
}

export interface IRouteResponseData extends IRouteDataWithoutCoords {
  map: IMapPolyline;
}

export interface IFetchStravaData {
  (
    clientID: string,
    clientSecret: string,
    refreshToken: string,
    authLink: string,
    activitiesLink: string,
  ): Promise<IRouteResponseData[]>;
}

export interface ITrackerState {
  routes: IRouteRenderData[];
  status: string;
  error: string;
}

export interface ICreateMarker extends IRouteDataWithoutCoords {
  renderMap: mapboxgl.Map;
  markerColor: string;
  markerType: string;
  coords: [number, number];
}

export interface IRenderMarkers {
  routes: IRouteRenderData[];
  renderMap: mapboxgl.Map;
  routesColors: Array<string>;
}

export type GetRoutesColorsType = (obj: {
  routesCount: number;
  brightness: number;
}) => Array<string>;

export interface IOnMapThemeChange {
  onMapThemeChange: (arg: string) => void;
}
