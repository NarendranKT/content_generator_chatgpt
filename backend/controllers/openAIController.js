const asyncHandler = require('express-async-handler');
const axios = require('axios');
const { OPENAI_API, GEMINI_API } = require('../configs/envConfig');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const History = require('../models/ContentHistory');
const User = require('../models/User');



// const openAIController = asyncHandler(async (req, res) => {
//     const { prompt } = req.body;
//     try {
//         const response = await axios.post('https://api.openai.com/v1/completions', {
//             model: 'gpt-3.5-turbo-instruct',
//             prompt,
//             max_tokens: 10,
//         }, {
//             headers: {
//                 Authorization  : `Bearer ${OPENAI_API}`,
//                 'Content-Type' : 'application/json'
//             }
//         })
//         const content = response?.data?.choices[0].text?.trim();

//         res.status(200).json({
//             status: 'success',
//             data : content
//         })
        
//     } catch (error) {
//         res.status(429);
//         throw new Error(error)
//     }
// })

// const openAIController = asyncHandler(async (req, res) => {
//     const { prompt } = req.body;
//     try {
//         const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//             model: 'gpt-4',
//             messages: [
//                 { 
//                     role: "system",
//                     content: "You are a helpful assistant."
//                 },
//                 {
//                     role: "user",
//                     content: prompt
//                 }
//             ],
//         }, {
//             headers: {
//                 Authorization: `Bearer ${OPENAI_API}`,
//                 'Content-Type': 'application/json'
//             }
//         });
 
//         // Assuming the response includes a message from the assistant
//         const content = response?.data?.choices[0]?.message?.content?.trim();
 
//         res.status(200).json({
//             status: 'success',
//             data: content
//         });
 
//     } catch (error) {
//         res.status(429);
//         throw new Error(error);
//     }
// });

const geminiAIController = asyncHandler(async (req, res) => {
    const { prompt } = req.body;
    try {
        const genAi = new GoogleGenerativeAI(GEMINI_API)
        const model = genAi.getGenerativeModel({
            model: "gemini-pro",
        })
        const content = await model.generateContent(prompt);
        const response = await content.response;

        // $Create the history
        const history = await History.create({
             user:req.user?._id,
             content: response.text()
        })

        // $Push history into user
        const userFound = await User.findById(req.user?.id);
        userFound.history.push(history._id);

        // $Update the api request count
        userFound.apiRequestCount += 1;

        // $save the user
        await userFound.save();

        // $send the response
        res.status(200).json({
            status: "success",
            data: response.text()
        })
        
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {   geminiAIController};