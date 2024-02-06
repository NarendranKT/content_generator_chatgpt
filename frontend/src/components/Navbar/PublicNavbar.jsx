import React, {useState} from "react";
import logo from '../../assets/Logo_white.svg'
import { Link, NavLink } from "react-router-dom";
import { Icon } from 'react-icons-kit'
import { navicon } from 'react-icons-kit/fa/navicon'
import {ic_close} from 'react-icons-kit/md/ic_close'
import {arrowRight2} from 'react-icons-kit/icomoon/arrowRight2'

const PublicNavbar = () => {
    const hovertext = 'hover:bg-white/20 rounded-full font-medium transition-all ease-in-out duration-300';
    const [isExpanded, setIsExpanded] = useState(false);
    const handletoggleButton = () => {
        setIsExpanded(!isExpanded);
    }

    return (
    <>
    <div className="bg-gray-900/0 w-full transition-all duration-400 ease-in-out fixed z-30">
        <nav className=" md:flex justify-between items-center h-[70px] bg-black/5 border-b border-white/30 backdrop-blur-sm rounded-b-3xl text-white fixed w-full hidden shadow-inner">
            <img className=" h-24 object-contain " src={logo} alt="logo" />
            <div className="">
                <ul className="flex font-medium">
                    <li className={`px-5 capitalize`}><NavLink to='/'>home</NavLink></li>
                    <li className="px-5 capitalize"><NavLink to='/features'>features</NavLink></li>
                    <li className="px-5 capitalize"><NavLink to='/plans'>pricing</NavLink></li>
                    <li className="px-5 capitalize"><NavLink to='/about'>about</NavLink></li>
                </ul>
            </div>
            <Link className="me-5 capitalize hover:bg-white/15 hover:font-normal border-[0.5px] p-2 rounded-full px-3 bg-white/10 font-thin text-sm" to='/login'>Login <Icon icon={arrowRight2}></Icon></Link>
        </nav>
        
        <nav className="md:hidden bg-black/25 border-b border-white/50 backdrop-blur-sm  text-white fixed w-full cursor-pointer h-[70px] flex items-center justify-between shadow-inner text-sm">
            <img className=" h-24 object-contain" src={logo} alt="logo" />
            <div>
                <Link className="me-5 capitalize hover:bg-white/15 hover:font-normal border-[0.5px] py-0.5 rounded-full px-3 bg-white/10 font-thin text-sm">Login <Icon icon={arrowRight2} size={15}></Icon></Link>
                <button onClick={handletoggleButton} className="pe-7">
                    {!isExpanded ?
                        <Icon icon={navicon} size={20} ></Icon>
                        :
                        <Icon icon={ic_close} size={20} className="rounded-full"></Icon>
                    }
                </button>
            </div>
            <nav className={`${isExpanded? '-translate-x-0 ease-out duration-500' : 'translate-x-full'} transition-transform w-full top-20 left-0 absolute duration-200 ease-in px-2`}>
                    {isExpanded && 
                        <div className={`absoulte z-20 left-0 top-0 w-full bg-black/80 border-[0.5px] border-white/30 flex flex-row p-5 px-6 backdrop-blur-xl rounded-xl `}>
                            <ul className={`flex flex-col items-end w-full`}>
                                <li>
                                    <NavLink className={`p-1 px-2 transition-colors  ${hovertext}`} onClick={handletoggleButton} to='/'>Home</NavLink>
                                </li>
                                <li className="mt-5">
                                    <NavLink className={`p-1 px-2 transition-colors  ${hovertext}`} onClick={handletoggleButton} to='/features'>Features</NavLink>
                                </li>
                                <li className="mt-5">
                                    <NavLink className={`p-1 px-2 transition-colors  ${hovertext}`} onClick={handletoggleButton} to='/plans'>Pricing</NavLink>
                                </li>
                                <li className="mt-5">
                                    <NavLink className={`p-1 px-2 transition-colors  ${hovertext}`} onClick={handletoggleButton} to='/about'>About</NavLink>
                                </li>
                                
                            </ul>
                        </div>
                    }
                    </nav>
        </nav>
    </div>
    </>
    )
};

export default PublicNavbar;
