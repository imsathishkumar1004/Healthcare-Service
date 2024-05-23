import React, { useState, useEffect } from "react";
import axios from "../helper/apiCall.js";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/FetchData.js";
import "../styles/user.css";

// ... (your existing imports)

const Filter = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointments, setSelectedAppointments] = useState([]);
    const [rollNoFilter, setRollNoFilter] = useState("");
    const [RollNo,setRollNo]=useState("")
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.root);
  
    const fetchAllAppointments = async () => {
      try {
        dispatch(setLoading(true));
        const temp = await fetchData(`/appointment/getallappointments?search=${RollNo}`);
        setAppointments(temp);
        dispatch(setLoading(false));
      } catch (error) {
        // Handle error if needed
      }
    };
  
    useEffect(() => {
      fetchAllAppointments();
    }, []);
  
    const markAppointmentAsCompleted = async (appointment) => {
      try {
        await toast.promise(
          axios.put(
            "/appointment/completed",
            {
              appointid: appointment?._id,
              doctorId: appointment?.doctorId._id,
              doctorname: `${appointment?.userId?.firstname} ${appointment?.userId?.lastname}`,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          {
            success: "Appointment booked successfully",
            error: "Unable to book appointment",
            loading: "Booking appointment...",
          }
        );
  
        fetchAllAppointments();
      } catch (error) {
        // Handle error if needed
      }
    };
  
    const handlePrintTable = () => {
      const printWindow = window.open("", "_blank");
      
      printWindow.document.write("<html><head><title>Print</title></head><body>");
      printWindow.document.write("<table>");
      
      // Add the table headers
      printWindow.document.write("<thead>");
      printWindow.document.write("<tr>");
      printWindow.document.write("<th>S.No</th>");
      printWindow.document.write("<th>Doctor</th>");
      printWindow.document.write("<th>Patient</th>");
      printWindow.document.write("<th>Dept</th>");
      printWindow.document.write("<th>R.No</th>");
      printWindow.document.write("<th>App.Date</th>");
      printWindow.document.write("<th>App.Time</th>");
      printWindow.document.write("<th>Boo.Time</th>");
      printWindow.document.write("<th>Boo.Date</th>");
      printWindow.document.write("<th>Status</th>");
      printWindow.document.write("</tr>");
      printWindow.document.write("</thead>");
  
      // Add the table body
      printWindow.document.write("<tbody>");
      appointments.forEach((ele, i) => {
        printWindow.document.write("<tr>");
        printWindow.document.write(`<td>${i + 1}</td>`);
        printWindow.document.write(`<td>${ele?.doctorId?.firstname} ${ele?.doctorId?.lastname}</td>`);
        printWindow.document.write(`<td>${ele?.userId?.firstname} ${ele?.userId?.lastname}</td>`);
        printWindow.document.write(`<td>${ele?.userId?.department}</td>`);
        printWindow.document.write(`<td>${ele?.userId?.RollNo}</td>`);
        printWindow.document.write(`<td>${ele?.date}</td>`);
        printWindow.document.write(`<td>${ele?.time}</td>`);
        printWindow.document.write(`<td>${ele?.createdAt.split("T")[0]}</td>`);
        printWindow.document.write(`<td>${ele?.updatedAt.split("T")[1].split(".")[0]}</td>`);
        printWindow.document.write(`<td>${ele?.status}</td>`);
        printWindow.document.write("</tr>");
      });
      printWindow.document.write("</tbody>");
  
      printWindow.document.write("</table></body></html>");
  
      printWindow.document.close();
      printWindow.print();
    };
  
    const toggleSelection = (appointmentId) => {
      const isSelected = selectedAppointments.includes(appointmentId);
      if (isSelected) {
        setSelectedAppointments(selectedAppointments.filter((id) => id !== appointmentId));
      } else {
        setSelectedAppointments([...selectedAppointments, appointmentId]);
      }
    };
  
    const filterAppointmentsByRollNo = () => {
      const filteredAppointments = appointments.filter(
        (appointment) => appointment?.userId?.RollNo.includes(rollNoFilter)
      );
      setAppointments(filteredAppointments);
    };
  
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <section className="user-section">
          <div>
            <h3 className="home-sub-heading">REPORT</h3>
            <label htmlFor="rollNoFilter">Filter by Roll No:</label>
              <input
                type="text"
                id="rollNoFilter"
                value={RollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
              <button className="btn" onClick={fetchAllAppointments}>
                Apply Filter
              </button>
              </div>
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Dept</th>
                    <th>R.No</th>
                    <th>App.Date</th>
                    <th>App.Time</th>
                    <th>Boo.Time</th>
                    <th>Boo.Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {ele?.doctorId?.firstname +
                            " " +
                            ele?.doctorId?.lastname}
                        </td>
                        <td>
                          {ele?.userId?.firstname + " " + ele?.userId?.lastname}
                        </td>
                        <td>
                          {ele?.userId?.department}
                        </td>
                        <td>
                          {ele?.userId?.RollNo}
                        </td>
                        <td>{ele?.date}</td>
                        <td>{ele?.time}</td>
                        <td>{ele?.createdAt.split("T")[0]}</td>
                        <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                        <td>{ele?.status}</td>
                        
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="filter-container">
            
            </div>
            <div className="print-btn-container">
        <button className="btn print-btn" onClick={handlePrintTable}>
          Print Table
        </button>
      </div>
            {appointments.length > 0 ? (
              <div className="user-container">
                <table>
                  {/* ... (your existing table structure) */}
                </table>
              </div>
            ) : (
              <Empty />
            )}
          </section>
        )}
      </>
    );
  };
  
  export default Filter;
  