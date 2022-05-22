import React, { useContext } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { CurrentUserContext } from "../context/context";
import CoursePage from "../pages/CoursePage";
import Home from "../pages/Home";
import Login from "../pages/LogIn";
import SearchList from "../pages/SearchList";
import Subcategories from "../pages/Subcategories";
import Subcategory from "../pages/SubCategory";

const AppRoutes = () => {
  const [, dispatch] = useContext(CurrentUserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch({
        type: "SET_AUTHORIZED",
        payload: localStorage.getItem("token"),
      });
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/category/:id" element={<Subcategory />} />
      <Route path="/category/:id/subCategory/:id" element={<Subcategories />} />
      <Route
        path="/category/:id/subCategory/:id/courses/:id"
        element={<CoursePage />}
      />
      <Route
        path="/category/:id/subCategory/:id/courses/:id/:id"
        element={<CoursePage />}
      />
      <Route path="search/:value/course/:id" element={<CoursePage />} />
      <Route path="/search/:value" element={<SearchList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
