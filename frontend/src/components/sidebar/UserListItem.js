import React from "react";

function UserListItem(props) {
  const { userIsMaster, user } = props;

  let masterBadge = <span className="badge master">Master</span>;
  let assignMasterBadge = (
    <span className="badge assign-master">Assign master</span>
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
