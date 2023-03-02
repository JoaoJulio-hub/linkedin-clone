import React from "react";
import "./SideBar.css";
import { Avatar } from "@mui/material";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

function SideBar({ avatar }) {
  const recentItem = (topic) => {
    return (
      <div className="sidebar-recent-item">
        <span className="sidebar-hash">#</span>
        <p>{topic}</p>
      </div>
    );
  };

  const user = useSelector(selectUser);

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img
          src="https://media.istockphoto.com/id/1178390169/photo/modern-abstract-background.jpg?b=1&s=170667a&w=0&k=20&c=srHPrqG6Lsg942CS73ZVnINaFzc9D2iP-KbDxPl07v8="
          alt="background"
        />
        {user?.displayName && (
          <Avatar className="sidebar-avatar" src={user.photoUrl}>
            {user.displayName[0]}
          </Avatar>
        )}
        <h2 className="sidebar-name">{user.displayName}</h2>
        <h4 className="sidebar-description">{user.email}</h4>
      </div>

      <div className="sidebar-stats">
        <div className="sidebar-stat">
          <p>Who viewed you:</p>
          <p className="sidebar-stat-number">-</p>
        </div>
        <div className="sidebar-stat">
          <p>Connections:</p>
          <p className="sidebar-stat-number">-</p>
        </div>
      </div>

      <div className="sidebar-bottom">
        <p>Recent</p>
        {recentItem("coding")}
        {recentItem("software development")}
        {recentItem("chat gpt")}
        {recentItem("university")}
      </div>
    </div>
  );
}

export default SideBar;
