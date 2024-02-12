import logo from "./logo.svg";
import "./App.css";
import DefaultLayout from "./layout/DefaultLayout";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./auth/login/Login";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
          
              <DefaultLayout />
           
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
