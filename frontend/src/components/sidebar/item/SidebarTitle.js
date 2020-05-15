import React from "react";

function SidebarTitle(props) {
  return (
    <div className="sidebar-title-wrapper">
      <i className={`sidebar-icon ${props.icon}`}></i>
      <span className="sidebar-title">{props.title}</span>
    </div>
  );
}

export default SidebarTitle;
