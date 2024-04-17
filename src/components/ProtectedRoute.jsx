import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} component={Component} />;
};

export default PrivateRoute;