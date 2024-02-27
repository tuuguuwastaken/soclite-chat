import React, { useState } from "react";
import { Input, Card, Button } from "antd";
import UserService from "../services/main/user.service";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Vpassword, setVPassword] = useState("");
  const navigate = useNavigate();

  const clear = () => {
    setPassword("");
    setUsername("");
    setVPassword("");
  };

  const login = () =>{
    navigate('/login')
  }

  const register = async () => {
    console.log(password, username);
    if (password !== Vpassword) {
      alert("Passwords do not match");
      setPassword("");
      setVPassword("");
      return 0;
    }
    try {
      const r = await UserService.createUser({
        username: username,
        password: password,
      });
      if (r.data.code !== 1) {
        alert(r.data.message);
        return 0;
      }
      alert(r.data.message);
      clear();
      navigate("/login");
    } catch (e) {
      alert("something went wrong try again later and contact tuugii");
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
          <p>Verify password</p>
          <Input
            type="password"
            value={Vpassword}
            onChange={(e) => setVPassword(e.target.value)}
          ></Input>
          <p>
            Already have an account? <a onClick={login}>click here</a>
          </p>
          <Button onClick={register}> continue</Button>
        </Card>
      </div>
    </div>
  );
};

export default Register;
