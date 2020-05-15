import React from "react";
import TopbarUserListItem from "./TopbarUserListItem";

function TopbarUserList(props) {
  const { users } = props;

  return (
    <div id="topbar-user-list-wrapper">
      <ul id="topbar-user-list">
        {users.map((user, index) => (
          <TopbarUserListItem key={index} user={user} />
        ))}
      </ul>
    </div>
  );
}

export default TopbarUserList;
