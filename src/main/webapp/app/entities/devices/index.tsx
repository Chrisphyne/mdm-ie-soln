import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Device from './device'
import DeviceDetail from './device-details';
import DeviceGeolocation from './device-geolocation/device-geolocation';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={Device} />
      <ErrorBoundaryRoute exact path={`${match.url}/:name/edit`} component={Device} />
      <ErrorBoundaryRoute exact path={`${match.url}/:name`} component={DeviceDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/:name/device-geolocation`} component={DeviceGeolocation} />
      <ErrorBoundaryRoute path={match.url} component={Device} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={Device} />
  </>
);

export default Routes;
