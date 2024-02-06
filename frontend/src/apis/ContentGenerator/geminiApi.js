import axios from 'axios';
import { STRIPEAPI } from '../apiUrlHandler';

// $Registration
export const geminiAPI = async (userPrompt) => {
    const response = await axios.post(`${STRIPEAPI}/generate-content`, {
        prompt: userPrompt
    }, {
        withCredentials: true
    })
    return response?.data;
};