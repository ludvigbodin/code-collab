import React from "react";

function TopbarUserListItem(props) {
  const { name, color } = props.user;

  const style = {
    backgroundColor: color
  };

  return (
    <li className="topbar-user-list-item">
      <div style={style} className="topbar-user-list-item-avatar">
        {name[0]}
      </div>
    </li>
  );
}

export default TopbarUserListItem;
