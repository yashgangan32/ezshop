import React, { useState } from 'react'
import SummaryApi from '../common';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
const ForgotPassowrd = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState("")
  const [send, setSend] = useState(0)
  const [userotp, setUserOtp] = useState()
  const [genotp,setGenOtp]=useState()

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.forgot.url, {
        method: SummaryApi.forgot.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setGenOtp(result.genotp)
      } else {
        console.log(result.error || 'Something went wrong. Please try again.');
      }
      setSend(1)


    } catch (err) {
      console.log("error happend while handling email", err);

    }

  }
  const handleVerify=async(e)=>{
    e.preventDefault()
    try{
      const response=await fetch(SummaryApi.verifyOtp.url,{
        method:SummaryApi.verifyOtp.method,
        credentials:'include',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({genotp,userotp})
      })
      const result=await response.json()

      
      if (response.ok) {
        toast.success(result.message)
        navigate('/resetpassword',{ state: { email } })
      } else {
        toast.error(result.error)
        setSend(0)
      }

    }catch(err){
      console.log("error happend while verifying otp", err);
    }
  }

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>

        <div className='bg-white p-5 w-full max-w-sm mx-auto'>

          {
          !send && (
            <form className='pt-6 flex flex-col gap-2' onSubmit={handlesubmit}>
              <div className='grid'>
                <label>Email : </label>
                <div className='bg-slate-100 p-2'>
                  <input
                    type='email'
                    placeholder='enter email'
                    name='email'
                    value={email}
                    onChange={e => { setEmail(e.target.value) }}
                    className='w-full h-full outline-none bg-transparent' />
                </div>
              </div>
              <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Send OTP</button>

            </form>)}

          {
            send===1 && (
              <form className='pt-6 flex flex-col gap-2' onSubmit={handleVerify}>
                <div className='grid'>
                  <label>Enter OTP : </label>
                  <div className='bg-slate-100 p-2'>
                    <input
                      type='number'
                      placeholder='enter otp'
                      name='userotp'
                      value={userotp}
                      onChange={e => { setUserOtp(e.target.value) }}
                      className='w-full h-full outline-none bg-transparent' />
                  </div>
                </div>
                <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Verify OTP</button>

              </form>)}

        </div>


      </div>
    </section>
  )
}

export default ForgotPassowrd