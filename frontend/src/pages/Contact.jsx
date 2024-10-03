import React from 'react';

const Contact = () => {
  return (
    <>
    <div className='flex justify-center py-5'>
      <div className='flex flex-col rounded-lg  px-2 py-5 shadow-lg bg-white'>
        <div className='flex flex-col'>
        <h1 className='font-semibold text-xl p-2 text-indigo-600 animate-pulse'>Get In Touch</h1>
        <div className='flex space-x-3 p-4'>
          {[
            {text: '+91 1234567890', rotate: 'rotate-2'},
            {text: 'breezblogs@gmail.com', rotate: '-rotate-2'},
            {text: 'Crystal IT-Park Indore', rotate: 'rotate-3'}
          ].map((item, index) => (
        <div key={index} className={`flex justify-center items-center w-44 px-3 py-2 rounded-full shadow-xl bg-blue-400 hover:scale-105 duration-300 ease-in-out ${item.rotate} space-y-8`}>
          <p className='text-white text-xs'>{item.text}</p>
          </div>
          ))}
        </div>
        </div>
        <div>
        <h1 className='font-semibold text-xl p-2'>Contact Us</h1>
        <form action="" className='w-full flex flex-col items-center gap-5'>
          <div className='flex flex-col w-5/6 gap-4 '>
          {['Your Name', 'Your Email'].map((item, index) => (

          <input key={index} type="text" className='w-full bg-transparent border-b-2 px-3 py-2 appearance-none rounded-md outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow' placeholder={item}/>
          ))}
          </div>
          <div className='w-5/6'>
            <h1 className='text-gray-500 text-sm p-2'>Add your comment</h1>
            <textarea className='border-2 rounded-md w-full h-32 bg-transparent text-sm p-2 outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow'></textarea>
          </div>
          <button type='submit' className='w-5/6 bg-blue-400 hover:bg-blue-500 duration-300 text-white px-4 py-2 rounded-md text-sm md:text-base'>Submit</button>
        </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact;
