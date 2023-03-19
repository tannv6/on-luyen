import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STAGE_OF_STORE } from "../../../global/utils/constants";
import { TMainStore } from "../../utils/types";
import Chat from "./Chat";
import "./contents.scss";
function Contents() {
  const dispatch = useDispatch();

  const { data, stage } = useSelector(
    (state: TMainStore) => state.main.knowledges
  );

  const [answers, setAnswers] = useState<any>({});

  useEffect(() => {
    if (stage === STAGE_OF_STORE.SUCCESS) {
      const answers = data?.reduce((acc: any, curr) => {
        acc[curr._id] = curr.answer;
        return acc;
      }, {});
      setAnswers({
        ...answers,
      });
    }
  }, [data, stage]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  const [initMove, setInitMove] = useState<number | null>(null);
  const [moved, setMoved] = useState<number | null>(null);

  return (
    <div
      className="content"
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
      <h2>Tổng hợp kiến thức cần nhớ</h2>
      <div>
        {data.map((item) => (
          <div key={item._id} className={`knowledge-item`}>
            <strong>{item.knowledge_name}</strong>
            <textarea
              name={item._id}
              rows={5}
              value={answers[item._id]}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  dispatch({
                    type: "UPDATE_KNOWLEDGE",
                    params: {
                      id: item._id,
                      knowledge_name: item.knowledge_name,
                      answer: answers[item._id],
                    },
                  });
                }
              }}
            ></textarea>
          </div>
        ))}
      </div>
      <Chat />
    </div>
  );
}

export default Contents;
