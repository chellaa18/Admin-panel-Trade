import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { colorArray } from "../../utils/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { axiosApiCall } from "../../helper/axiosApiCall";
import './Dashboard.css'
const Dashboard = () => {
  const [contentCount, setContentCount] = useState([]);
  
  useEffect(() => {
    const getDashboardCount = () => {
      axiosApiCall
        .Get(
          "https://knprkadmnbknd.koinpark.com/admin/dashboard_pending_counts"
        )
        .then((res) => {
          setContentCount(res?.data?.message);
        });
    };

    getDashboardCount();
  }, []);

  
  // console.log(contentCount);
  return (
    <>
      <div className="container-fluid">
        <div id="dash" className="row border">
          <h4 className="p-2">Dashboard</h4>
          {contentCount ? (
            contentCount?.map((con, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-2 column" key={index}>
                <div
                  className="p-4 border rounded"
                  style={{ backgroundColor: colorArray[index] }}
                >
                  <h6 className="text-white">{con?.label}</h6>
                  <div className="d-flex justify-content-between">
                    <div>
                      <span className="text-white fs-6"> {con?.count}</span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faArrowAltCircleRight}
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h6 className="text-center">No data found</h6>
          )}{" "}
        </div>

        <div className="row">
          <div className="container mt-2">
            <p
              className="text-center my-3"
              style={{ fontSize: "24px", color: "rgb(253 166 113)" }}
            >
              Important Note
            </p>
            <div className="row">
              <table className="table">
                <thead className="bg-secondary">
                  <th className="p-3 text-dark ">S.no</th>
                  <th className="p-3 text-dark">Type</th>
                  <th className="p-3 text-dark">Note</th>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 text-dark">S.no</td>
                    <td className="p-3">content 1</td>
                    <td className="p-3">content 1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
