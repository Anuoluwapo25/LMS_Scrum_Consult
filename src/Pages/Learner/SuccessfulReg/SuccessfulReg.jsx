import React from 'react'
import ImgSample from '../../../assets/portfolio-1.png'
import Congrats from '../../../assets/congratulations.gif'

const SuccessfulReg = () => {
  return (
    <div>
<main class="grid min-h-full place-items-center bg-white px-6 py-10 sm:py-32 lg:px-8">
  <div class="text-center">
    <img src={Congrats} class="mt-4 h-80"></img>
    <p class="my-4 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Congratulations!</p>
  </div>
  <div className='text-center justify-center w-1/3 text-sm px-8 py-4'>
  <p>Your account has been successfully created. Welcome to Scrum Consult LMS! Start learning, growing, and achieving your goals today</p>
  </div>
  <div className='mt-6'>
  <button type="submit" className='w-full justify-center rounded-md px-32  py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 bg-blue-900'>Start Learning</button>

 

  </div>

</main>
    </div>
  )
}

export default SuccessfulReg
