import axios from "axios";
import { STRIPEAPI } from "../apiUrlHandler";

// $Stripe payment  
export const handleFreeSubscription = async () => {
    const response = await axios.post(`${STRIPEAPI}/free-plan`,{},
        {
            withCredentials: true
        }
    )
    return response?.data;
}


export const handleStripeApi = async ( body ) => {
    const response = await axios.post(`${STRIPEAPI}/checkout`, {
            amount: body.amount,
            subscriptionPlan: body.name
        }, {
            withCredentials:true
        })
        return response?.data;
}


export const verifyStripeAPI = async (sessionID) => {
    const response = await axios.post(`${STRIPEAPI}/verify-payment/${sessionID}`, {}, {
        withCredentials: true
    });

    return response?.data;
}