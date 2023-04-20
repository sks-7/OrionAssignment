import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Homepage';
import Mainpage from '../pages/Mainpage';
import Navbar from '../components/Navbar';
import RequireAuth from '../hoc/RequireAuth';
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/main"
          element={
            <>
              <RequireAuth>
                <Navbar />
                <Mainpage />
              </RequireAuth>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
