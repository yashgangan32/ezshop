import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { useLocation,useNavigate} from 'react-router-dom';
const ResetPassword = () => {
    const location = useLocation();
    const navigate=useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword1, setShowPassword1] = useState(false)
    
    const [newPassword,setNewPassword]=useState()
    const [confPassword,setConfPassword]=useState()
    const { email } = location.state || {};

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(SummaryApi.resetPassword.url, {
            method: SummaryApi.resetPassword.method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email,newPassword,confPassword }),
          });
    
          const result = await response.json();
    
          if (response.ok) {
            toast.success(result.message)
            navigate('/login')
          } else {
            toast.error(result.message)
          }
        } catch (err) {
          console.log("error happend while posting to server", err);
    
        }
    }


    return (
        <section id='resetpassword'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                <p className='text-center font-bold'>Reset Password For Email :</p>
                <p className='text-center'>{email}</p>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handlesubmit}>
                        <div className='grid'>
                            
                        <label>Enter Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword1 ? "text" : "password"}
                                    placeholder='Enter New Password'
                                    name='newpassword'
                                    value={newPassword}
                                    onChange={e=>{setNewPassword(e.target.value)}}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword1((preve) => !preve)}>
                                    <span>
                                        {
                                            !showPassword1 ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Confirm New Password'
                                    name='confirmpassword'
                                    value={confPassword}
                                    onChange={e=>{setConfPassword(e.target.value)}}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            !showPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>

                        </div>

                        <button type='submit' className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[200px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Reset Password</button>

                    </form>

                </div>


            </div>
        </section>
    )
}

export default ResetPassword