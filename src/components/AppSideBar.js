import React from "react";
import { Link, useLocation } from "react-router-dom";
import _nav from "../_nav";
import "./css/Sidebar.css";

const AppSideBar = ({ isSidebarOpen }) => {
  const location = useLocation();

  return (
    <div className="container-fluid">
      <div className="row px-0">
        <div
          className="col-lg-12 d-flex"
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
        >
          <nav
            id="sidebar"
            className={`col-lg-3 d-md-block bg-dark sidebar ${
              isSidebarOpen ? "open" : "closed"
            }`}
            style={{
              width: isSidebarOpen ? "250px" : "0px",
              overflowX: isSidebarOpen ? "visible" : "hidden",
            }}
          >
            <div className="position-sticky mt-3">
              <h4 className="text-white text-center my-4">
                <Link className="text-decoration-none text-white">Admin</Link>
              </h4>
              <ul className="nav flex-column p-3">
                {_nav.map((item, index) => (
                  <li key={index}>
                    {item.children ? (
                      <>
                        <span className="text-white" style={{display:"block", marginTop:"20px",marginBottom:"15px"}}>{item.name}</span>
                        {item.children.map((childItem, childIndex) => (
                          <div
                            key={childIndex}
                            className={`d-flex px-2 py-2 ${
                              location.pathname === childItem.to
                                ? "active"
                                : ""
                            }`}
                          >
                            <Link
                              className={`fs-6 text-center `}
                              style={{ paddingTop: "3px" }}
                            >
                              {childItem.icon}
                            </Link>
                            <Link
                              className="text-decoration-none text-white fs-5"
                              to={childItem.to}
                            >
                              {childItem.name}
                            </Link>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div
                        className={`d-flex px-2 py-2 ${
                          location.pathname === item.to ? "active" : ""
                        }`}
                      >
                        <Link
                          className={`fs-6 text-center `}
                          style={{ paddingTop: "3px" }}
                        >
                          {item.icon}
                        </Link>
                        <Link
                          className="text-decoration-none text-white fs-5"
                          to={item.to}
                        >
                          {item.name}
                        </Link>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AppSideBar;

