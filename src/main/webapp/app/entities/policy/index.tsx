import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Policy from './policy'
import PolicyDetail from 'app/entities/policy/policy-detail';
import PolicyUpdate from 'app/entities/policy/policy-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PolicyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:name/edit`} component={PolicyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:name`} component={PolicyDetail} />
      <ErrorBoundaryRoute path={match.url} component={Policy} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={Policy} />
  </>
);

export default Routes;
