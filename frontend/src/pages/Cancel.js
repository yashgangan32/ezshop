import React from 'react'
import Cancelgif from '../assest/cancel.webp'
import {Link} from 'react-router-dom'
const Cancel = () => {
  return (
    <div className='mt-2 font-bold  flex justify-center w-full tracking-wide max-w-md mx-auto font-mono text-2xl flex-col text-center'>
      <img src={Cancelgif}></img>
      <p className='mt-10 text-red-500'>Payment Failed</p>
      <Link to={'/cart'} class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mx-auto">Go to cart</Link>

    </div>
  )
}

export default Cancel