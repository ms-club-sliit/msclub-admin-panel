import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component, ...rest }: any) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
    );

  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
