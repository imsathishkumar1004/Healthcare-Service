import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "../helper/apiCall.js";
import toast from "react-hot-toast";

function Register() {
  const [loading, setLoading] = useState(false);
  const [showHostelDropdown, setShowHostelDropdown] = useState(false);
  const [formDetails, setFormDetails] = useState({
    RollNo: "",
    mobile: "",
    Year: "",
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    password: "",
    confpassword: "",
    department: "",
    Stay: "",
    Hostel: ""
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;

    // Check if the selected option for "Stay" is "Hostel"
    if (name === "Stay") {
      setShowHostelDropdown(value === "Hostel");
    }

    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      if (loading) return;

      const { RollNo,gender,Stay,department,Hostel,Year,mobile,firstname, lastname, email, password, confpassword } =
        formDetails;
      if (!firstname || !lastname || !email || !password || !confpassword) {
        return toast.error("Input field should not be empty");
      } else if (firstname.length < 3) {
        return toast.error("First name must be at least 3 characters long");
      } else if (lastname.length < 3) {
        return toast.error("Last name must be at least 3 characters long");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } else if (!/\d/.test(password)) {
        return toast.error("Password must contain at least one numeric character");
      } else if (!/\W/.test(password)) {
        return toast.error("Password must contain at least one special character");
      } else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }

      // Check other form validation conditions...

      await toast.promise(
        axios.post("/user/register", {
          RollNo,
          firstname,
          lastname,
          gender,
          email,
          password,
          department,
          Stay,
          Hostel,
          Year,
          mobile
        }),
        {
          pending: "Registering user...",
          success: "User registered successfully",
          error: "Unable to register user",
          loading: "Registering user...",
        }
      );
      return navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Sign Up</h2>
        <form onSubmit={formSubmit} className="register-form">
          <div className="form-same-row">
            <input
              type="string"
              name="RollNo"
              className="form-input"
              placeholder="Enter your Register Number"
              value={formDetails.RollNo}
              onChange={inputChange}
              style={{ width: "10000px" }}
            />
            <input
              type="string"
              name="mobile"
              className="form-input"
              placeholder="Enter your Mobile Number"
              value={formDetails.mobile}
              onChange={inputChange}
              style={{ width: "10000px" }}
            />
          </div>
          <div className="form-same-row">
            <input
              type="text"
              name="firstname"
              className="form-input"
              placeholder="Enter your first name"
              value={formDetails.firstname}
              onChange={inputChange}
              style={{ width: "10000px" }}
            />

            <input
              type="text"
              name="lastname"
              className="form-input"
              placeholder="Enter your last name"
              value={formDetails.lastname}
              onChange={inputChange}
              style={{ width: "10000px" }}
            />
          </div>
          <div className="form-same-row" >
            <select
              name="gender"
              value={formDetails.gender}
              className="form-input"
              id="gender"
              onChange={inputChange}
              style={{ width: "10000px" }}
            >
              <option value="neither">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formDetails.email}
              onChange={inputChange}
              style={{ width: "10000px" }}
            />
          </div>
          <div className="form-same-row">
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formDetails.password}
              onChange={inputChange}
              style={{ width: "10000px" }}
            />
            <input
              type="password"
              name="confpassword"
              className="form-input"
              placeholder="Confirm your password"
              value={formDetails.confpassword}
              onChange={inputChange}
              style={{ width: "10000px" }}
            />
          </div>

          <div className="form-same-row">
            <select
              name="Stay"
              value={formDetails.Stay}
              id="Stay"
              onChange={inputChange}
              style={{ width: "10000px" }}
            >
              <option value="Dayscholar">Dayscolar</option>
              <option value="Hostel">Hostel</option>
            </select>
            <select
              name="Year"
              className="form-input"
              value={formDetails.Year}
              id="Year"
              onChange={inputChange}
              style={{ width: "10000px" }}
            >
              <option value="">Select Year</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>
            
          </div>

          {showHostelDropdown && (
              <select
                name="Hostel"
                className="form-input"
                value={formDetails.Hostel}
                id="Hostel"
                onChange={inputChange}
              >
                <option value="Select Hostel">Select Hostel</option>
                <option value="Dheeran">DHEERAN</option>
                <option value="Ponnar">PONNAR</option>
                <option value="Sankar">SANKAR</option>
                <option value="Elango">Elango</option>
                <option value="Kamban">Kamban</option>
                <option value="Valluvar">Valluvar</option>
                <option value="Bharathi">Bharathi</option>
                <option value="Kaveri">KAVERI</option>
                <option value="Amaravathi">AMARAVATHI</option>
                <option value="Bavani">BAVANI</option>
              </select>
            )}

<select
              name="department"
              className="form-input"
              value={formDetails.department}
              id="department"
              onChange={inputChange}
            >
              <option value="NIL">select Dept</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="EEE">EEE</option>
            </select>
        

          <button style={{width:600,margin: "0 auto" }}
            type="submit"
            className="btn form-btn"
            disabled={loading ? true : false}
          >
            sign up
          </button>
        </form>
        <p>
          Already a user?{" "}
          <NavLink className="login-link" to={"/login"}>
            Log in
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Register;
