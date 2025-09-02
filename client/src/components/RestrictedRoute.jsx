import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/selectors";

function RestrictedRoute({ Component, redirectPaph = "/" }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectPaph} replace /> : Component;
}

export default RestrictedRoute;
