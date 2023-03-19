import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Api } from "../../../../config/apisConfig";
import { TMainStore } from "../../utils/types";
import "./nav.scss";
function Nav() {
  const dispatch = useDispatch();

  const [showPopup, setShowPoup] = useState(false);

  const data = useSelector((state: TMainStore) => state.main.knowledges.data);

  const isOpennav = useSelector((state: TMainStore) => state.main.isOpenNav);

  const [knowledge, setKnowledge] = useState({
    knowledge_name: "",
    answer: "",
  });

  const handleCreateKnowledge = (e: any) => {
    e.preventDefault();
    if (!knowledge.knowledge_name || !knowledge.answer) {
      alert("Vui lòng kiểm tra lại thông tin");
      return;
    }
    dispatch({
      type: "CREATE_KNOWLEDGE",
      params: {
        knowledge_name: knowledge.knowledge_name,
        answer: knowledge.answer,
      },
      setKnowledge,
    });
  };

  const handleDeleteKnowledge = (id: string) => () => {
    dispatch({
      type: "DELETE_KNOWLEDGE",
      params: id,
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setKnowledge({
      ...knowledge,
      [name]: value,
    });
  };

  return (
    <div className={`main-menu ${isOpennav ? "" : "main-menu-hidden"}`}>
      <div
        className={`popup-create ${showPopup ? "" : "popup-create-hidden"}`}
        id="popup-create"
        onClick={(e: any) => {
          if (e.target.id === "popup-create") {
            setShowPoup(false);
          }
        }}
      >
        <div className="popup-wrapper">
          <form>
            <div className="form-group">
              <label>Nhập tên kiến thức</label>
              <input
                type="text"
                value={knowledge.knowledge_name}
                name="knowledge_name"
                id="knowledge_name"
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateKnowledge(e);
                  }
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Nhập mô tả</label>
              <textarea
                name="answer"
                id="answer"
                cols={30}
                rows={10}
                value={knowledge.answer}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateKnowledge(e);
                  }
                }}
              ></textarea>
            </div>
            <button onClick={handleCreateKnowledge}>Submit</button>
          </form>
        </div>
      </div>
      <div className="button-add-knowlege">
        <button onClick={() => setShowPoup(true)}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New knowlege
        </button>
      </div>
      <div className="list-knowlege">
        {data.map((e) => (
          <div key={e._id} className="knowlege-element">
            <strong className="knowledge-name">{e.knowledge_name}</strong>
            <button onClick={handleDeleteKnowledge(e._id)}>
              <img
                src="http://192.168.0.102:5173/delete-button-svgrepo-com.svg"
                alt=""
              />
            </button>
          </div>
        ))}
      </div>
      <div className="tools">
        <div className="tool">
          <button>Upgrade to Plus</button>
        </div>
        <div className="tool">
          <button>Dark mode</button>
        </div>
        <div className="tool">
          <button>Update & FAQ</button>
        </div>
        <div className="tool">
          <button
            onClick={() =>
              dispatch({
                type: "LOGOUT",
              })
            }
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
