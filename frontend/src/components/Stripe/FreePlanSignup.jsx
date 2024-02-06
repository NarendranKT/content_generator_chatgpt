import React, { useState } from "react";
import Icon from "react-icons-kit";
import { check } from "react-icons-kit/entypo/check";
import { cross } from 'react-icons-kit/entypo/cross'
import { useMutation } from '@tanstack/react-query'
import { handleFreeSubscription } from "../../apis/StripePayment/stripePayment";
import StatusMessage from "../Alerts/StatusMessage";
import { loadStripe } from '@stripe/stripe-js';
import { STRIPEAPI } from "../../apis/apiUrlHandler";

const FreePlanSignup = ({tier, setTier}) => {

  const mutation = useMutation({mutationFn: handleFreeSubscription})
  const [error, setError] = useState(null);

    const handleCancel = () => {
        setTier(null);
    }
  const handleConfirm = () => {
      if (tier.id === 'Free') {
        mutation.mutate();
      } else {
        makePayment(tier.name, tier.amount);
      }
  }
  
    const makePayment = async(name, amount)=>{
        const stripe = await loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

        const body = {
          subscriptionPlan: name,
          amount,
        }
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache': 'no-cache'  
        }
        const response = await fetch(`${STRIPEAPI}/checkout`,{
            method:"POST",
            headers:headers,
            body: JSON.stringify(body),
            credentials: 'include'
        });

        const session = await response.json();
        if(session?.error){
          setError(session?.error);
        }
       
        const result = stripe.redirectToCheckout({
            sessionId:session.id
        });
        
        // console.log(session);
        if(result.error){
            console.log(result.error);
        }
    }

  return (
    <>
        <div className="fixed w-full h-screen flex items-center justify-center backdrop-blur-sm z-50 bg-black/60 text-white tracking-wide ease-in transition-transform duration-300 px-5">
            <div className=" p-5 md:px-8 bg-black/70 flex flex-col rounded-lg max-w-[500px] border border-white/20">
                <div className="flex items-center justify-end md:mb-0 mb-1">
                    <button onClick={handleCancel}><Icon icon={cross} size={30} className="text-right bg-red-600 rounded-full max-w-18"/></button>    
                </div>
                <h1 className="text-[25px] lg:text-[30px] font-bold text-white text-center pb-2 capitalize">confirm your {tier.name} plan</h1>
                <p className="md:text-base text-[14px] text-gray-300 font-medium text-center">Enjoy our {tier.name} plan with {tier.amount}₹ involved. Get started now and upgrade anytime to access more features.</p>
                
                  <div className="flex items-center justify-center">
                    <ul className="mt-2 text-white">
                        {tier.features.map((feature) => (<li className="py-2"> <Icon icon={check} className="flex-none pe-1" size={18} />{feature}</li>))}
                    </ul> 
                  </div> 
                
                <button className="px-4 my-3 py-1.5 hover:bg-blue-700 bg-blue-600 outline-none capitalize rounded-md text-sm" onClick={handleConfirm}>Confirm {tier.name} plan : {tier.price}</button>
            </div>
            
            {!mutation?.isError && !mutation?.error && mutation?.isPending && <StatusMessage type={'loading'} message={"Please wait, Loading..."}/>}
            
            {mutation?.error &&  <StatusMessage type={'error'} message={mutation?.error?.response?.data} path={'/plans'}/>}
            
            {error &&  <StatusMessage type={'error'} message={error} path={'/plans'}/>}
        </div>
    </>
)
};

export default FreePlanSignup;
