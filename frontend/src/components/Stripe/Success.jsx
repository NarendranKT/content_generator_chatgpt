import React, { useEffect } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {ic_check_circle_outline} from 'react-icons-kit/md/ic_check_circle_outline'
import Icon from "react-icons-kit";
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2'
import {useMutation} from '@tanstack/react-query'
import { verifyStripeAPI } from "../../apis/StripePayment/stripePayment";
import StatusMessage from "../Alerts/StatusMessage";

const Success = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get('session_id');
  const navigate = useNavigate();


  const mutation = useMutation({
        mutationFn:verifyStripeAPI
  })

  useEffect(() => {
    mutation.mutate(session_id);
  }, [session_id, mutation])


  if (mutation.isError && mutation.error) {
    console.log(mutation);
  }

    return (
    <>
      <div className="pt-20 flex items-center justify-center bg-gray-900 h-screen">
          <div className="md:bg-gray-800/50 md:border border-white/15 rounded-lg p-4 pb-7 text-center text-white">
              <Icon icon={ic_check_circle_outline} className="text-green-600" size={70}/>
              <h1 className="text-3xl capitalize font-bold tracking-wide text-green-600">payment successfully completed</h1>
              <p className="text-xl text-gray-200 font-semibold pt-2">Enjoy you plan,</p>
              <p className="text-lg pt-1 text-gray-200 capitalize pb-4">thank you!</p>
              <Link className="  bg-white/10 px-3 rounded-full py-1 hover:bg-white/15"  to={'/dashboard'}>continue to dashboard <Icon icon={arrowRight2}/></Link>
          </div>

          {mutation.isPending && !mutation.isError && !mutation.error && !mutation.data && <StatusMessage type='loading' message={'waiting for payment confirmation'} />}
          
          {mutation.isError && mutation.error && <StatusMessage type='error' message={mutation?.error?.response?.data?.message} />}
      </div>
    </>
  )
  
};

export default Success;
