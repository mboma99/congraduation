import React from 'react'

export default function Forgot() {
    return (
        <React.Fragment>
                <div>
                    <h1 className=" font-thin uppercase text-xl mb-4 text-white text-center cursor-pointer mb-10">
                            Forgot your password
                    </h1>
                </div>
                <form>
                    <div className='space-y-6 w-full'>
                        <input
                            type='text' placeholder='Email Address'
                            className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none focus:ring focus:outline-none '
                            />
                        <input
                            type='password' placeholder='Password'
                            className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none, focus:ring focus:outline-none '
                        />
                        <input
                            type='password' placeholder='Confirm Password'
                            className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none, focus:ring focus:outline-none '
                        />
                    </div>
                    <div className='text-center mt-6 text-white'>
                        <button type ='submit' className='bg-customDullBlue w-full py-3 rounded-3xl'>
                            Continue
                        </button>
                    </div>
                    <p className='text-center text-sm underline cursor-pointer'>login</p>


                </form>
        </React.Fragment>
    )
}