import React from 'react';

import './App.scss';

import RoutesMap from './components/RoutesMap';
import Spinner from './components/Spinner';
import OfflineMsg from './components/OfflineMsg';

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
  console.log(`status: ${status}`);
  console.log(`error: ${error}`);

  // if (error) return

  return (
    <div className="walk-tracker">
      {status === 'fulfilled' ? <RoutesMap /> : <Spinner />}
    </div>
  );
};

export default App;
