const asyncHandler = require('express-async-handler');
const { STRIPE_KEY } = require('../configs/envConfig');
const { default: Stripe } = require('stripe');
const {nextBillingDate} = require('../utils/calculateNextBillingDate');
const { shouldRenewPlan } = require('../utils/shouldRenewPlan');
const User = require('../models/User');
const Payment = require('../models/Payment');
const mongoose = require('mongoose');
const stripe = require('stripe')(`${STRIPE_KEY}`);

// $Stripe Payment
const stripePayment = asyncHandler(async (req, res) => {
    const { amount, subscriptionPlan } = req.body;

    
    // console.log(am*100);
    // $Get the user
    const user = req?.user;
    try {
        if (await shouldRenewPlan(user)) {
            const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: subscriptionPlan
                    },
                    unit_amount: amount * 100,
                    
                },
                quantity: 1,
            }],metadata: {
                userId: user?._id.toString(),
                userEmail: user?.email,
                subscriptionPlan
            },
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: 'http://localhost:3000/cancel'
            })
            
            console.log(session);
            res.json( {id: session.id})
        } else {
            throw new Error('Subscription renewal not due yet')
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

//  try {
//         Stripe.paymentIntent
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: Number(amount) * 100,
//             currency: 'usd',
//             description:'dummy payments',
//             // add some data the meta data object
//             metadata: {
//                 userId: user?._id.toString(),
//                 userEmail: user?.email,
//                 subscriptionPlan
//             }
//         });

//         // Send the response
//         res.json({
//             clientSecret: paymentIntent?.client_secret,
//             paymentId: paymentIntent.id,
//             metadata: paymentIntent.metadata,
//         })
//     } catch (error) {
//         res.status(500).json({error: error})
//     }



// $Verify Payment
const verifyPayment = asyncHandler(async (req, res) => {
    const { sessionId } = req.params;
    try {

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const user = req?.user;
        console.log("session");

        const metadata = session?.metadata;
            const subscriptionPlan = metadata?.subscriptionPlan;
            const userEmail = metadata?.userEmail;
            const userId = metadata?.userId;
            
            // $Check if there is user or not
            const userFound = await User.findById(userId);
            if (!userFound) {
                return res.status(404).json({
                    status: 'false',
                    message: "User not found"
                })
            }
            const amount = session?.amount_total / 100;
            const currency = session?.currency;
            const paymentId = session?.payment_intent;

            // $Creating the payment
            const newPayment = await Payment.create({
                user: userId,
                email: userEmail,
                subscriptionPlan,
                amount,
                currency,
                status: "success",
                reference: paymentId,
            })

            // $Update the user according to the subscription plan
            if (subscriptionPlan === 'Basic') {
                const updatedUser = await User.findByIdAndUpdate(userId, {
                    trailPeriod: 0,
                    nextBillingDate: await nextBillingDate(),
                    apiRequestCount: 0,
                    monthlyRequestCount: 65,
                    subscriptionPlan: "Basic",
                    $addToSet: {payments:newPayment?._id}
                })

                res.json({
                    status: true,
                    message: "Payment verified, user updated successfully",
                    updatedUser
                })

            }else if (subscriptionPlan === 'Premium') {
                const updatedUser = await User.findByIdAndUpdate(userId, {
                    trailPeriod: 0,
                    nextBillingDate: await nextBillingDate(),
                    apiRequestCount: 0,
                    monthlyRequestCount: 130,
                    subscriptionPlan: "Premium",
                    $addToSet: {payments:newPayment?._id}
                })
                res.json({
                    status: true,
                    message: "Payment verified, user updated successfully",
                    updatedUser
                })
            }

    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
})    

// $Free Subscription
const handleFreeSubscription = asyncHandler(async (req, res) => {
    
    // > Check if user account should be new or not
    try {
        // const user = await User.findById(req?.user?._id);
        const user = req?.user;
        
        // > Update the user account
        if (await shouldRenewPlan(user)) {
            user.subscriptionPlan = 'Free';
            user.monthlyRequestCount = 10;
            user.apiRequestCount = 0;
            user.nextBillingDate = await nextBillingDate();

            // > Create new Payment and save into db
            const newPayment = await Payment.create({
                user: user?._id,
                subscriptionPlan: 'Free',
                amount: 0,
                reference: Math.random().toString(36).substring(7),
                monthlyRequestCount: 5,
                currency: 'inr',
            })
            user.payments.push(newPayment._id);

            // >Save the user
            await user.save();

            // > Send the response
            res.json({
                status: 'success',
                message: 'Subscription plan updated successfully',
                user,
            })

        } else {
            // console.log("hi");
            return res.status(403).json(
                'Subscription renewal not due yet'
            )
        }

    } catch (error) {
        res.status(500);
        throw new Error(error)
    }
    
})

module.exports = {stripePayment, handleFreeSubscription, verifyPayment};