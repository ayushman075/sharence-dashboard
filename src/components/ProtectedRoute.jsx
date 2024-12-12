import { useNavigate } from "react-router-dom";
import { useAuthData } from "../context/AuthContext";
import React, { useEffect } from "react";
import { Button } from "antd";




const ProtectedRoute = ({ element }) => {
  const { isSignedIn } = useAuthData();
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };


  return isSignedIn ? element :<div className="flex flex-col items-center justify-center   h-full">
  <div className="text-center">
    {/* Icon or Illustration */}
    <div className="mb-6 h-full align-middle flex justify-center my-auto items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-20 h-20 mx-auto text-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 5.636a9 9 0 11-12.728 0m12.728 0L5.636 18.364"
        />
      </svg>
    </div>

    {/* Message */}
    <h1 className="text-2xl font-bold text-gray-800">
      Access Denied
    </h1>
    <p className="mt-2 text-gray-600">
      Please login to view this page.
    </p>

    {/* Redirect Button */}
    <Button
      onClick={handleRedirect}
      className="mt-6 px-4 py-2  bg-blue-200 font-semibold rounded-lg hover:bg-primary/90"
    >
      Go Back Login
    </Button>
  </div>
</div>;
};

export default ProtectedRoute;
