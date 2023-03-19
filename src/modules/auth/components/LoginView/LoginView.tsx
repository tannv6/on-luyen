import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { apiLogin } from "../../redux/services";
import { useNavigate } from "react-router";
import "./loginView.scss";

function LoginView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    user_name: string;
    pass: string;
  }>({
    user_name: "",
    pass: "",
  });
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleLogin = (e: any) => {
    e.preventDefault();
    apiLogin({
      user_name: user.user_name,
      pass: user.pass,
    })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: "LOGIN_SUCCESS",
            response: res.data,
          });
          navigate("/");
        } else {
          alert("Sai tài khoản hoặc mật khẩu");
        }
      })
      .catch(() => {
        alert("Sai tài khoản hoặc mật khẩu");
      });
  };
  return (
    <div className="login-page">
      <div className="welcome-text">Chào mừng bạn</div>
      <form action="">
        <input
          type="text"
          name="user_name"
          value={user.user_name}
          onChange={handleChange}
          placeholder="Nhập tên đăng nhập"
        />
        <input
          type="text"
          name="pass"
          value={user.pass}
          onChange={handleChange}
          placeholder="Nhập mật khẩu"
        />
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default LoginView;
