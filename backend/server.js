require('./configs/dbConnect');
const express = require('express');
const userRouter = require('./routes/userRoute');
const app = express();
const { PORT } = require('./configs/envConfig');
const { errorHandler } = require('./middlewares/globalErrorHandler');
const cookieParser = require('cookie-parser');
const openAiRouter = require('./routes/openAIRoute');
const stripeRouter = require('./routes/stripeRoute');
const cron = require('node-cron');
const User = require('./models/User');
const cors = require('cors');

// !Cron for trail period: Run every single day
cron.schedule("0 0 * * * *", async () => {
    try {
        const today = new Date();
        const updatedUser = await User.updateMany({
            trailActive: true,
            trailExpires: {$lt: today}
        }, {
            trailActive: false,
            subscriptionPlan: 'Free',
            monthlyRequestCount: 5
        })
    } catch (error) {
        throw new Error(error)
    }
})

// !Cron for Free period : Run at end of every month
cron.schedule("0 0 1 * * *", async () => {
    try {
        const today = new Date();
        const updatedUser = await User.updateMany({
            subscriptionPlan: 'Free',
            trailExpires: {$lt: today}
        }, {
           
            
            monthlyRequestCount: 0
        })
    } catch (error) {
        throw new Error(error)
    }
})

// !Cron for Basic period
cron.schedule("0 0 1 * * *", async () => {
    try {
        const today = new Date();
        const updatedUser = await User.updateMany({
            subscriptionPlan: 'Basic',
            trailExpires: {$lt: today}
        }, {
            monthlyRequestCount: 0,
        })
    } catch (error) {
        throw new Error(error)
    }
})

// !Cron for premium plan

cron.schedule("0 0 1 * * *", async () => {
    try {
        const today = new Date();
        const updatedUser = await User.updateMany({
            subscriptionPlan: 'Premium',
            nextBillingDate: {$lt: today}
        }, {
            monthlyRequestCount: 0,
        })
    } catch (error) {
        throw new Error(error)
    }
})

// !MIDDLEWARES
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

// !ROUTES
app.use('/content-generator-api/users', userRouter)
app.use('/content-generator-api/openai', openAiRouter)
app.use('/content-generator-api/stripe', stripeRouter);

// !ERROR HANDLER
app.use(errorHandler)

// !LISTENER
app.listen(PORT, () => {
    console.log("Server is up and running in " + PORT);
})