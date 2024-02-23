import React from "react";

const UserRow = ({ name, gender, role, maritalStatus, id }) => {
  return <>
    <tr>
      <td>{name}</td>
      <td>{gender}</td>
      <td>{role}</td>
      <td>{maritalStatus ? 'Married' : 'Single'}</td>
      {/* You can include additional columns or customize the display as needed */}
    </tr>
  </>;
};
export { UserRow };
