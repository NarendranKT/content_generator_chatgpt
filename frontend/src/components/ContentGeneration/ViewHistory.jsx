import React from "react";
import { profileAPI } from "../../apis/Users/userApi";
import { useQuery } from '@tanstack/react-query'
import StatusMessage from "../Alerts/StatusMessage";
import Markdown from 'react-markdown'
import { Link } from "react-router-dom";
import Icon from "react-icons-kit";
import { arrowRight2 } from "react-icons-kit/icomoon/arrowRight2";


const ViewHistory = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryFn: profileAPI,
        queryKey: ["profile"],
    });

    return (
    <>
        {isLoading && !isError && <StatusMessage type='loading' message='Loading, Please wait!' />}
      
        {((!isLoading && isError)|| false) && <StatusMessage type='error' message={error?.response?.data?.message} path={'/'} />}
        
        {!isLoading && !isError && data && 
        <div className="bg-gray-900 min-h-screen w-full pt-20 text-white flex flex-col text-center">
            <h1 className="md:text-5xl text-4xl font-bold p-1 pt-3 tracking-wider">History</h1>
            <div className="px-5 md:px-14 w-full py-4 pt-6">
              <div className="w-full bg-white/5 border border-white/15 text-white p-5 rounded-md">
                {((data?.user?.history?.length <= 0) || (data?.user?.payments.subscriptionPlan === 'Free' || data.user.payments.subscriptionPlan === 'Basic')) ? (
                    <h1 className = "p-4 text-center text-red-500 md:font-medium md:text-lg">{data?.user?.history?.length <= 0? "No history found":"Upgrade your plan to basic or more to view history!"}</h1>
                ) : (
                    <ul className="mt-6">
                        {/* Example History Item */}
                        {data?.user?.history?.map((history) => {
                        return (
                            <li className="py-4 px-5 transition duration-150 my-3 rounded-md ease-in-out border border-white/20 hover:border-white/60" key={history._id}>
                            <div className="flex flex-col sm:flex-row justify-between">
                                <div className="mb-2 sm:mb-0">
                                <p className="md:text-[18px] text-left text-white">
                                    <Markdown className='font-light'>{`${history?.content.slice(0,100)}...`}</Markdown>
                                </p>
                                
                                </div>
                                <div className="flex items-center flex-col pt-2 md:pt-0">
                                    <Link className="rounded-full p-1 bg-white/15 px-2 hover:bg-black/10 border border-white/15 md:text-base font-light text-sm" to={`/history/${history._id}`}>Read more <Icon icon={arrowRight2} /></Link>
                                    <p className="text-xs text-white/70 mt-3">
                                    {new Date(history?.createdAt).toDateString()}
                                </p>
                                </div>
                            </div>
                            </li>
                        );
                        })}
                    </ul>
                )}
              </div>
            </div>
        </div>
        }
    </>
)
};

export default ViewHistory;
