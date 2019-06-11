import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, login, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        login === true ? (
          <Component {...props} />
        ) : (
          setTimeout(() => {
            return (
              <Redirect
                to={{ pathname: "/", state: { from: props.location } }}
              />
            );
          }, 100)
        )
      }
    />
  );
};

export default PrivateRoute;
