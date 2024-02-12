import React, { useState, useEffect } from "react";
import PatternLock from "react-pattern-lock";
import { Link, useNavigate } from "react-router-dom";
import { faRecycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { axiosApiCall } from "../../helper/axiosApiCall";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [pattern, setPattern] = useState([]);
  const [value, setValue] = useState("");
  const [ipAddress, setIPAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    setPattern([]);
  };

  // GETTING CLIENT SYSTEM IP
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIPAddress(data.ip))
      .catch((error) => console.log(error));
  }, []);

  const handlePatternFinish = (newPattern) => {
    // console.log("Pattern completed:", newPattern);
  };
  const onChange = (newPattern) => {
    setPattern(newPattern);
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   if (e.target.password.value === "" || e.target.email.value === "") {
  //     toast.warning("Email and Password required!");
  //     return;
  //   }

  //   let patternNumber = pattern.map((d) => d + 1).join("");
  //   // console.log(patternNumber);
  //   // console.log(e.target.email.value, e.target.password.value, e.target.tfa.value, pattern);
  //   const data = {
  //     email: e.target.email.value,
  //     password: e.target.password.value,
  //     pattern: patternNumber,
  //     tfa_code: value,
  //     ipaddress: ipAddress,
  //   };

  //   // console.log(data);

  //   const res = await axiosApiCall.Post(
  //     "https://knprkadmnbknd.koinpark.com/admin_support/sub_admin_login",
  //     data,
  //     "post"
  //   );

  //   console.log(res);

  //   if (res?.status === false) {
  //     toast.warning(res?.message);
  //     return;
  //   }
  //   // // console.log(res?.data?.token);
  //   localStorage.setItem("LoggedUserToken", res?.token);
  //   // // console.log(pattern.join(""));
  //   if (res?.token) {
  //     toast.success("login Successful!");
  //     setTimeout(() => {
  //       navigate("/admin/dashboard");
  //     }, 2000);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (e.target.password.value === "" || e.target.email.value === "") {
      toast.warning("Email and Password required!");
      return;
    }

    let patternNumber = pattern.map((d) => d + 1).join("");
      // console.log(patternNumber);
      // console.log(e.target.email.value, e.target.password.value, e.target.tfa.value, pattern);
      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
        pattern: patternNumber,
        tfa_code: value,
        ipaddress: ipAddress,
      };

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await axiosApiCall.Post(
        "https://knprkadmnbknd.koinpark.com/admin_support/sub_admin_login",
        data,
        "post"
      );

      console.log(res);

  
      localStorage.setItem("LoggedUserToken", res?.token);

      if (res?.token) {
        toast.success("Login Successful!");
        setTimeout(() => {
          navigate("/admin/dashboard");
          setIsLoading(false);
        }, 2000);
      }

      if (res?.status === false) {
        toast.warning(res?.message);
        setIsLoading(false);
        return;
      }

    } catch (error) {
      console.error("Error during login:", error);
    } 
  };

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    console.log(newValue);
    if (newValue.length <= 6) {
      setValue(newValue);
    }
    if (/[^0-9]/.test(e.target.value)) {
      // alert('Please enter numbers only.');
      setValue("");
      return;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row vh-100">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "black",
            color: "white",
          }}
        >
          <div
            className="col-lg-6 p-5 d-flex justify-content-center align-items-center "
            style={{
              borderStyle: "solid",
              borderWidth: "5px",
              borderImage: "linear-gradient(90deg,#068131,#dda85b) 1",
            }}
          >
            {" "}
            <form
              onSubmit={handleLogin}
              className="d-flex flex-column align-items-center me-4"
            >
              <h2
                className="mb-4"
                style={{ fontWeight: "900px", fontSize: "40px" }}
              >
                Login
              </h2>
              <div className="mb-3 form-group w-100">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="input-group-text bg-secondary"
                    onClick={togglePasswordVisibility}
                    style={{
                      border: "none",
                      borderRadius: "none",
                      backgroundColor: "#A9A9A9",
                    }}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        style={{ color: "black" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ color: "black" }}
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-3 form-group w-100">
                <label>
                  <span style={{ color: "#71797E", fontSize: "14px" }}>
                    TFA code
                  </span>
                </label>
                <br />
                <div className="input-group">
                  <input
                    id="tfa"
                    name="tfa"
                    className="form-control"
                    value={value}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn"
                disabled={isLoading} 
                style={{
                  backgroundImage:
                    "linear-gradient(314deg, #51713a 0%, #000e21 74%)",
                  color: "white",
                  border: "2px solid #007FFF",
                }}
              >
                Sign in
              </button>
            </form>
            <div className="my-2 mt-5" style={{ position: "relative" }}>
              <div className="ms-3">
                <PatternLock
                  width={230}
                  pointSize={10}
                  size={3}
                  path={pattern}
                  onChange={onChange}
                  onFinish={handlePatternFinish}
                  style={{
                    background: "black",
                    borderRadius: "16px",
                    borderStyle: "solid",
                    borderWidth: "5px",
                    borderImage: "linear-gradient(90deg,#068131,#dda85b) 1",
                  }}
                />
              </div>
              {pattern.length !== 0 ? (
                <button
                  className="reset-icon"
                  onClick={handleReset}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    position: "absolute",
                    bottom: "0px",
                    right: "-25px",
                    backgroundColor: "white",
                    padding: "12px",
                    borderRadius: "40px",
                  }}
                >
                  <FontAwesomeIcon
                    className="text-secondary fs-4"
                    icon={faRecycle}
                  />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
