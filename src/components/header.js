import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderMain = () => {
  const [status, setStatus] = useState(false);
  const user = localStorage.getItem("user") || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user !== null) {
      setStatus(true);
    }
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem("user");
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="header-main">
      <div className="buttons">
        {status && (
          <div onClick={logout} className="button">
            <h4>logout</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderMain;
