import axios from 'axios';
import { USERAPI } from '../apiUrlHandler';


// $Registration
export const registerAPI = async (userData) => {
    const response = await axios.post(`${USERAPI}/register`, {
        email: userData?.email,
        username: userData?.username,
        password: userData?.password
    }, {
        withCredentials: true
    })
    return response?.data;
};


// $Login
export const loginAPI = async (userData) => {
    const response = await axios.post(`${USERAPI}/login`, {
        email: userData?.email,
        password: userData?.password
    }, {
        withCredentials: true
    })
    return response?.data;
};


// $Check Authentication
export const checkLoginStatus = async () => {
    const response = await axios.get(`${USERAPI}/auth/check`, {
        withCredentials: true
    })
    return response?.data;
};

// $Logout
export const logoutAPI = async () => {
    const response = await axios.post(`${USERAPI}/logout`,
        {},
        {
            withCredentials: true
        }
    )
    return response?.data;
}

// $Profile
export const profileAPI = async () => {
    const response = await axios.get(`${USERAPI}/profile`,
        {
            withCredentials: true
        }
    )
    return response?.data;
}

