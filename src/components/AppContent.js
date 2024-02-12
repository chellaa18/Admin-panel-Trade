import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";

const AppContent = ({ isSidebarOpen }) => {
  return (
    <div style={{ marginLeft:isSidebarOpen ? "250px" : 0, marginTop: "100px", zIndex: 0 }}>
      <Suspense>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
        </Routes>
      </Suspense>
    </div>
  );
};

export default AppContent;
