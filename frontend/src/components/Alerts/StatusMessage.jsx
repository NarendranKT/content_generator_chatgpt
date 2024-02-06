import React from "react";
import Icon from "react-icons-kit";
import { spinner7 } from "react-icons-kit/icomoon/spinner7";
import { useNavigate } from "react-router-dom";
import { cross } from 'react-icons-kit/entypo/cross'

const StatusMessage = ({ type, message, path }) => {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(0);
    navigate(path ? path : '/');
  }

    return (
      <>
        <div className="w-full h-screen fixed flex items-center justify-center backdrop-blur-md bg-black/75 z-50 text-white tracking-wide ease-in transition-transform duration-300">
            <div className="p-5 bg-white/20 rounded-lg md:px-14">
                    {type === 'error' ? <>
                        <div className="flex items-center justify-end md:mb-0 mb-1">
                          <button onClick={handleCancel}><Icon icon={cross} size={30} className="text-right bg-red-600 rounded-full max-w-18"/></button>    
                      </div>
                        <h1 className="text-[25px] lg:text-[30px] font-bold text-white text-center pb-4 capitalize">{type}</h1>
                        <p className="md:text-xl text-[14px] text-white font-medium pb-2 text-center">{message}</p>
                        
                        </>
                      
                        :
                        <div className="text-center">
                        <Icon icon={spinner7} size={30} className="animate-spin text-4xl text-white" />
                        <p className="md:text-xl text-[14px] text-white font-medium pb-2 text-center">{message}</p>
                        </div>
                    }
            </div>
        </div>
    </>
  )
};

export default StatusMessage;
