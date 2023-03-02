import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { logout, selectUser } from "../features/userSlice";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";

function Header() {
  const dispatch = useDispatch();
  const logoutOfApp = () => {
    dispatch(logout());
    signOut(auth);
  };

  return (
    <div className="header">
      <div className="header-left">
        <img
          src={"https://cdn-icons-png.flaticon.com/512/174/174857.png"}
          alt="logo"
        />

        <div className="header-search">
          <SearchIcon />
          <input placeholder="Search" type="text"></input>
        </div>
      </div>

      <div className="header-right">
        <HeaderOption title="Home" Icon={HomeIcon} />
        <HeaderOption title="My network" Icon={SupervisorAccountIcon} />
        <HeaderOption title="Jobs" Icon={BusinessCenterIcon} />
        <HeaderOption title="Messaging" Icon={ChatIcon} />
        <HeaderOption title="Notifications" Icon={NotificationsIcon} />

        <HeaderOption avatar={true} title="me" onClick={logoutOfApp} />
      </div>
    </div>
  );
}

export default Header;
