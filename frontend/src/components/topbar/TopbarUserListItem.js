import React from "react";

const colors = ["red", "blue", "green", "orange", "purple", "pink"];

function TopbarUserListItem(props) {
  const { name } = props.user;

  Math.floor(Math.random() * 6);

  const style = {
    backgroundColor: colors[Math.floor(Math.random() * 6)]
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
