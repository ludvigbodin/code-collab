import React from "react";
import UserListItem from "./UserListItem";
import SidebarTitle from "./item/SidebarTitle";

function UserList(props) {
  const { userId, users, master } = props;

  const usersWithMasterProp = users.map(user => {
    if (user._id === master) {
      user.master = true;
    } else {
      user.master = false;
    }
    if (user._id === userId) {
      user.name = "You";
    }
    return user;
  });

  const userIsMaster = userId === master;

  return (
    <>
      <SidebarTitle icon="fas fa-user-friends" title="Code monkeys" />
      <div id="user-list">
        {usersWithMasterProp.map((user, index) => (
          <UserListItem key={index} user={user} userIsMaster={userIsMaster} />
        ))}
      </div>
    </>
  );
}

export default UserList;
