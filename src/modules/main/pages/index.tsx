import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Contents from "../components/Contents";
import Nav from "../components/Nav";
import { useNavigate } from "react-router";

function MainPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.auth?.userInfo);

  const [initMove, setInitMove] = useState<number | null>(null);
  const [moved, setMoved] = useState<number | null>(null);

  useEffect(() => {
    dispatch({
      type: "GET_KNOWLEDGE",
    });
  }, []);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { replace: true });
    }
  }, [userInfo]);

  return (
    <div
      className="main-pages"
      onTouchStart={(e) => {
        const touch = e.touches[0];
        setInitMove(touch.clientX);
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        setMoved(touch.clientX);
      }}
      onTouchEnd={() => {
        if (moved !== null && initMove !== null && moved - initMove > 100) {
          dispatch({
            type: "SET_OPEN_NAV",
            response: true,
          });
        } else if (
          moved !== null &&
          initMove !== null &&
          moved - initMove < -100
        ) {
          dispatch({
            type: "SET_OPEN_NAV",
            response: false,
          });
        }
        setInitMove(null);
        setMoved(null);
      }}
    >
      <Nav />
      <Contents />
    </div>
  );
}

export default MainPage;
