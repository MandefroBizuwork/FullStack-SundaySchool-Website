import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
// import SelfCloseModalAlert from "./SelfCloseModalAlert";
import SelfClosingAlert from "./SelfClosingAlert";
import { Pagination } from "react-bootstrap";
import JobModal from "./JobComponent/JobModal";
// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:2000/";

function ManageJob() {
  const [showModal, setShow] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [SlectedJob, setSelectedJob] = useState({});
  const [SlectedJob_ID, setSlectedJob_ID] = useState(null);
  const [jobsData, SetJobs] = useState([]);
  var rowsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  



// console.log(jobsData)
  const [currentData,setcurrentData]=useState()
  const totalPages = Math.ceil(jobsData.length / rowsPerPage);

 

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/jobs/");
      const data = await response.json();
     
      SetJobs(data.Jobs[0] || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  
  useEffect(() => {
    fetchJobs();
    const startIndex = (currentPage - 1) * rowsPerPage;
    setcurrentData(jobsData.slice(startIndex, startIndex + rowsPerPage));
  }, [currentPage, jobsData]);
  // pagination

 

  // Function to change the page
  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 2; // Number of pages to show near the current page

    for (let page = 1; page <= totalPages; page++) {
        if (
            page === 1 || // First page
            page === totalPages || // Last page
            (page >= currentPage - maxVisiblePages && page <= currentPage + maxVisiblePages) // Pages near the current page
        ) {
            items.push(
                <Pagination.Item
                  
                    key={page}
                    active={page === currentPage}
                    onClick={() => changePage(page)}
                >
                    {page}
                </Pagination.Item>
            );
        } else if (
            page === currentPage - maxVisiblePages - 1 || // Before the range of current page
            page === currentPage + maxVisiblePages + 1 // After the range of current page
        ) {
            items.push(<Pagination.Ellipsis key={page} disabled />);
        }
    }

    return items;
};
  //end of pagination
  const handleClose = () => {
    setSelectedJob({});
    fetchJobs();
    setShow(false);
  };

  const ShowPostModal = () => {
    setShow(true);
    setModalType("create");
    // setValues({
    //   Company: "",
    //   Description: "",
    //   Jtitle: "",
    //   Location: "",
    //   Salary: "",
    // });
  };

  const ShowUpdateModal = (item,id) => {
    setShow(true);
    setModalType("update");
    setSelectedJob({
      Company: item.COMPANY,
      Description: item.DESCRIPTION,
      Jtitle: item.JOB_TITLE,
      Location: item.LOCATION,
      Salary: item.SALARY,
    });
setSlectedJob_ID(id)
   
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState(null);
  const [DeletMessage, setDeletMessage] = useState(null);

  const handlDeleteClick = (jobid) => {
    setIsModalOpen(true); // // Open the confirmation modal
    setJobIdToDelete(jobid);
    //const isConfirmed = confirm("Are you sure you want to delete this job?");
  };
  const handleCancelDelete = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  //self closing modal logic
  const [SelfModalOpen, setSelfModalOpen] = useState(false);
  // const [SelfModalClose, setSelfModalClose] = useState(false);

  const handleSelfClose = () => setSelfModalOpen(false);
  //
  const handleConfirmDelete = async () => {
    setIsModalOpen(false);
    try {
      const response = await fetch(
        `http://localhost:2000/api/jobs/DeleteJob/${jobIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        setDeletMessage("Job deleted successfully:");
        setSelfModalOpen(true);
  
        // Fetch the updated job list
        await fetchJobs();
  
        // Check if the current page is now empty and adjust if necessary
        const newTotalPages = Math.ceil(jobsData.length / rowsPerPage);
        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages); // Move to the last available page
        } else {
          const startIndex = (currentPage - 1) * rowsPerPage;
          setcurrentData(jobsData.slice(startIndex, startIndex + rowsPerPage));
        }
      } else {
        setDeletMessage("Failed to delete the job:", response.statusText);
      }
    } catch (error) {
      setDeletMessage("Error during deletion:", error);
    }
  };
  

  // // Usage example
  // deleteJob(1); // Pass the job ID you want to delete


    return (
      <div className="container-fluid pt-5 " style={{ marginTop: "100px" }}>
        <div className="modal-container bg-light clearfix container">
          <SelfClosingAlert
            show={SelfModalOpen}
            onClose={handleSelfClose}
            message={DeletMessage}
          />
          <Button
            style={{ float: "right" }}
            className="btn btn-success"
            onClick={ShowPostModal}
          >
            Add new Job
          </Button>
        <JobModal
      
          modalType= {modalType}
          showModal={showModal}
        
          handleClose={handleClose}
          SlectedJob={SlectedJob}
          id={SlectedJob_ID}
         
        />
         
        </div>

        <div className="table-container shadow bg-light container " style={{overflow:"auto"}}>
          <table className="table table-striped table-hover">
            <thead style={{backgroundColor:"lightgray"}}>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Job ID</th>
                <th scope="col">Job Title</th>
                <th scope="col">Company</th>
                <th scope="col">Location</th>
                <th scope="col">Salary</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {currentData && currentData.length > 0 ? (
                currentData.map((item, index) =>
                  item ? (
                    <tr key={item.JOB_ID}>
                      <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td>{item.JOB_ID}</td>
                      <td>{item.JOB_TITLE}</td>
                      <td>{item.COMPANY}</td>
                      <td>{item.LOCATION}</td>
                      <td>{item.SALARY}</td>
                      <td>{item.DESCRIPTION}</td>
                      <td style={{ display: "Flex", columnGap: "10px" }}>
                        <Link className="btn btn-success">View</Link>
                        <button
                          onClick={() => ShowUpdateModal(item,item.JOB_ID)}
                          className="btn btn-warning"
                        >
                          Update
                        </button>
                        <Link
                          onClick={() => handlDeleteClick(item.JOB_ID)}
                          className="btn btn-danger"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ) : null
                )
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No jobs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination className="justify-content-center"  size="lg">
          <Pagination.First disabled={true} />
            <Pagination.Prev
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </Pagination.Prev>

            {renderPaginationItems()}

            <Pagination.Next
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </Pagination.Next>
            <Pagination.Last disabled={true} />
        </Pagination>
          <ConfirmDeleteModal 
            isOpen={isModalOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            message={DeletMessage}
          />

          {/* <SelfCloseModalAlert
            showModal={SelfModalOpen}
            onClose={handleSelfClose}
          
          
          /> */}
        </div>
      </div>
    );

}

export default ManageJob;
