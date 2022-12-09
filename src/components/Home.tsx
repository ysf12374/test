import React, { useState, useEffect } from "react";
import useHandlder from "./configHandler/useHandler";
import { Redirect } from "react-router-dom";
import { api } from './api';

const Home = () => {
  const [state, setstate] = useState([]);
  const { getAuthenticatedUser } = useHandlder();
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    return () => {
      setIsMounted(false)
    }
  }, [])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(api);
    const data = await response.json();
    if (isMounted) {
      setstate(data?.item);
    }
  };

  return getAuthenticatedUser() === null ? (
    <Redirect to="/signin" />
  ) : (
      <div className="row">
        <h1>There are currently {state.length} people </h1>

        {state?.map((i: string, index: number) => (
          <h1 key={index}>Their age is {i.age}</h1>
        ))}
      </div>
    );
};
export default Home;
