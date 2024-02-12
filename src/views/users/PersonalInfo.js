import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosApiCall } from "../../helper/axiosApiCall";
import moment from "moment";

const PersonalInfo = () => {
  const [userDetail, setUserDetail] = useState({});

  const params = useParams();
  const userId = params.id
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosApiCall.Get(
          `https://knprkadmnbknd.koinpark.com/admin/user_view/${userId}`
        );
        setUserDetail(res?.data?.data?.userDetails);
      } catch (error) {
        return error;
      }
    };

    fetchUser();
  }, []);


  console.log(userDetail);
  return (
    <>
      <div className="container">
        <div className="row p-4">
          <h6>Personal Information</h6>
          <div className="col-lg-6">
            <div class="card">
              <ul class="list-group w-100">
                <li class="list-group-item p-3 d-flex">
                  <div className="col-sm-6">First Name</div>
                  <div className="col-sm-6">{userDetail?.first_name}</div>
                </li>
                <li class="list-group-item p-3 d-flex">
                  <div className="col-sm-6">Last Name</div>
                  <div className="col-sm-6">{userDetail?.last_name}</div>
                </li>
                <li class="list-group-item p-3 d-flex">
                  <div className="col-sm-6">Profile Name</div>
                  <div className="col-sm-6">{userDetail?.username}</div>
                </li>
                <li class="list-group-item p-3 d-flex">
                  <div className="col-sm-6">Email</div>
                  <div className="col-sm-6">{userDetail?.email}</div>
                </li>
                <li class="list-group-item p-3 d-flex">
                  <div className="col-sm-6">Mobile</div>
                  <div className="col-sm-6">{userDetail?.mobile}</div>
                </li>
                <li class="list-group-item p-3 d-flex">
                  <div className="col-sm-6">Otp Send Count</div>
                  <div className="col-sm-6">{userDetail?.reg_otp_count}</div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-6">
            <div class="card">
              <ul class="list-group w-100">
                <li class="list-group-item p-3 d-flex">
                  <div className="col-sm-6">Created At</div>
                  <div className="col-sm-6">{userDetail?.created_at ? moment
                                .utc(userDetail?.created_at)
                                .format("YYYY-MM-DD HH:mm:ss"): ""}</div>
                </li>
                <li class="list-group-item p-3 d-flex">
                  <div className="col-sm-6">Status</div>
                  <div className="col-sm-6">
                    <span
                      className={
                        userDetail?.status
                          ? "bg-success text-white col-sm-6 p-1 rounded text-sm-start"
                          : "col-sm-6"
                      }
                    >
                      {userDetail?.status}
                    </span>{" "}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
