import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faBars } from "@fortawesome/free-solid-svg-icons";
import "./css/AppHeader.css";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const AppHeader = ({ onToggleSidebar, isSidebarOpen }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handlelogout = () =>{
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    setTimeout(()=>{
      toast.warning("Logging Out!");
      setTimeout(()=>{
          localStorage.removeItem("LoggedUserToken");
    navigate('/');
    setIsLoading(false);
      }, 2000)
      
    }, 2000)
  
  }
  // console.log(isSidebarOpen);

  useEffect(() => {
    const token = localStorage.getItem("LoggedUserToken");

    const updateRemainingTime = () => {
      const decodedToken = jwtDecode(token);

      if (decodedToken) {
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = new Date().getTime();
        const newRemainingTime = expirationTime - currentTime;
        // console.log(new Date(newRemainingTime).toLocaleTimeString());
        setRemainingTime(newRemainingTime);
      } else {
        console.error("Error decoding JWT token");
      }
    };

    updateRemainingTime();

    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div
      style={{
        marginLeft: isSidebarOpen ? "250px" : "0",
        position: "fixed",
        top: 0,
        zIndex: "1000",
      }}
    >
      {" "}
      <nav
        className="navbar navbar-expand-lg navbar-dark border"
        id="header-nav"
        style={{ width: isSidebarOpen ? "calc(100% - 250px)" : "100%" }}
      >
        <div className="container-fluid d-flex">
          <div className="d-flex">
            <Link className="navbar-brand" onClick={onToggleSidebar}>
              {" "}
              {isSidebarOpen ? (
                <FontAwesomeIcon
                  icon={faClose}
                  className="me-2"
                  style={{ color: "black", fontSize: "20px", marginTop: "5px" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faBars}
                  className="me-2"
                  style={{ color: "black", fontSize: "20px", marginTop: "5px" }}
                />
              )}
            </Link>
            <div className="session p-2 text-danger border rounded">
              Session Expired In: <span className="text-dark">{new Date(remainingTime).toLocaleTimeString()}</span>
            </div>
          </div>
          <div>
            <button disabled={isLoading} id="lgOut-btn" onClick={handlelogout} className="btn btn-warning">Logout</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppHeader;
