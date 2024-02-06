import { Link } from "react-router-dom";
import { profileAPI } from "../../apis/Users/userApi";
import { useQuery } from '@tanstack/react-query'
import StatusMessage from "../Alerts/StatusMessage";


const Dashboard = () => {
  // get the user profile
  const { isLoading, isError, data, error } = useQuery({
    queryFn: profileAPI,
    queryKey: ["profile"],
      });

  //dsiplay loading
 
  return (
      <>
      {isLoading && !isError && <StatusMessage type='loading' message='Loading, Please wait!' />}
      
      {!isLoading && isError && <StatusMessage type='error' message={error?.response?.data?.message} path={'/'} />}
      
      {
        !isLoading && !isError && data && 
        <div className="w-full min-h-screen bg-gray-900 p-4 font-poppins pt-20">
            <div className="text-center mb-2">
              <h1 className="capitalize text-blue-600 text-4xl md:text-6xl font-bold">user dashboard</h1>     
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white p-5 justify-center">
              <div className="bg-white/5 border border-white/15 rounded-md p-5 backdrop-blur-sm">
                <h2 className="capitalize md:text-3xl text-2xl font-semibold tracking-wide">profile information</h2>
                <div className=" px-3 py-4">
                  <label htmlFor="name" className="capitalize font-medium md:text-xl text-lg text-white">name</label>
                  <p id="name" className="border border-gray-500 rounded-md p-2 mt-2 capitalize ps-5 md:text-lg text-base font-light overflow-auto">{data?.user?.username}</p>
                </div>
                <div className=" px-3 pb-4">
                  <label htmlFor="name" className="capitalize font-medium md:text-xl text-lg text-white">email</label>
                  <p id="name" className="border border-gray-500 rounded-md p-2 mt-2 ps-5 md:text-lg text-base font-light overflow-auto">{data?.user?.email}</p>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/15 rounded-md p-5 w-full">
                <h2 className="capitalize md:text-3xl text-2xl font-semibold tracking-wide">credit usage</h2>
                
                <table className="w-full mt-5 text-left tracking-wide">
                  <tr>
                    <th className="py-4 font-medium md:text-lg text-base capitalize">monthly credit </th>
                    <td className="py-4 capitalize font-light text-base items-center">{data?.user?.monthlyRequestCount}</td>
                  </tr>
                  <tr>
                    <th className="pb-4 font-medium md:text-lg text-base capitalize">credits used</th>
                    <td className="pb-4 capitalize font-light  text-base items-center">{data?.user?.apiRequestCount}</td>
                  </tr>
                  <tr>
                    <th className="pb-4 font-medium md:text-lg text-base capitalize">credits remaining</th>
                <td className="pb-4 capitalize font-light  text-base">{data?.user?.monthlyRequestCount - data?.user?.apiRequestCount }</td>
                  </tr>
                  <tr>
                    <th className=" font-medium md:text-lg text-base capitalize">next billing date</th>
                    <td className="capitalize font-light md:text-base text-base">{data?.user?.nextBillingDate
                  ? new Date(data?.user?.nextBillingDate).toDateString()
                  : "No Billing date"}</td>
                  </tr>
                </table>
              </div>
              
              <div className="bg-white/5 border border-white/15 rounded-md p-5 ">
                <h2 className="capitalize md:text-3xl text-2xl font-semibold tracking-wide mb-4">payments & plans</h2>
                <div className=" px-3">
                  <label htmlFor="plan" className="font-medium capitalize md:text-lg text-base">current plan : </label>
                  <p className="inline ps-4 font-thin md:text-lg text-base capitalize">{data?.user?.subscriptionPlan}</p>
                  
                  {data?.user?.subscriptionPlan === "Trial" && (
                <p className="border border-gray-500 rounded-md p-2 mt-2 capitalize ps-5 md:text-lg font-light mb-5">
                  <span className="font-medium pe-5">Trail : </span>1000 monthly request
                </p>
              )}

              {data?.user?.subscriptionPlan === "Free" && (
                <p className="border border-gray-500 rounded-md p-2 mt-2 capitalize ps-5 md:text-lg font-light mb-5">
                  <span className="font-medium pe-5">Free : </span>5 monthly request
                </p>
              )}
              {data?.user?.subscriptionPlan === "Basic" && (
                <p className="border border-gray-500 rounded-md p-2 mt-2 capitalize ps-5 md:text-lg font-light mb-5">
                  <span className="font-medium pe-5">basic : </span>50 monthly request
                </p>
              )}
              {data?.user?.subscriptionPlan === "Premium" && (
                <p className="border border-gray-500 rounded-md p-2 mt-2 capitalize ps-5 md:text-lg font-light mb-5">
                  <span className="font-medium pe-5">premium : </span>100 monthly request
                </p>
              )}
                  

                  <div class="relative inline-flex group my-2">
                    <div
                        className="absolute transitiona-all duration-1000 opacity-60 -inset-px bg-gradient-to-l from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-[10px] group-hover:opacity-90 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                    </div>
                    <Link className="relative inline-flex items-center justify-center px-5 py-2 font-medium text-white transition-all duration-200 bg-gray-800/90 font-pj rounded-md focus:outline-none backdrop-blur-md"
                        >Upgrade plan
                    </Link>
                  </div>  
                
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/15 rounded-md p-5">
                <h2 className="capitalize md:text-3xl text-2xl font-semibold tracking-wide">Trail information</h2>
                
                <div className="px-3 py-4">
                  <label htmlFor="plan" className=" block font-medium capitalize md:text-lg text-base">trail status : <span className=" ps-4 font-thin md:text-lg text-base capitalize"> {data?.user?.trailActive? "Active" : "Inactive"}</span></label>
                  
              <label htmlFor="plan" className="block pb-6 font-medium capitalize md:text-lg text-base pt-6">expires on : <span className=" ps-4 font-thin md:text-lg text-base capitalize"> {new Date(data?.user?.trailExpires).toDateString()}</span></label>
                  
                  <div class="relative inline-flex group">
                    <div
                        className="absolute transitiona-all duration-1000 opacity-50 -inset-px bg-gradient-to-l from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-[10px] group-hover:opacity-90 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                    </div>
                    <Link className="relative inline-flex items-center justify-center px-5 py-2 font-medium text-white transition-all duration-200 bg-gray-800/90 font-pj rounded-md focus:outline-none backdrop-blur-md"
                        >Upgrade to premium
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-5 w-full ">
              <div className="w-full bg-white/5 border border-white/15 text-white p-5 rounded-md">
                <h1 className="capitalize md:text-3xl text-2xl font-semibold">payment history</h1>
                {data?.user?.payments?.length > 0 ? (
              <ul className=" mt-6">
                {/* Example History Item */}
                {data?.user?.payments?.map((payment) => {
                  return (
                    <li className="py-4 hover:bg-white/5 px-5 transition duration-150 my-3 rounded-md ease-in-out border border-white/20 hover:border-white/40">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="mb-2 sm:mb-0">
                          <p className="text-[18px] font-medium text-green-500">
                            {payment?.subscriptionPlan}
                          </p>
                          <p className="text-xs text-white">
                            {new Date(payment?.createdAt).toDateString()}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p
                            className={`text-sm fonrt-semibold ${
                              payment?.status === "success"
                                ? "text-green-500"
                                : "text-organge-500"
                            }`}
                          >
                            {payment?.status}
                          </p>
                          <p className="text-sm text-white ml-4">
                            $ {payment?.amount}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <h1 className="p-4 text-center text-red-500 font-medium text-lg">No Payment History</h1>
            )}
              </div>
            </div>
        </div>
      }
      
      </>
    );
};

export default Dashboard;