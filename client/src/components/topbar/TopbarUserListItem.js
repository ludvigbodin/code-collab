import React from "react";
import { getUserNickname } from "../../utils/userNickname";

function TopbarUserListItem(props) {
  const { name, color } = props.user;

  const style = {
    backgroundColor: color
  };

  return (
    <li className="topbar-user-list-item">
      <div style={style} className="topbar-user-list-item-avatar">
        {getUserNickname(name)}
      </div>
    </li>
  );
}

export default TopbarUserListItem;
