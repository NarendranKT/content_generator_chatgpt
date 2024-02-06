import React from "react";
import Icon from "react-icons-kit";
import { spinner7 } from 'react-icons-kit/icomoon/spinner7'


const AuthCheckingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-center">
      <Icon icon={spinner7} size={30} className="animate-spin text-4xl text-blue-500" />
      <p className="mt-4 text-base md:text-lg text-gray-200">
        Checking authentication status, please wait...
      </p>
    </div>
  );
};

export default AuthCheckingComponent;