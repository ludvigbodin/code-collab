import React from "react";

function SidebarItem(props) {
  return (
    <>
      <div className="sidebar-title-wrapper">
        <i className="sidebar-icon"></i>
        <span className="sidebar-title">{props.title}</span>
      </div>
      <div id="items">{props.children}</div>
    </>
  );
}

export default SidebarItem;
