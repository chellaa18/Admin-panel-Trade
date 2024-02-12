import React from "react";
import Live from "./live/Live";
import './LaunchPad.css'

const LaunchPad = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 mt-2">
          <ul class="nav nav-tabs border-0 d-flex justify-content-evenly" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class=" btn w-100 text-dark me-4 fs-4"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="false"
              >
               Upcoming
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class=" btn w-100 active text-dark me-4 fs-4"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="true"
              >
               Live
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="btn w-100 text-dark me-4 fs-4"
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Completed
              </button>
            </li>
          </ul>
          <div class="tab-content mt-3" id="myTabContent">
            <div
              class="tab-pane fade "
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              ...
            </div>
            <div
              class="tab-pane fade show active"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
             <Live/>
            </div>
            <div
              class="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchPad;
