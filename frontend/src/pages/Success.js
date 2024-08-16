import React from 'react'
import Done from '../assest/done.gif'
import {Link} from 'react-router-dom'
const success=()=> {
  return (
    
    <div className='mt-2 font-bold  flex justify-center w-full tracking-wide max-w-md mx-auto font-mono text-2xl flex-col text-center'>
      
      <img src={Done} className='rounded-lg shadow-xl'></img>
      <p className='mt-10 text-green-700'>Payment Successful</p>
      <Link to={"/order"} class="text-white bg-gradient-to-r bg-blue-950 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 w-1/3 mx-auto ">See Order</Link>
    </div>
  )
}

export default success