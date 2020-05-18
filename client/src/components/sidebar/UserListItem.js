import React from "react";

function UserListItem(props) {
  const { user } = props;

  return (
    <div id="sidebar-item">
      <h3 id="sidebar-item-text">{user.name}</h3>
    </div>
  );
}

export default UserListItem;
