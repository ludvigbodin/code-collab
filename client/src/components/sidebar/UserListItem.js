import React from "react";
import { getUserNickname } from "../../utils/userNickname";

function UserListItem(props) {
  const { user } = props;
  const { name, color } = user;

  const style = {
    backgroundColor: color
  };

  return (
    <div className="sidebar-item">
      <h3 className="sidebar-item-text">{name}</h3>
      <div style={style} className="sidebar-user-list-item-avatar">
        {getUserNickname(name)}
      </div>
    </div>
  );
}

export default UserListItem;
