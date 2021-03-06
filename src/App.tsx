import React from 'react';

import './App.scss';

import RoutesMap from './components/RoutesMap';
import Spinner from './components/Spinner';
import OfflineMsg from './components/OfflineMsg';
import ErrorMsg from './components/ErrorMsg';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchRoutes } from './store/trackerSlice';

const App = (): JSX.Element => {
  // Check internet connection
  if (!window.navigator.onLine) return <OfflineMsg />;

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  const { status, error } = useAppSelector((state) => state);

  if (error) return <ErrorMsg />;

  return (
    <div className="walk-tracker">
      {status === 'fulfilled' ? <RoutesMap /> : <Spinner />}
    </div>
  );
};

export default App;
