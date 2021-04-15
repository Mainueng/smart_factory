import React, { useState, useEffect } from "react";

import LeftMenu from "./left_menu";

const UserSetting = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const demo = [
      {
        profile_image: "user-img.png",
        name: "Lorem ipsum",
        permissions: "User",
        role: "-",
        last_access: "16/03/2012 16:12:00",
      },
      {
        profile_image: "user-img.png",
        name: "Lorem ipsum",
        permissions: "User",
        role: "-",
        last_access: "16/03/2012 16:12:00",
      },
      {
        profile_image: "user-img.png",
        name: "Lorem ipsum",
        permissions: "User",
        role: "-",
        last_access: "16/03/2012 16:12:00",
      },
      {
        profile_image: "user-img.png",
        name: "Lorem ipsum",
        permissions: "User",
        role: "-",
        last_access: "16/03/2012 16:12:00",
      },
      {
        profile_image: "user-img.png",
        name: "Lorem ipsum",
        permissions: "User",
        role: "-",
        last_access: "16/03/2012 16:12:00",
      },

      {
        profile_image: "user-img.png",
        name: "Lorem ipsum",
        permissions: "User",
        role: "-",
        last_access: "16/03/2012 16:12:00",
      },
      {
        profile_image: "user-img.png",
        name: "Lorem ipsum",
        permissions: "User",
        role: "-",
        last_access: "16/03/2012 16:12:00",
      },
      {
        profile_image: "user-img.png",
        name: "Lorem ipsum",
        permissions: "User",
        role: "-",
        last_access: "16/03/2012 16:12:00",
      },
      {
        profile_image: "user-img.png",
        name: "Lorem ipsum",
        permissions: "User",
        role: "-",
        last_access: "16/03/2012 16:12:00",
      },
    ];

    setUsers(demo);
  }, []);

  return (
    <div className="summary-container h-100">
      <div className="row mx-2">
        <div className="col-12 ">
          <h1>SMART PRODUCTION</h1>
        </div>
      </div>
      <LeftMenu />
      <div id="content" className="h-100">
        <h2 className="text-center mt-4 mb-0">
          <b>USER SETTING</b>
        </h2>
        <hr className="hr-header" />
        <div className="d-flex-left px-4">
          <div className="summary-input w-100">
            <label className="mb-1">USER</label>
            <input
              type="text"
              name="search-item"
              placeholder="Filter user by name"
              className="px-2"
            />
          </div>
        </div>
        <div className="px-4 mt-4 pt-1">
          <hr className="summary-hr" />
        </div>
        <div className="setting-table-container mx-4 pr-3">
          <div className="table-responsive px-3">
            <table className="table">
              <thead>
                <tr>
                  <th className="align-middle">Name</th>
                  <th className="align-middle">Permissions</th>
                  <th className="align-middle">
                    Sitefinity Roles per Environment
                  </th>
                  <th className="align-middle">Last Access</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <tr key={index}>
                    <td className="align-middle">
                      <img
                        src={"image/upload/" + item.profile_image}
                        alt="use-img"
                        className="img-fluid rounded mr-2"
                      />
                      {item.name}
                    </td>
                    <td className="align-middle">{item.permissions}</td>
                    <td className="align-middle">{item.role}</td>
                    <td className="align-middle">{item.last_access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
