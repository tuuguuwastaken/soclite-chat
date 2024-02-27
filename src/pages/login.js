import React, { useState } from "react";
import { Input, Card, Button } from "antd";
import UserService from "../services/main/user.service";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const clear = () => {
    setPassword("");
    setUsername("");
  };

  const register = () =>{
    navigate('/register')
  }

  const login = async () => {
    console.log(password, username);
    try {
      const r = await UserService.loginUser({
        username: username,
        password: password,
      });
      if (r.data.code !== 1) {
        alert(r.data.message);
        return 0;
      }
      localStorage.setItem("user", username);
      clear();
    } catch (e) {
      alert("something went wrong please try again later and contact tuugii");
    }
  };
  return (
    <div className="login-main">
      <div className="login-container">
        <Card title="Login">
          <p>username</p>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="username"
          ></Input>
          <p>password</p>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <p>
            wanna register? <a onClick={register}>click here</a>
          </p>
          <Button onClick={login}> continue</Button>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
