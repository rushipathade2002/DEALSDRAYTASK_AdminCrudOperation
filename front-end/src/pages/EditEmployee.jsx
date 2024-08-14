import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../components/Sidebar';
import { toast } from "react-toastify";
import { FaUserCircle } from 'react-icons/fa';
import LogoutModal from '../components/LogoutModal';
import { useAuth } from './store/Auth';

export const EditEmp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const [employee, setEmployee] = useState({
    empName: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: "",
    status: "Active",
    image: ""
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const URL_BASE = "http://localhost:5000/";

  useEffect(() => {
    getEmployeeById();
  }, []);

 
  const getEmployeeById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/employee/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
        },
      });
      const data = await response.json();
      if (response.ok) {
        setEmployee(data);
        if (data.image) {
          setImagePreview(`${URL_BASE}${data.image}`);
        }
      }
    } catch (error) {
      console.error("There was an error fetching the subcategory data!", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      let updatedCourses = [...employee.course];
      if (checked) {
        updatedCourses.push(value);
      } else {
        updatedCourses = updatedCourses.filter(course => course !== value);
      }
      setEmployee({ ...employee, course: updatedCourses });
    } else {
      setEmployee({
        ...employee,
        [name]: value
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setEmployee({
        ...employee,
        image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('empName', employee.empName);
    formData.append('email', employee.email);
    formData.append('mobileNo', employee.mobileNo);
    formData.append('designation', employee.designation);
    formData.append('gender', employee.gender);
    formData.append('course', employee.course);
    formData.append('status', employee.status);
      if(employee.image instanceof File) {
        formData.append('image', employee.image);
      } 
  
    try {
      const response = await fetch(`http://localhost:5000/api/admin/employee/update/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: authorizationToken
        },
        body: formData,
      });

      const res_data = await response.json();
      if (response.ok) {
        toast.success("Employee updated successfully");
        setEmployee({
          empName: "",
          email: "",
          mobileNo: "",
          designation: "",
          gender: "",
          course: "",
          status: "Active",
          image: ""
        });
        setImagePreview(null);
        navigate("/empList");
      } else {
        toast.error(res_data.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the subcategory");
    }
  };

  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <div className="logo"></div>
          <div className="user-icon" onClick={toggleLogoutModal}>
            <FaUserCircle size={30} color="white" />
          </div>
        </header>
        <div className="content">
          <div className="edit-category-page">
            <h2>Edit Employee</h2>
            <div className="container">
              <form onSubmit={handleSubmit} className="edit-category-form">
                <div className="row">
                  <div className="col-md-12">
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="empName">Employee Name: </label>
                      <input
                        type="text"
                        id="empName"
                        name='empName'
                        placeholder='Name...'
                        value={employee.empName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="email">Email: </label>
                      <input
                        type="email"
                        id="email"
                        name='email'
                        placeholder='email...'
                        value={employee.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="mobileNo">Mobile No.: </label>
                      <input
                        type="text"
                        id="mobileNo"
                        name='mobileNo'
                        placeholder='Contact No....'
                        value={employee.mobileNo}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Designation: </label>
                      <select
                        id="designation"
                        name="designation"
                        value={employee.designation}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Gender: </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="genderMale"
                          value="male"
                          onChange={handleInputChange}
                          checked={employee.gender === "male"}
                        />
                        <label className="form-check-label" htmlFor="genderMale">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="genderFemale"
                          value="female"
                          onChange={handleInputChange}
                          checked={employee.gender === "female"}
                        />
                        <label className="form-check-label" htmlFor="genderFemale">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Course:</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="course"
                          value="MCA"
                          onChange={handleInputChange}
                          checked={employee.course.includes("MCA")}
                        />
                        <label className="form-check-label">
                          MCA
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="course"
                          value="BCA"
                          onChange={handleInputChange}
                          checked={employee.course.includes("BCA")}
                        />
                        <label className="form-check-label">
                          BCA
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="course"
                          value="BSc"
                          onChange={handleInputChange}
                          checked={employee.course.includes("BSc")}
                        />
                        <label className="form-check-label">
                          BSc
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <select
                        id="status"
                        name="status"
                        value={employee.status}
                        onChange={handleInputChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="imageUpload">Upload Image</label>
                      <input
                        type="file"
                        id="imageUpload"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    {imagePreview && <img src={imagePreview} alt="Emp Preview" className="image-preview w-100" />}
                  </div>

                  <div className="col-md-12">
                    <div className="form-buttons">
                      <button type="button" className=" btn-secondary mr-5" onClick={() => window.history.back()}>Cancel</button>
                      <button type="submit" className="save-button btn text-end">Update</button>
                    </div>
                  </div>
                </div> 
              </form>
            </div>
          </div>
        </div>
      </div>
      {showLogoutModal && <LogoutModal toggleModal={toggleLogoutModal} />}
    </div>
  );
};
