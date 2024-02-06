import React, { useEffect, useState } from "react";
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/fa/eye'
import {eyeSlash} from 'react-icons-kit/fa/eyeSlash'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'
import {useMutation} from '@tanstack/react-query'
import { loginAPI } from "../../apis/Users/userApi";
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useAuth } from "../../AuthContext/AuthContext";
import StatusMessage from "../Alerts/StatusMessage";


const validationSchema = Yup.object({
    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: Yup.string().required("Password is required")
})

const Login = () => {

    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();

  //Redirect if a user is login
    useEffect(() => {
        if (isAuthenticated) {
            
            navigate("/dashboard");
        }
    }, [isAuthenticated]);

    // mutation
    const mutation = useMutation({
        mutationFn: loginAPI    
    })

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeSlash);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            mutation.mutate(values);
            navigate(0);
            navigate('/dashboard')  
        },
    })
    
    // console.log(mutation.error?.response?.data?.message);
    // console.log(mutation);

    // if (mutation.isPending && (!mutation.isError && !mutation.isSuccess) && !mutation.error) {
    //         toast.loading("Loading...", {
    //             isLoading: false
    //     });
    // }
    
    // if (mutation.isError && !mutation.error) {
    //     toast.dismiss()
    //     toast.error(mutation?.error?.response?.data?.message, {
    //         isLoading: false
    //     });
    // }
    
    if (mutation.isSuccess) {
        navigate('/dashboard');
    } 


    const handleToggle = () => {
        if (type==='password'){
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeSlash)
            setType('password')
        }
    }

    return (
    <>
        <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white tracking-wide fixed w-full">
            <div className="lg:max-w-lg max-w-md w-full md:bg-white/10 rounded-lg shadow-md p-8 m-4s py-10">
                <h2 className="text-center lg:text-5xl text-2xl font-bold mb-10 ">Welcome back!</h2>
                
                <form onSubmit={formik.handleSubmit} className=" s">
                    
                    <div className="capitalize mb-5">
                        <label htmlFor="email" className="font-medium block mb-2">email</label>
                        <input className="w-full rounded-md py-2 px-4 placeholder-white/50 placeholder:text-sm focus:outline-none bg-white/5 border border-gray-400" type="email" id="email"
                        placeholder="joe@gmail.com"
                        autoComplete="off"
                        {...formik.getFieldProps("email")}
                        />
                        {/* Error showcase */}
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 mt-1">
                                {formik.errors.email}
                            </div>
                        )}
                    </div>
                    
                    <div className="capitalize mb-8">
                        <label htmlFor="password" className="font-medium block mb-2">password</label>
                        <div className=" border border-gray-400 rounded-md flex items-center">
                            <input className="w-full focus:outline-none py-2 px-4 placeholder-white/50 placeholder:text-sm bg-white/5" type={type} id="password"
                            placeholder="⋆⋆⋆⋆⋆⋆⋆⋆"
                            autocomplete="new-password"
                            {...formik.getFieldProps("password")}
                            />
                            <Icon icon={icon} className="px-3 py-2 cursor-pointer bg-white/5" size={18} onClick={handleToggle}></Icon>
                        </div>
                        {/* Error showcase */}
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 mt-1">
                                {formik.errors.password}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col items-center justify-center text-center">
                        {(mutation.isPending) ? 
                        <button disabled type="button" class="capitalize text-center bg-white/30 text-white font-medium p-2 px-10 rounded-lg hover:outline hover:outline-[2px] hover:outline-white/70 text-[18px]">
                        <svg aria-hidden="true" role="status" class="inline w-16 h-6 me-0 text-gray-200 animate-spin dark:text-gray-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#111827"/>
                        </svg>
                        
                        </button>
                        
                        : 
                        
                        <button className="capitalize text-center bg-white/30 text-white font-medium p-2 px-10 rounded-lg hover:outline hover:outline-[2px] hover:outline-white/70 text-[18px]"
                        type="submit">
                            login
                        </button>}
                        <div className="mt-3 tracking-wider">
                            <p className="inline">Don't have an account? </p>
                            <Link className="font-medium underline hover:text-white/85" to='/register'>Sign up</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
        <div className="h-screen w-full">          
                    {/* <StatusMessage type={'Loading'} message={'Welcome, Please wait logging in...'}/> */}
                {mutation.isPending && (!mutation.isError && !mutation.isSuccess) && !mutation.error && <StatusMessage type={'Loading'} message={'Welcome, Please wait logging in...'}/>}
                
                { mutation.isError && !mutation.error && 
                    <StatusMessage type={'Error'} message={mutation?.error?.response?.data?.message}/>
                }
        </div>
        
        
    </>
    );
};

{/* <ToastContainer draggable draggableDirection="x" closeOnClick limit={1} transition={Flip} theme="dark" newestOnTop/>     */}
export default Login;
