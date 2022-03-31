import React, { useEffect, useContext } from "react";
import { UserContext } from "../App";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Logout = () => {
  // eslint-disable-next-line
  const state = useSelector(state => state.cardItems)
  const dispatch = useDispatch()
  const History = useNavigate();
  const logoutPage = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res) {
        dispatch({ type: "USER", payload: false });
        History("/signin");
        swal("Logout Successfully");
      }
    } catch (error) {
      swal("Something went wrong");
    }
  };

  useEffect(() => {
    logoutPage();

  }, []);

  return <>logout</>;
};

export default Logout;
