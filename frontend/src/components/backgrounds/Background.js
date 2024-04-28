import React from 'react'

export const Background = () => {
  return (
    <div className='absolute z-0 top-0 h-screen w-screen overflow-hidden'>
        <div className="absolute -right-10 top-0 h-[80%] w-[80%] translate-x-[30%] -translate-y-[20%] rounded-full bg-[#54B8D8] opacity-80 blur-[180px]"></div>
        <div className="absolute  h-[100%] w-[100%] -translate-x-[40%] translate-y-[20%] rounded-full bg-customIndigo opacity-40 blur-[200px]"></div>
    </div>
  )
}

export default Background