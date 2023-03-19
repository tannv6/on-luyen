import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import io from "socket.io-client";
import { apiGetListMessage, apiSaveMessage } from "../../redux/services";
import { TMainStore } from "../../utils/types";
const socket = io("http://192.168.0.102:3001");

function Chat() {
  const dispatch = useDispatch();
  const user = useRef(null);
  const bottomList = useRef<any>(null);
  const [mes, setMes] = useState("");
  const { data: messages } = useSelector(
    (state: TMainStore) => state.main.messages
  );
  const isOpenChat = useSelector((state: TMainStore) => state.main.isOpenChat);
  const userInfo = useSelector((state: any) => state.auth?.userInfo);

  useEffect(() => {
    apiGetListMessage().then((res) => {
      if (res.data) {
        dispatch({
          type: "SET_LIST_CHAT",
          response: res.data,
        });
      }
    });
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("sended", (e) => {
      dispatch({
        type: "NEW_CHAT",
        response: {
          content: e.content,
          user: e.user,
        },
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const sendMessage = async () => {
    await apiSaveMessage({
      user: userInfo?.user_name || "",
      content: mes,
    });
    socket.emit("send", { content: mes, user: userInfo?.user_name || "" });
    setMes("");
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setMes(value);
  };

  useEffect(() => {
    const lastMes = messages[messages.length - 1];
    if (lastMes?.user !== userInfo?.user_name) {
      bottomList.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages?.length]);

  return (
    <>
      <div
        className={`chat-popup ${isOpenChat ? "" : "chat-popup-hidden"}`}
        id="chat-popup"
        onClick={(e: any) => {
          if (e.target.id === "chat-popup") {
            dispatch({
              type: "SET_OPEN_CHAT",
              response: false,
            });
          }
        }}
      >
        <div className="chat-box">
          <div className="chat-header">
            <h3>Chat</h3>
            <span
              onClick={() =>
                dispatch({
                  type: "SET_OPEN_CHAT",
                  response: false,
                })
              }
              className="icon-close"
            >
              &times;
            </span>
          </div>
          <div className="chat-list">
            {messages.map((e, i) => {
              return (
                <div
                  key={i}
                  className={`chat-item  ${
                    e.user === userInfo?.user_name
                      ? "chat-item-right"
                      : "chat-item-left"
                  }`}
                >
                  <div className={`item-message`}>
                    <span className="message-user">{e.user}</span>
                    <div className="message-content">{e.content}</div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomList} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={mes}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="open-chat">
        <button
          onClick={() =>
            dispatch({
              type: "SET_OPEN_CHAT",
              response: true,
            })
          }
        >
          Chat
        </button>
      </div>
    </>
  );
}

export default Chat;
