import React, {useState} from "react";
import logo from '../../assets/Logo_white.svg'
import { Link, NavLink } from "react-router-dom";
import { Icon } from 'react-icons-kit'
import {plus} from 'react-icons-kit/fa/plus'
import { ic_logout } from 'react-icons-kit/md/ic_logout'
import {ic_close} from 'react-icons-kit/md/ic_close'
import { navicon } from 'react-icons-kit/fa/navicon'
import Confirmation from "../Alerts/Confirmation";



const PrivateNavbar = () => {

     const hovertext = 'hover:bg-white/30 rounded-md font-medium transition-all ease-in-out duration-300';
    const [isExpanded, setIsExpanded] = useState(false);
    const [confirmLogout, setconfirmLogout] = useState(false);

    const handletoggleButton = () => {
        setIsExpanded(!isExpanded);
    }

    
    const handleLogout = () => {
        setconfirmLogout(true);
    }

    return (
    <>
    <div className="w-full transition-all duration-400 ease-in-out fixed z-30">
        <nav className="md:flex hidden justify-between items-center h-[70px] bg-black/10 border-b border-white/30 backdrop-blur-sm rounded-b-3xl text-white fixed w-full">            
            <div>
                <ul className="flex font-medium items-center outline-none">
                    <li className="pr-7 capitalize"><Link to='/'><img className=" h-24 object-contain " src={logo} alt="logo" /></Link></li>
                    <li className="pr-7 capitalize"><NavLink to='/'>home</NavLink></li>
                    <li className="pr-7 capitalize"><NavLink to='/dashboard'>dashboard</NavLink></li>
                    <li className="capitalize"><NavLink to='/plans'>pricing</NavLink></li>
                </ul>
            </div>
            
            <div className="flex flex-row items-center">
                <div class="relative inline-flex group my-2 mr-4">
                    <div
                        className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-l from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-[5px] group-hover:opacity-70 group-hover:-inset-1 group-hover:duration-200 animate-pulse">
                    </div>
                    <Link className="relative inline-flex items-center justify-center px-4 py-1 font-semibold text-white transition-all duration-200 bg-gray-800/80 font-pj rounded-full focus:outline-none backdrop-blur-3xl  hover:bg-gray-800/85 border-[0.5px]"
                    to='/generate-content'><Icon icon={plus} size={15} className="pe-1"/> Generate content
                    </Link>
                </div>        
            
                <button className="me-5 capitalize hover:bg-white/15 p-1 rounded-full px-3 bg-white/25 flex justify-between items-center ml-3" onClick={handleLogout}>Logout <Icon icon={ic_logout} className="ps-2" size={20}/></button>
            </div>
        </nav>
        
        <nav className="md:hidden bg-black/5 border-b border-white/50 backdrop-blur-sm text-white fixed w-full cursor-pointer h-[70px] flex items-center justify-between">
            <img className=" h-24 object-contain" src={logo} alt="logo" />
            <button onClick={handletoggleButton} className="pe-7">
                {!isExpanded ?
                    <Icon icon={navicon} size={28} ></Icon>
                    :
                    <Icon icon={ic_close} size={28} className="rounded-full"></Icon>
                }
            </button>
            <aside className={`${isExpanded? '-translate-x-0 ease-out duration-500' : 'translate-x-full'} transition-transform w-full top-20 left-0 absolute duration-200 ease-in px-2 text-sm`}>
                    {isExpanded && 
                        <div className={`absoulte z-20 left-0 top-0 w-full bg-black/80 border-[0.5px] border-white/30 flex flex-row p-5 px-6 backdrop-blur-xl rounded-xl`}>
                            <ul className={`flex flex-col items-end w-full`}>
                                <li>
                                        <NavLink className={'p-1 px-2 capitalize'} onClick={handletoggleButton} to='/'>home</NavLink>
                                </li>
                                <li className="mt-5">
                                        <NavLink className={`p-1 px-2 transition-colors  ${hovertext}`} onClick={handletoggleButton} to='/dashboard'>Dashboard</NavLink>
                                </li>
                                <li className="mt-5">
                                    <NavLink className={`p-1 px-2 transition-colors  ${hovertext}`} onClick={handletoggleButton} to='/plans'>Pricing</NavLink>
                                </li>
                                
                                <li>
                                    <div class="relative inline-flex group mt-3 ">
                                        <div
                                            className="absolute transitiona-all duration-1000 opacity-50 -inset-px bg-gradient-to-l from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-[5px] group-hover:opacity-70 group-hover:-inset-1 group-hover:duration-200 animate-pulse">
                                        </div>
                                        <Link className="relative inline-flex items-center justify-center px-4 py-1 font-medium text-white transition-all duration-200 bg-gray-800/70 font-pj rounded-full focus:outline-none backdrop-blur-3xl  hover:bg-gray-800/85 border-[0.5px]"
                                        to='/generate-content' onClick={handletoggleButton}><Icon icon={plus} size={15} className="pe-1"/> Generate content
                                        </Link>
                                    </div>
                                </li>
                                
                                <li className="mt-3">
                                    <Link className=" capitalize hover:bg-white/10 p-1 rounded-full px-2 bg-white/20 flex justify-between items-center" onClick={handleLogout}>Logout <Icon icon={ic_logout} className="ps-2 " size={20}/></Link>
                                </li>
                            </ul>
                        </div>
                    }
                    </aside>
        </nav>
        
    </div>
        {
                confirmLogout && <Confirmation confirmLogout={ setconfirmLogout } />
        }
    
    </>
  );
};

export default PrivateNavbar;
