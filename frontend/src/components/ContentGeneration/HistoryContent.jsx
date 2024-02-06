import React from "react";
import { profileAPI } from "../../apis/Users/userApi";
import { useQuery } from '@tanstack/react-query'    
import Markdown from 'react-markdown'
import { Link, useParams } from "react-router-dom";
import Icon from "react-icons-kit";
import {ic_keyboard_backspace} from 'react-icons-kit/md/ic_keyboard_backspace'


const HistoryContent = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryFn: profileAPI,
        queryKey: ["profile"],
    });

    const { id } = useParams()
    // const historyId = data?.user?.history?._id;
    const history = data?.user?.history?.filter((history) => {
        return history?._id === id;
    })[0];

    // console.log(history.content);

  return(
    <>
        <div className="bg-gray-900 pt-24 pb-10 min-h-screen text-white px-4 md:px-14">
            <Link className="mt-5 text-sm md:text-base  rounded-full bg-white/15 hover:bg-white/25 py-2 px-3" to='/history'><Icon icon={ic_keyboard_backspace} size={25} /> back</Link>
            <div className="flex items-center bg-white/10 rounded-md md:leading-loose tracking-wide leading-relaxed md:text-base text-sm mt-6" >
                {!isError && !isLoading && data &&
                <>
                <p>
                    <Markdown className='text-left p-5'>{history?.content}</Markdown>
                </p>  
                </>
                }
            </div>
        </div>
    </>
  )
};

export default HistoryContent;
