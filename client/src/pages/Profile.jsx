import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import axios from "../helper/apiCall.js";
import toast from "react-hot-toast";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import fetchData from "../helper/FetchData.js";
import jwt_decode from "jwt-decode";


function Profile() {
  const { userId } = jwt_decode(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const [file, setFile] = useState("");
  const [formDetails, setFormDetails] = useState({
    RollNo: "",
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    mobile: "",
    gender: "neither",
    address: "",
    password: "",
    confpassword: "",
    department: "",
    Year: ""
  });

  const getUser = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/user/getuser/${userId}`);
      setFormDetails({
        ...temp,
        password: "",
        confpassword: "",
        mobile: temp.mobile === null ? "" : temp.mobile,
        age: temp.age === null ? "" : temp.age,
      });
      setFile(temp.pic);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, [dispatch]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const {
        RollNo,
        firstname,
        lastname,
        email,
        age,
        mobile,
        address,
        gender,
        password,
        confpassword,
        department,
        Year,
        Stay,
        Hostel
      } = formDetails;

      if (!email) {
        return toast.error("Email should not be empty");
      }else if (RollNo.length < 3) {
          return toast.error("Must Enter a Rollnumber should not empty");
      } else if (firstname.length < 3) {
        return toast.error("First name must be at least 3 characters long");
      } else if (lastname.length < 3) {
        return toast.error("Last name must be at least 3 characters long");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }
      await toast.promise(
        axios.put(
          "/user/updateprofile",
          {
            RollNo,
            firstname,
            lastname,
            age,
            mobile,
            address,
            gender,
            email,
            password,
            department,
            Year,
            Stay,
            Hostel
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Updating profile...",
          success: "Profile updated successfully",
          error: "Unable to update profile",
          loading: "Updating profile...",
        }
      );

      setFormDetails({ ...formDetails, password: "", confpassword: "" });
    } catch (error) {
      return toast.error("Unable to update profile");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="register-section flex-center">
          <div className="profile-container flex-center">
            <h2 className="form-heading">Profile</h2>
            <img
              src={file}
              alt="profile"
              className="profile-pic"
            />
            <form
              onSubmit={formSubmit}
              className="register-form"
            >
              <div className="form-same-row">
              <input
                  type="text"
                  name="RollNo"
                  className="form-input"
                  placeholder="Enter your RollNumber"
                  value={formDetails.RollNo}
                  onChange={inputChange}
                />
                <input
                  type="text"
                  name="firstname"
                  className="form-input"
                  placeholder="Enter your first name"
                  value={formDetails.firstname}
                  onChange={inputChange}
                />
                <input
                  type="text"
                  name="lastname"
                  className="form-input"
                  placeholder="Enter your last name"
                  value={formDetails.lastname}
                  onChange={inputChange}
                />
              </div>
              <div className="form-same-row">
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={formDetails.email}
                  onChange={inputChange}
                />
                <input
                  type="text"
                  name="department"
                  className="form-input"
                  placeholder="Enter your department"
                  value={formDetails.department}
                  onChange={inputChange}
                />
                 <input
                  type="text"
                  name="gender"
                  className="form-input"
                  placeholder="Enter your Gender"
                  value={formDetails.gender}
                  onChange={inputChange}
                  />
                </div>
              <div className="form-same-row">
              <input
                  type="text"
                  name="Year"
                  className="form-input"
                  placeholder="Year"
                  value={formDetails.Year}
                  onChange={inputChange}
                />
                <input
                  type="text"
                  name="Stay"
                  className="form-input"
                  placeholder="from"
                  value={formDetails.Stay}
                  onChange={inputChange}
                />
                <input
                  type="Hostel"
                  name="lastname"
                  className="form-input"
                  placeholder="Hostel"
                  value={formDetails.Hostel}
                  onChange={inputChange}
                />
                </div>
              <div className="form-same-row">
                <input
                  type="text"
                  name="age"
                  className="form-input"
                  placeholder="Enter your age"
                  value={formDetails.age}
                  onChange={inputChange}
                />
                <input
                  type="text"
                  name="mobile"
                  className="form-input"
                  placeholder="Enter your mobile number"
                  value={formDetails?.mobile}
                  onChange={inputChange}
                />
              </div>
              <textarea
                type="text"
                name="address"
                className="form-input"
                placeholder="Enter your address"
                value={formDetails.address}
                onChange={inputChange}
                rows="2"
              ></textarea>
              <div className="form-same-row">
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formDetails.password}
                  onChange={inputChange}
                />
                
                <input
                  type="password"
                  name="confpassword"
                  className="form-input"
                  placeholder="Confirm your password"
                  value={formDetails.confpassword}
                  onChange={inputChange}
                />
                
              </div>
              
              <button style={{width:600,margin: "0 auto" }}
                type="submit"
                className="btn form-btn"
              >
                update
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default Profile;
