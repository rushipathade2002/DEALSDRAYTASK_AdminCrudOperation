import React, { useState, useEffect } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../components/Sidebar';
import './EmployeeList.css';
import { toast } from "react-toastify";
import { FaUserCircle, FaTrashAlt, FaEdit, FaList } from 'react-icons/fa';
import LogoutModal from '../components/LogoutModal';
import { useAuth } from './store/Auth';



export const EmployeeList = () => {
  const history = useNavigate();
  const {  authorizationToken } = useAuth();
  const [employee, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const URL = "http://localhost:5000/"


  useEffect(()=>{
        getAllEmployee();
    },[]);

    useEffect(() => {
      if (searchQuery) {
        const filtered = employee.filter(emp => 
          emp.status.toLowerCase().includes(searchQuery.toLowerCase()) || 
          emp.empName.toLowerCase().includes(searchQuery.toLowerCase()) || 
          emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.mobileNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.course.toLowerCase().includes(searchQuery.toLowerCase()) 
        );

        setFilteredEmployee(filtered);
      } else {
        setFilteredEmployee(employee);
      }
    }, [searchQuery, employee]);

    const getAllEmployee = async()=>{
        const response = await fetch("http://localhost:5000/api/admin/employees", {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    Authorization : authorizationToken
                },
            });

            const data = await response.json();
              if(response.ok){
                setEmployee(data);
                setFilteredEmployee(data) 
              }
                setLoading(false)
              
    }

  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };


  const deleteEmp =async (id)=>{
    try {
      const response = await fetch(`http://localhost:5000/api/admin/employee/delete/${id}`,{
            method:"DELETE",
            headers:{
                    "Content-Type":"application/json",
                    authorization:authorizationToken,
                    }
            });
            if(!response.success) {
                  toast.error(response.message);
                }
                getAllEmployee();
                toast.success("Deleted Employee Successfully");                                   
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <>
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <div className="logo"></div>
          <div className="user-icon" onClick={toggleLogoutModal}>
            <FaUserCircle size={30} color="white" />
          </div>
        </header>
        {/* <div className="content"> */}
          <div className="container-fluid mt-5">
          {/* <div className="subcategory-page"> */}
            <div className="container-fluid">
                <div className="row mb-4">
                 
                  
                  <div className="col-md-4">
                  <FaList size={25} />
                    <span className='pl-3 ' style={{fontSize:"1.7rem"}}> Employee List </span>
                    Count : {employee.length}
                  </div>
              
                  <div className="col-md-5">
                      <input
                        type="text"
                        name="searchQueries"
                        placeholder="Search employee here...."
                        className="form-control w-75 d-inline-block"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {/* <button className="btn d-inline-block mr-5">
                        <IoSearchCircle size={30} className='' />
                      </button> */}
                  </div>

                  <div className="col-md-3 d-flex justify-content-end">
                    <div className="col-md-10 ">
                        <Link to="/add-employee" className="add-subcategory-button " style={{color:'white'}}>Add Employee</Link>
                    </div>
                  </div>
                </div>
            {/* </div> */}
            <table className="subcategory-table table-hover table-active">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th> Name </th>
                  <th> Email </th>
                  <th> Mobile No. </th>
                  <th> Designation </th>
                  <th> Gender </th>
                  <th> Course </th>
                  <th> Create Date </th>
                  {/* <th>Status</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                loading ? (
                    <tr>
                      <td colSpan="6">Loading...</td>
                    </tr>
                  ) : (
                    filteredEmployee.length === 0 ? (
                    <tr>
                      <td colSpan="10" style={{"textAlign":"center","padding":"10px 0px 50px 0px ", "fontWeight":"bold"}}>No Data Found</td>
                    </tr>
                    ) : (
                      filteredEmployee.map((emp, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                          {emp.image ? (
                            <img src={`${URL}${emp.image}`} alt={emp.empName} className="category-image" />
                          ) : (
                            "No Image"
                          )}
                    </td>
                    <td>{emp.empName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.mobileNo}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.gender}</td>
                    <td>{emp.course}</td>
                    <td>{emp.createdAt}</td>
                    {/* <td className={emp.status === 'Active' ? 'status-active' : 'status-inactive'}>{emp.status}</td> */}
                    <td>
                        <button className="action-btn btn-success" onClick={() => history(`/edit-emp/${emp._id}`)}>
                            <FaEdit />
                        </button>
                        <button className="btn btn-danger" 
                                    onClick={()=>{
                                        if(window.confirm("Are you sure you want to Delete")){
                                                  deleteEmp(emp._id);    
                                    }
                              } }> <FaTrashAlt />
                        </button>
                    </td>
                  </tr>
                            )   )
                        )
                    )
                }
              </tbody>
            </table>
          </div>
        {/* </div> */}
        </div>
      </div>

      {showLogoutModal && <LogoutModal toggleModal={toggleLogoutModal} />}
      
    </div>
    </>
  );
};
