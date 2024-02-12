import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faBook,
  faPlus,
  faPager,
} from "@fortawesome/free-solid-svg-icons";
import BLogo from "../../../assets/transparent-bitcoins-icon-bitcoin-icon-ecommerce-icon-6025919da397b9.0101333416130748456701.png";
import "./ViewEventDetails.css"

const ViewEventDetails = () => {
  const navigate = useNavigate();
  const handleLiveNavigation = () => {
    navigate("/admin/launchpad");
  };

  return (
    <>
      <div className="container">
      <section className="row  mt-4">
          <div class="col-lg-12">
            <div class="card p-5 mb-4" style={{zIndex:"1"}}>
              <div class="row g-0">
                <div class="col-lg-2 col-md-12 mb-4 d-flex align-items-center justify-content-center">
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
                        <button onClick={handleLiveNavigation} className="live-btn btn-success">live</button>
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
                    

                    <div className="col-lg-12 mt-5 d-flex">
                      <Link className="pe-3  text-decoration-none">
                        <FontAwesomeIcon className="me-1" icon={faPlus} />{" "}
                        whislist
                      </Link>

                      <Link className="pe-3 text-decoration-none">
                        <FontAwesomeIcon className="me-1" icon={faPager} />{" "}
                        whitepaper
                      </Link>
                      <Link className=" text-decoration-none">
                        <FontAwesomeIcon className="me-1" icon={faBook} />
                        Terms and Conditon
                      </Link>
                    </div>

                    <div class="row d-flex mt-3">
                      <div
                        className="col-lg-6 border-div"
                        style={{
                          borderTop: "2px solid black",
                          borderRight: "2px solid black",
                        }}
                      >
                        <div class="box-card mt-2">
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
                      <div
                        className="col-lg-6 p-3 d-flex align-items-center border-div"
                        style={{ borderTop: "2px solid black" }}
                      >
                        <h6>Timer</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="row flex-wrap justify-content">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4 ">
            <div className="border">
              <div className="card-body text-center">
                <p>
                  <FontAwesomeIcon
                    className="text-success mt-3"
                    icon={faCircleCheck}
                  />
                </p>

                <small>Schedule Starts</small>
                <br />
                <b className="card-text">
                  2024-01-23 05:00:24 <br /> PM
                </b>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="border">
              <div className="card-body text-center">
                <p>
                  <FontAwesomeIcon
                    className="text-success mt-3"
                    icon={faCircleCheck}
                  />
                </p>
                <small>Schedule Starts</small>
                <br />
                <b className="card-text">
                  2024-01-23 05:00:24 <br /> PM
                </b>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="border">
              <div className="card-body text-center">
                <p>
                  <FontAwesomeIcon
                    className="text-success mt-3"
                    icon={faCircleCheck}
                  />
                </p>
                <small>Schedule Starts</small>
                <br />
                <b className="card-text">
                  2024-01-23 05:00:24 <br /> PM
                </b>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="border">
              <div className="card-body text-center">
                <p>
                  <FontAwesomeIcon
                    className="text-success mt-3"
                    icon={faCircleCheck}
                  />
                </p>
                <small>Schedule Starts</small>
                <br />
                <b className="card-text">
                  2024-01-23 05:00:24 <br /> PM
                </b>
              </div>
            </div>
          </div>
        </section>

        <section className="row mt-2">
          <div className="col-lg-6 col-md-block terms 1">
            <div className="col-lg-12  mb-4">
              <div className="border">
                {" "}
                <div className="p-4 ">
                  <h5>Terms & Conditons</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deserunt consequuntur error, minus harum totam sint soluta.
                    Quas laboriosam accusamus, enim suscipit velit aliquid
                    molestiae saepe odit exercitationem sint ducimus. Quaerat.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deserunt consequuntur error, minus harum totam sint soluta.
                    Quas laboriosam accusamus, enim suscipit velit aliquid
                    molestiae saepe odit exercitationem sint ducimus. Quaerat.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-12  mb-4">
              <div className="border">
                {" "}
                <div className="p-4">
                  <h5>Terms & Conditons</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deserunt consequuntur error, minus harum totam sint soluta.
                    Quas laboriosam accusamus, enim suscipit velit aliquid
                    molestiae saepe odit exercitationem sint ducimus. Quaerat.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deserunt consequuntur error, minus harum totam sint soluta.
                    Quas laboriosam accusamus, enim suscipit velit aliquid
                    molestiae saepe odit exercitationem sint ducimus. Quaerat.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4 activity">
            <div className="border">
              <div className="p-4 activity-rule">
                <h5>Activity Rules</h5>
                <h6>Participating in Subscription</h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis ex qui quas nisi dicta maiores magnam? Vitae itaque
                  officiis consectetur at ratione. In perferendis quia ipsa
                  soluta libero fuga velit?
                </p>

                <h6>Token Distribution</h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis ex qui quas nisi dicta maiores magnam? Vitae itaque
                  officiis consectetur at ratione. In perferendis quia ipsa
                  soluta libero fuga velit?.Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Facilis ex qui quas nisi dicta
                  maiores magnam? Vitae itaque officiis consectetur at ratione.
                  In perferendis quia ipsa soluta libero fuga velit?
                </p>

                <h6>Participating in Subscription</h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis ex qui quas nisi dicta maiores magnam? Vitae itaque
                  officiis consectetur at ratione. In perferendis quia ipsa
                  soluta libero fuga velit?
                </p>

                <h6>Token Distribution</h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis ex qui quas nisi dicta maiores magnam? Vitae itaque
                  officiis consectetur at ratione. In perferendis quia ipsa
                  soluta libero fuga velit?.Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Facilis ex qui quas nisi dicta
                  maiores magnam? Vitae itaque officiis consectetur at ratione.
                  In perferendis quia ipsa soluta libero fuga velit?
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ViewEventDetails;
