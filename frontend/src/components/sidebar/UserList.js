import React from "react";
import UserListItem from "./UserListItem";

function UserList(props) {
  const { userId, users, master, assignNewMaster } = props;

  const usersWithMasterProp = users.map(user => {
    if (user.id === master) {
      user.master = true;
    } else {
      user.master = false;
    }
    if (user.id === userId) {
      user.name = "You";
    }
    return user;
  });

  const userIsMaster = userId === master;

  return (
    <div id="user-list">
      {usersWithMasterProp.map((user, index) => (
        <UserListItem
          key={index}
          user={user}
          userIsMaster={userIsMaster}
          assignNewMaster={assignNewMaster}
        />
      ))}
    </div>
  );
}

export default UserList;
