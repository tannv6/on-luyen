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
    <div className="main-pages">
      <Nav />
      <Contents />
    </div>
  );
}

export default MainPage;
