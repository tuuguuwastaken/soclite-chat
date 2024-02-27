import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderMain = () => {
  const navigate = useNavigate(); 
  
  const logout = () =>{
    try{
      localStorage.setItem('user',null)
      this.$nextTick(function () {
      navigate("/")
      });
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="header-main">
      <div className="buttons">
        <div onClick={logout} className="button">
          <h4>logout</h4>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
