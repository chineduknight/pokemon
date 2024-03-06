import { Navigate } from "react-router-dom";
import WithSuspense from "components/HOC/WithSuspense";
import { PUBLIC_PATHS, PROTECTED_PATHS } from "./pagePath";
import { lazy } from "react";

const Home = WithSuspense(
  lazy(() => import("pages/Home")),
  true,
);

const { HOME } = PUBLIC_PATHS;

const PUBLIC_ROUTES = [
  { path: HOME, element: <Home /> },
  { path: "/", element: <Home /> },
  // this enables you not to access the public routes when logged in
  ...Object.values(PROTECTED_PATHS).map((route) => {
    return {
      path: route,
      element: <Navigate to="/" />,
    };
  }),
  { path: "*", element: <div>Page not found</div> },
];

export default PUBLIC_ROUTES;
