import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Contents from "../components/Contents";
import Nav from "../components/Nav";

function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_KNOWLEDGE",
    });
  }, []);
  return (
    <>
      <Nav />
      <Contents />
    </>
  );
}

export default MainPage;
