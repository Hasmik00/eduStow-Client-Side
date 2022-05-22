import React, { useContext } from "react";
import { Input } from "antd";
import { CurrentUserContext } from "../context/context";
import { Button } from "antd";
import logo from "../logo.png";
import "./components.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const { Search } = Input;

const AppHeader = () => {
  const [isAuthenticated, dispatch] = useContext(CurrentUserContext);
  const navigation = useNavigate();
  const onSearch = (value) => navigation(`search/${value}`);

  return (
    <div className="header">
      <div className="logo" onClick={() => navigation("/")}>
        <img src={logo} alt="logo" />
      </div>
      <div>
        <Search
          placeholder="Search for a course"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <div className="login_buttons">
        <Button
          type="primary"
          onClick={() => {
            if (isAuthenticated.isLoggedIn) {
              dispatch({ type: "SET_UNAUTHORIZED", payload: null });
              localStorage.removeItem("token");
            }
            navigation("login");
          }}
        >
          {isAuthenticated.isLoggedIn ? "LOG OUT" : "LOG IN"}
        </Button>
        {!isAuthenticated.isLoggedIn && (
          <Button onClick={() => navigation("signin")}>SIGN IN</Button>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
