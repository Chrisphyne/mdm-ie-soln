import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ManagedPlayStore from './managed_play_store'

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={match.url} component={ManagedPlayStore} />
    </Switch>
    {/* <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ManagedPlayStore} /> */}
  </>
);

export default Routes;
