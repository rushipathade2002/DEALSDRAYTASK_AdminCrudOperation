import React, { useState } from 'react';
import './AddEmp.css';
import { FaUserCircle } from 'react-icons/fa';
import { Sidebar } from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './store/Auth';
import LogoutModal from '../components/LogoutModal';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AddEmp = () => {
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
  const { authorizationToken } = useAuth();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
    try {
      const formData = new FormData();
      for (const key in employee) {
        formData.append(key, employee[key]);
      }

      const response = await axios.post("http://localhost:5000/api/admin/save-employee", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: authorizationToken
        }
      });

      const res_data = await response.data;
      if (response.status === 201) {
        toast.success("Employee added successfully");
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
        toast.error(res_data.message || "Add Employee failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the Employee");
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
          <div className="add-sub-category-page">
            <div className="container">
              <form onSubmit={handleSubmit}  encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-12">
                    <h2>Add Employee</h2>
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
                      <label htmlFor="imageUpload">Upload Image</label>
                      <input
                        type="file"
                        id="imageUpload"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    {imagePreview && <img src={imagePreview} alt="Emp Preview" className="image-preview w-100" />}
                  </div>

                  <div className="col-md-12">
                    <div className="form-actions">
                      <button type="button" className="cancel-button" onClick={() => window.history.back()}>Cancel</button>
                      <button type="submit" className="save-button">Save</button>
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
