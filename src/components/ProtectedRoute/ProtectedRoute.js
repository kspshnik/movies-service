import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  path: pathto,
  isLoggedIn,
  ...props
}) => (
  <Route exact path={pathto}>
    {
        // eslint-disable-next-line react/jsx-props-no-spreading
        isLoggedIn ? <Component {...props} /> : <Redirect to='./signin' />
      }
  </Route>
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
