import React from 'react';

import './App.scss';

import RoutesMap from './components/RoutesMap';
import Spinner from './components/Spinner';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchRoutes } from './store/trackerSlice';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  const { status } = useAppSelector((state) => state);
  console.log(status);

  return (
    <div className="walk-tracker">
      {status === 'fulfilled' ? <RoutesMap /> : <Spinner />}
    </div>
  );
};

export default App;
