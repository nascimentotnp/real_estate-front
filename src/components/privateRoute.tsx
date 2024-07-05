import React, { ComponentType } from "react";
import { Route, Navigate} from "react-router-dom";
import AuthService from "../services/auth.service";

interface PrivateRouteProps {
  component: ComponentType<any>;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    element={
      AuthService.getCurrentUser() ? (
        <Component />
      ) : (
        <Navigate to="/login" />
      )
    }
  />
);

export default PrivateRoute;
