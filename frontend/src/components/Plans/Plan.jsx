import React, { useState } from "react";
import Icon from "react-icons-kit";
import { check } from 'react-icons-kit/entypo/check'
import FreePlanSignup from "../Stripe/FreePlanSignup";


const tiers = [
  {
    name: "Free",
    id: "Free",
    href: "checkout",
    price: "₹0.00/month",
    amount: '0',
    description: "The essentials to provide your best work for clients.",
    features: ["5 Credits", "1 User", "Basic Support"],
    mostPopular: false,
  },

  {
    name: "Basic",
    id: "Basic",
    href: "checkout",
    price: "₹20/month",
    amount: '20',
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "50 Credits",
      "5 Users",
      "Priority Support",
      "Content generation history",
    ],
    mostPopular: true,
  },
  {
    name: "Premium",
    id: "Premium",
    href: "checkout",
    price: "₹50/month",
    amount: '50',
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "100 Credits",
      "10 Users",
      "Priority Support",
      "Content generation history",
    ],
    mostPopular: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



const Plan = () => {
    const [tier , setTier] = useState(null);
    const handlePayment = (plan) => {
        console.log(plan);
        setTier(plan)
    }

  return (
    <>
        <div className="min-h-screen bg-gray-900 absolute text-white sm:px-0 px-3 text-center w-full">
            <div className="flex flex-col items-center~ justify-center pb-6 pt-[70px]">
                <h1 className="md:text-4xl text-xl text-center pt-3 md:font-bold font-semibold tracking-wide">
                    Pricing plans for teams of&nbsp;all&nbsp;sizes      
                </h1>
                <p className="pt-3 text-white/80 font-extralight md:text-base text-sm mx-auto max-w-2xl tracking-wide ">
                    <span className="leading-relaxed">Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.</span>
                </p>
                
                <div className="pt-4 gap-6 text-left flex flex-row flex-wrap justify-center flex-auto  px-0.5">
                    
                {tiers.map((tier)=>(
                    <div className={classNames(tier.mostPopular? "border-2 border-indigo-500 bg-indigo-600/15 p-5 md:p-9 min-w-[200] max-md:w-[210px] max-sm:w-[260px] max-md:text-sm max-w-[400px] rounded-xl md:rounded-3xl":"border border-indigo-500/30 bg-indigo-600/5 p-5 md:p-9 rounded-xl md:rounded-3xl min-w-[150] max-md:w-[210px] max-w-[400px] max-md:text-sm max-sm:w-[260px]")} key={tier.id}>
                        <div >
                            <div className="flex justify-between">
                                <h3 className="capitalize font-semibold text-lg ">{tier.name}</h3>

                                {tier.mostPopular ? (<h1 className="rounded-full bg-indigo-500/90 px-2.5 py-1 text-center text-xs font-semibold leading-5 text-white">Most popular</h1>) : null
                                }
                            </div>
                            <p className="mt-6 leading-6 text-gray-300">{tier.description}</p>
                            
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="lg:text-4xl text-2xl font-bold tracking-tight text-white">
                                {tier.price}
                                </span>
                            </p>
                            
                            <button className={classNames(tier.mostPopular?"hover:bg-indigo-600/90 bg-indigo-600 font-medium rounded-md py-2 w-full mt-8":"hover:bg-white/10 bg-white/15 font-medium rounded-md py-2 w-full mt-8")} onClick={(e)=>(handlePayment(tier))}>
                                Buy plan
                            </button>
                            
                            <ul className="mt-8">
                                {tier.features.map((feature) => (<li className="py-2"> <Icon icon={check} className="flex-none pe-1" size={18} />{feature}</li>))}
                            </ul>
                        </div>
                    </div>
                ))}
                </div>  
                
              </div>
        </div>
        <div className="min-h-screen w-full">
            {
                tier && 
                <FreePlanSignup tier = {tier} setTier = {setTier}/>
            }
        </div>
    </>
  );
};

export default Plan;
