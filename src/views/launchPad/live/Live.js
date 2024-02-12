import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import BLogo from "../../../assets/transparent-bitcoins-icon-bitcoin-icon-ecommerce-icon-6025919da397b9.0101333416130748456701.png";
const Live = () => {
   const navigate = useNavigate()
    const handleEventNavigation = () =>{
        navigate('/admin/viewevent')
    }

  return (
    <div className="container">
      <div className="row d-flex justify-content center">
        <div className="col-lg-12 mt-2 ">
          <div class="card p-3 mb-3">
            <div class="row g-0">
              <div class="col-md-2 d-flex align-items-center justify-content-center">
                <img
                  src={BLogo}
                  class="card-img"
                  alt="..."
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              </div>
              <div class="col-md-10">
                <div class="">
                <div className="row d-flex justify-content-between">
                      <div className="d-flex col-lg-6 my-2">
                        <h4 className="fs-2">BST COIN</h4>{" "}
                        <small className="fs-6 ms-3">BSTC</small>
                      </div>
                      <div className="col-lg-6 my-2 ">
                        <button className="live-btn btn-success">live</button>
                      </div>
                    </div>
                    <div className="col-lg-12 mt-2">
                      <small class="card-text">
                        Bst Coin is a utitlity token poweing the blue Sapphire
                        ecosystem.which aims to encompass various block-chain
                        based projects across diversed sectors. It is backed by
                        precious gemstones and has a wide range...
                      </small>
                    </div>
                    

                  <div className="col-lg-12 mt-5 ">
                    <div class="card box-card">
                      <ul class="list-group border-none w-100">
                        <li class="list-group-item p-3 d-flex">
                          <div className="col-sm-6">Today Supply</div>
                          <div className="col-sm-6">
                            <span className="text-success">10,000</span>
                          </div>
                        </li>
                        <li class="list-group-item p-3 d-flex">
                          <div className="col-sm-6">Price</div>
                          <div className="col-sm-6">0.4 USDT</div>
                        </li>
                        <li class="list-group-item p-3 d-flex">
                          <div className="col-sm-6">Launch Date</div>
                          <div className="col-sm-6">jan 24 2024</div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <hr />

                  <div className="col-lg-12">
                    <button className="float-end btn btn-link" onClick={handleEventNavigation}>
                      View Event Details{" "}
                      <FontAwesomeIcon
                        className="ms-4"
                        icon={faArrowUpRightFromSquare}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;




