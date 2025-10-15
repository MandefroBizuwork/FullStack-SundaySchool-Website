import React, { useState, useEffect } from "react";
import MainHeader from "./MainHeader";

function UserList() {
  const [userlist, setuserlist] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const api = "http://localhost:2000/api/user/userReport";
        const response = await fetch(api);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const userdata = await response.json();
        setuserlist(userdata.latestuser);
        // console.log(userdata.latestuser.length)
        // if (userdata.latestuser[0].length == 0) {
        //   setError("No notification found");
        // }
        //  console.log(userdata.latestuser[0].FirstName)
      } catch (e) {
        // setError(e.message);
        console.log(e.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <MainHeader pagetype="Users" />
      <section className="section dashboard">
        <div className="container-fluid ">
          {/* <!-- Left side columns --> */}

          {/* <!-- End Customers Card -->

            <!-- Reports -->
            <!-- End Reports -->

            <!-- Recent Sales --> */}
          <div className="row">
            <div className="col-12 ">
              <div className=" bg-light shadow recent-sales overflow-auto ">
                <div className="card-body">
                  <h5 className="card-title">List of users</h5>

                  <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                    <div className="datatable-top d-flex gap-5">
                      <div className="datatable-dropdown">
                        <label>
                          <select
                            className="datatable-selector form-select"
                            name="per-page"
                          >
                            <option value="5">5</option>
                            <option value="10" selected="">
                              10
                            </option>
                            <option value="15">15</option>
                            <option value="-1">All</option>
                          </select>{" "}
                          entries per page
                        </label>
                      </div>
                      <div className="datatable-search">
                        <input
                          className="datatable-input form-control"
                          placeholder="Search..."
                          type="search"
                          name="search"
                          title="Search within table"
                        />
                      </div>
                    </div>
                    <div className="datatable-container">
                      <table className="table table-striped table-hover">
                        <thead style={{ backgroundColor: "lightgray" }}>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col" data-sortable="true">
                              Full name
                            </th>
                            <th scope="col" data-sortable="true">
                              Email
                            </th>

                            <th scope="col" data-sortable="true" className="red">
                              Role
                            </th>
                            <th scope="col" data-sortable="true" className="red">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {userlist && userlist.length > 0 ? (
            userlist.map((item, key) => (
              <React.Fragment key={key}>
                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <small>{`${item.FirstName} ${item.LastName}`}</small>
                    <a className="seeDetailbuton" href="#">
                      <span className="badge text-center rounded-pill bg-primary">
                        See detail
                      </span>
                      <small>{calculateTimeAgo(item.timestamp)}</small>
                    </a>
                  </div>
                </li>
                <hr
                  className="dropdown-divider"
                  style={{ backgroundColor: "rgb(88, 87, 87)" }}
                />
              </React.Fragment>
            ))
          ) : (
            <li style={{ textAlign: "center", color: "gray" }}>
              No notifications found
            </li>
          )} */}

                          {userlist && userlist.length > 0 ? (
                            userlist.map((item, key) => (
                              <React.Fragment key={key}>
                                <tr data-index="0">
                                  <td scope="row">{key + 1}</td>
                                  <td scope="row">
                                    <a href="#">{item.username}</a>
                                  </td>
                                  <td>{`${item.FirstName} ${item.LastName}`}</td>
                                  <td scope="row">
                                    <a href="#" className="text-primary">
                                      {item.email}
                                    </a>
                                  </td>
                                  <td scope="row">{item.Role}</td>
                                  <td className="green" scope="row">
                                    <span className="badge bg-success">
                                      Approved
                                    </span>
                                  </td>
                                </tr>
                              </React.Fragment>
                            ))
                          ) : (
                            <span
                              style={{ textAlign: "center", color: "gray" }}
                            >
                              No user found
                            </span>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="datatable-bottom">
                      <div className="datatable-info">
                        <strong> Showing 1 to 5</strong>
                      </div>
                      <nav className="datatable-pagination">
                        <ul className="datatable-pagination-list"></ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Recent Sales --> */}
            {/* <!-- Top Selling --> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default UserList;
