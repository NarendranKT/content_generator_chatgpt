import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthProvider from './AuthContext/AuthContext';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js'


// const stripePromise = loadStripe('pk_test_51OarUsSDCQjdYvO3Ub1pFYU7LGz8zlRhVzWEgitkmIiUoSCZZQ5qCnAWeLkfBgzSgEc9muagoneNEXxeZIK9ykgW00X9Bndt4m');

// const appearance = {
//     variables: {
//         fontSizeBase: '17px',
//         fontWeight: '1000',
//          fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
//         colorText: '#000000',
//     },
//     rules: {
//         '.Input': {
//             backgroundColor: 'rgba(245, 245, 245, 0.6)',
//             border: '1.5px solid rgba(0, 0, 0, 0.8)',
//             boxShadow: 'none',
//         },
//         '.Input:focus': {
//             border: '1.5px solid rgba(255,255,255)',
//         }, '.Label': {
//             fontSize: '1rem',
//         },
//     }
//     };

// const options = {
//     mode: 'payment',
//     currency: 'usd',
//     amount: 2000,
//     appearance
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            
                <App />
            
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false } />
    </QueryClientProvider>
);


