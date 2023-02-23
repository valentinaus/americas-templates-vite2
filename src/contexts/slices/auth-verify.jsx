import React, { useEffect } from "react";
import { withRouter } from "../../utils/with-router";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  let location = props.router.location;

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parseUser = user && JSON.parse(user);

    if (user) {
      const decodedJwt = parseJwt(user.token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location]);

  return <></>;
};
export default withRouter(AuthVerify);
