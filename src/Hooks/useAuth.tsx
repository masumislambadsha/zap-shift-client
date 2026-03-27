import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";

const useAuth = () => {
  const authInfo = use(AuthContext);
  if (!authInfo) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authInfo;
};

export default useAuth;
