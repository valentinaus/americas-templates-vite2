import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import jwt_decode from "jwt-decode";

const AuthVerify = (props) => {
  let location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parseUser = user && JSON.parse(user);

    if (user) {
      const decodedToken: any = jwt_decode(parseUser.token);

      if (decodedToken.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location, props]);

  return;
};

export default AuthVerify;
