// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useEffect, useState } from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const Pool_Data = {
  UserPoolId: "us-east-1_ofuZJuHOM",
  ClientId: "rul1c7o9482719v4n8c3vno0r"
};

export default function useHandler() {
  const [state, setstate] = useState(undefined);
  const userPool = new CognitoUserPool(Pool_Data);

  const getAuthenticatedUser = useCallback(() => {
    return userPool.getCurrentUser();
  }, []);

  useEffect(() => {
    getAuthenticatedUser();

    setstate(getAuthenticatedUser());
  }, [getAuthenticatedUser]);

  const signOut = () => {
    return userPool.getCurrentUser()?.signOut();
  };

  return {
    userPool,
    getAuthenticatedUser,
    signOut,
    state
  };
}
