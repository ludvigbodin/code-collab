import React from "react";
import UserListItem from "./UserListItem";
import SidebarTitle from "./item/SidebarTitle";

function UserList(props) {
  const { userId, users } = props;

  return (
    <>
      <SidebarTitle icon="fas fa-user-friends" title="Code monkeys" />
      <div id="user-list">
        {users.map((user, index) => (
          <UserListItem key={index} user={user} />
        ))}
      </div>
    </>
  );
}

export default UserList;
