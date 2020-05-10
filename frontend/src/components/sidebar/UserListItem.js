import React from "react";

function UserListItem(props) {
  const { userIsMaster, user, assignNewMaster } = props;

  let masterBadge = <span className="badge master">Master</span>;
  let assignMasterBadge = (
    <span
      onClick={() => assignNewMaster(user.id)}
      className="badge assign-master"
    >
      Assign master
    </span>
  );

  return (
    <div id="sidebar-item">
      <h3 id="sidebar-item-text">
        {user.name}{" "}
        {user.master ? masterBadge : userIsMaster && assignMasterBadge}{" "}
      </h3>
    </div>
  );
}

export default UserListItem;
