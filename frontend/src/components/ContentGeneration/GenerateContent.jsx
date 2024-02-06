import React, { useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Link } from 'react-router-dom'
import {useMutation, useQuery} from '@tanstack/react-query'
import { profileAPI } from "../../apis/Users/userApi";
import 'react-toastify/dist/ReactToastify.css'; 
import StatusMessage from "../Alerts/StatusMessage";
import { geminiAPI } from "../../apis/ContentGenerator/geminiApi";
import Icon from "react-icons-kit";
import {ic_arrow_right_alt_outline} from 'react-icons-kit/md/ic_arrow_right_alt_outline'


const validationSchema = Yup.object({
    prompt: Yup.string()
        .required("prompt is required"),
    tone: Yup.string().required("Tone is required"),
    category: Yup.string().required("Category is required"),
})

const GenerateContent = () => {
    const [generateContent, setGenerateContent] = useState("")
    const { isLoading, isError, data, error } = useQuery({
    queryFn: profileAPI,
    queryKey: ["profile"],
      });

    // mutation
    const mutation = useMutation({
        mutationFn: geminiAPI    
    })
    const formik = useFormik({
        initialValues: {
            prompt: "",
            tone: "",
            category:""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            mutation.mutate(`Generate content for prompt ${values.prompt}, in ${values.category} in a ${values.tone} tone`)     
            setGenerateContent(mutation?.data?.data)
        },
    })

    return (
    <>

        {isLoading && !isError && <StatusMessage type='loading' message='Loading, Please wait!' />}
      
        {!isLoading && isError && error &&  <StatusMessage type='error' message={error?.response?.data?.message} path={'/generate-content'}/>}
                
        {!isLoading && !isError && data &&
            <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white tracking-wide pt-14">
            <div className="lg:max-w-lg max-w-md w-full md:bg-white/10 rounded-lg shadow-md p-8 m-4s py-10">
                <h2 className="text-center md:text-5xl text-2xl font-bold ">Generate Content</h2>
                
                <div className="flex justify-center md:text-base text-[14px] text- mb-4 pt-3">
                    <div className="bg-green-600/70 rounded-full px-2 mr-4">
                        <span className="font-semibold">Plan : </span>{data?.user?.subscriptionPlan}
                    </div>
                    
                    <div className="bg-green-600/70 rounded-full px-2">
                        <span className="font-semibold">Credit : </span>{data?.user?.apiRequestCount} /{" "}{data?.user?.monthlyRequestCount}
                    </div>
                </div>               
                
                <form onSubmit={formik.handleSubmit} >
                    
                    <div className="capitalize mb-5">
                        <label htmlFor="prompt" className="font-medium block mb-2">prompt</label>
                        <input className="w-full rounded-md py-2 px-4 placeholder-white/50 placeholder:text-sm focus:outline-none bg-white/5 border border-gray-400" type="text" id="prompt"                        
                        autoComplete="off"
                        placeholder="Enter a topic or idea"
                        {...formik.getFieldProps("prompt")}
                        />
                        {/* Error showcase */}
                        {formik.touched.prompt && formik.errors.prompt && (
                            <div className="text-red-500 mt-1">
                                {formik.errors.prompt}
                            </div>
                        )}
                    </div>
                    
                    <div className="capitalize mb-8">
                        <label htmlFor="tone" className="font-medium block mb-2">tone</label>
                        
                        <select id="tone" className="w-full rounded-md py-2.5 px-4 placeholder-white/50 placeholder:text-sm focus:outline-none bg-white/5 border border-gray-400 text-white text-sm"
                        {...formik.getFieldProps("tone")}
                        >
                            <option value="" disabled selected className="bg-gray-600 ca text-white">Choose a tone</option>
                            <option value="formal" className="bg-gray-600 text-white capitalize">formal</option>
                            <option value="informal" className="bg-gray-600 text-white capitalize">informal</option>
                            <option value="humorous" className="bg-gray-600 text-white capitalize">humorous</option>
                        </select>
                        
                        {/* Error showcase */}
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 mt-1">
                                {formik.errors.password}
                            </div>
                        )}
                    </div>
                    
                    <div className="capitalize mb-8">
                        <label htmlFor="category" className="font-medium block mb-2">Category</label>
                        
                        <select id="category" className="w-full rounded-md py-2.5 px-4 placeholder-white/50 placeholder:text-sm focus:outline-none bg-white/5 border border-gray-400 text-white text-sm"
                        {...formik.getFieldProps("category")}
                        >
                            <option value="" disabled selected className="bg-gray-600 ca text-white">Choose a category</option>
                            <option value="technology" className="bg-gray-600 text-white capitalize">technology</option>
                            <option value="health" className="bg-gray-600 text-white capitalize">health</option>
                            <option value="business" className="bg-gray-600 text-white capitalize">business</option>
                        </select>
                        
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
                            Generate
                        </button>}
                    </div>
                    
                    <div className="mt-3 md:tracking-wide text-center">
                        <Link className="   text-base font-thin md:font-medium hover:underline" to='/history'>view history <Icon icon={ic_arrow_right_alt_outline} size={22}/></Link>
                    </div>
                </form>
                
                {generateContent && <div className="mt-8 rounded-md bg-gray-900/35 border border-white/25">
                    <div className="p-4">
                        <h1 className="capitalize tracking-wide text-xl md:text-2xl font-semibold pb-3">generated content</h1>
                        <p className="font-light text-base ps-2 tracking-wide">{generateContent}</p>
                    </div>
                </div>}
            </div>
            </div>
        }
   
    </>
    );
};

export default GenerateContent;
