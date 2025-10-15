import React from "react";
import MainHeader from "./MainHeader";
const DashboardPage = () => {
  return (
    <>
      <MainHeader pagetype="Dashboard"/>
      <section className="section dashboard" >
        <div className="container-fluid ">
          {/* <!-- Left side columns --> */}

          <div className="row ">
            {/* <!-- Sales Card --> */}
            <div className="col-lg-4 col-md-6">
              <div className="card info-card sales-card" >
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow" >
                    <li className="dropdown-header text-start">
                      <h6 data-aos="slide-left">Filter</h6>
                    </li>

                    <li>
                      <a className="dropdown-item" href="#" data-aos="fade-up-left">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" data-aos="fade-up-left">
                        This Month
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" data-aos="fade-up-left">
                        This Year
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="card-body" >
                  <h5 className="card-title" data-aos="fade-left">
                    Sales <span>| Today</span>
                  </h5>

                  <div className="d-flex align-items-center" data-aos="fade-up">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-cart"></i>
                    </div>
                    <div className="ps-3" data-aos="fade-left">
                      <h6>145</h6>
                      <span className="text-success small pt-1 fw-bold">
                        12%
                      </span>{" "}
                      <span className="text-muted small pt-2 ps-1">increase</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Sales Card -->

            <!-- Revenue Card --> */}
            <div className="col-lg-4 col-md-6" >
              <div className="card info-card revenue-card">
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>

                    <li>
                      <a className="dropdown-item" href="#">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Month
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Year
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="card-body" >
                  <h5 className="card-title" data-aos="fade-left">
                    Revenue <span>| This Month</span>
                  </h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-currency-dollar"></i>
                    </div>
                    <div className="ps-3" data-aos="fade-left">
                      <h6>$3,264</h6>
                      <span className="text-success small pt-1 fw-bold">
                        8%
                      </span>{" "}
                      <span className="text-muted small pt-2 ps-1">increase</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* !-- End Revenue Card -->

            <!-- Customers Card --> */}
            <div className="col-lg-4 col-md-6">
              <div className="card info-card customers-card">
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6 data-aos="fade-right">Filter</h6>
                    </li>

                    <li>
                      <a className="dropdown-item" href="#" data-aos="fade-left">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" data-aos="fade-left">
                        This Month
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" data-aos="fade-left">
                        This Year
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="card-body">
                  <h5 className="card-title" data-aos="fade-left">
                    Customers <span>| This Year</span>
                  </h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-people"></i>
                    </div>
                    <div className="ps-3" data-aos="fade-left">
                      <h6>1244</h6>
                      <span className="text-danger small pt-1 fw-bold">
                        12%
                      </span>{" "}
                      <span className="text-muted small pt-2 ps-1">decrease</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Customers Card -->

            <!-- Reports -->
            <!-- End Reports -->

            <!-- Recent Sales --> */}
          <div className="row">
            <div className="col-12 ">
              <div className=" bg-light shadow recent-sales overflow-auto ">
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>

                    <li>
                      <a className="dropdown-item" href="#" data-aos="fade-right">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" data-aos="fade-right">
                        This Month
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" data-aos="fade-right">
                        This Year
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="card-body" >
                  <h5 className="card-title" data-aos="fade-up">
                    Recent Sales <span>| Today</span>
                  </h5>

                  <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                    <div className="datatable-top d-flex gap-5">
                      <div className="datatable-dropdown">
                        <label>
                          <select className="datatable-selector form-select" name="per-page">
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
                    <div className="datatable-container" data-aos="fade-up">
                      <table className="table table-striped table-hover">
                        <thead style={{backgroundColor:"lightgray"}}>
                          <tr>
                            <th
                              scope="col"
                             
                            >
                           #
                            </th>
                            <th
                              scope="col"
                              data-sortable="true"
                              style={{ width: "23.613963039014372%" }}
                            >
                           Customer
                            </th>
                            <th
                              scope="col"
                              data-sortable="true"
                              style={{ width: "39.630390143737166%" }}
                            >
                           Product
                            </th>
                            <th
                              scope="col"
                              data-sortable="true"
                              style={{ width: "11.088295687885012%" }}
                            >
                          Price
                            </th>
                            <th
                              scope="col"
                              data-sortable="true"
                              className="red"
                              style={{ width: "14.887063655030802%" }}
                            >
                           Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr data-index="0">
                            <td scope="row">
                              <a href="#">#2457</a>
                            </td>
                            <td>Brandon Jacob</td>
                            <td>
                              <a href="#" className="text-primary">
                                At praesentium minu
                              </a>
                            </td>
                            <td>$64</td>
                            <td className="green">
                              <span className="badge bg-success">Approved</span>
                            </td>
                          </tr>
                          <tr data-index="1">
                            <td scope="row">
                              <a href="#">#2147</a>
                            </td>
                            <td>Bridie Kessler</td>
                            <td>
                              <a href="#" className="text-primary">
                                Blanditiis dolor omnis similique
                              </a>
                            </td>
                            <td>$47</td>
                            <td className="green">
                              <span className="badge bg-warning">Pending</span>
                            </td>
                          </tr>
                          <tr data-index="2">
                            <td scope="row">
                              <a href="#">#2049</a>
                            </td>
                            <td>Ashleigh Langosh</td>
                            <td>
                              <a href="#" className="text-primary">
                                At recusandae consectetur
                              </a>
                            </td>
                            <td>$147</td>
                            <td className="green">
                              <span className="badge bg-success">Approved</span>
                            </td>
                          </tr>
                          <tr data-index="3">
                            <td scope="row">
                              <a href="#">#2644</a>
                            </td>
                            <td>Angus Grady</td>
                            <td>
                              <a href="#" className="text-primar">
                                Ut voluptatem id earum et
                              </a>
                            </td>
                            <td>$67</td>
                            <td className="green">
                              <span className="badge bg-danger">Rejected</span>
                            </td>
                          </tr>
                          <tr data-index="4">
                            <td scope="row">
                              <a href="#">#2644</a>
                            </td>
                            <td>Raheem Lehner</td>
                            <td>
                              <a href="#" className="text-primary">
                                Sunt similique distinctio
                              </a>
                            </td>
                            <td>$165</td>
                            <td className="green">
                              <span className="badge bg-success">Approved</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="datatable-bottom">
                      <div className="datatable-info">
                      <strong>  Showing 1 to 5</strong>
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
};

export default DashboardPage;
