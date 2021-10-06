import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AllDevicesGeolocation from './all-device-geolocation';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={match.url} component={AllDevicesGeolocation} />
    </Switch>
  </>
);

export default Routes;
