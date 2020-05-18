import React from "react";

function UsersContainer(props) {
  const { users } = props;

  return (
    <div>
      <ul>
        {users.map((user, index) => (
          <li key={index}> {user.name} </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersContainer;
