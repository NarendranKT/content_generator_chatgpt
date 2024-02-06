import { useMutation } from "@tanstack/react-query";
import React from "react";
import { logoutAPI } from "../../apis/Users/userApi";
import { useAuth } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Confirmation = (props) => {
    const mutation = useMutation({mutationFn:logoutAPI})
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        mutation.mutate();
        logout();
        navigate('/login');
    }
    
    const { confirmLogout } = props;
    const handleCancel = () => {
        confirmLogout(false)
    }
return (
    
    <>
        <div className="w-full h-screen fixed flex items-center justify-center backdrop-blur-md bg-black/35 z-50 text-white tracking-wide ease-in transition-transform duration-300">
            <div className="p-5 bg-white/70 rounded-lg md:px-14">
                <h1 className="text-[25px] lg:text-[30px] font-bold text-gray-900 text-center pb-4 capitalize">confirm Logout!</h1>
                <p className="md:text-xl text-[14px] text-gray-900 font-medium pb-2 text-center">You will be returned to login screen</p>
                <ul className="flex items-center justify-center py-4 font-base gap-4">
                    <li><button className="px-4 py-1 hover:bg-gray-800 bg-gray-900 border border-white/25 rounded-md md:text-lg text-base" onClick={handleLogout}>Logout</button></li>
                    <li><button className="px-4 py-1 hover:bg-gray-800 bg-gray-900 border border-white/25 rounded-md md:text-lg text-base" onClick={handleCancel}>Cancel</button></li>
                </ul>
            </div>
        </div>
    </>
)
};

export default Confirmation;
