import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import io from "socket.io-client";
import { TMainStore } from "../../utils/types";
const socket = io("https://on-luyen-api.onrender.com");

function Chat() {
  const dispatch = useDispatch();
  const user = useRef(null);
  const bottomList = useRef<any>(null);
  const [openChat, setOpenChat] = useState(false);
  const [mes, setMes] = useState("");
  const { data: messages } = useSelector(
    (state: TMainStore) => state.main.messages
  );
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("connected", (e) => {
      if (!user.current) {
        console.log("kkkk");
        user.current = e;
      }
    });

    socket.on("sended", (e) => {
      dispatch({
        type: "NEW_CHAT",
        response: {
          mes: e.mes,
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

  const sendMessage = () => {
    socket.emit("send", { mes, user: user.current });
    setMes("");
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setMes(value);
  };

  useEffect(() => {
    const lastMes = messages[messages.length - 1];
    if (lastMes?.user !== user.current) {
      bottomList.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages?.length]);

  return (
    <>
      <div
        className={`chat-popup ${openChat ? "" : "chat-popup-hidden"}`}
        id="chat-popup"
        onClick={(e: any) => {
          if (e.target.id === "chat-popup") {
            setOpenChat(false);
          }
        }}
      >
        <div className="chat-box">
          <h3>Chat</h3>
          <div className="chat-list">
            {messages.map((e, i) => {
              return (
                <div
                  key={i}
                  className={`chat-item  ${
                    e.user === user.current
                      ? "chat-item-right"
                      : "chat-item-left"
                  }`}
                >
                  <div className={`item-message`}>{e.mes}</div>
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
        <button onClick={() => setOpenChat(true)}>Chat</button>
      </div>
    </>
  );
}

export default Chat;
