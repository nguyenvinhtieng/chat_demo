import React from 'react'

export default function UserItem() {
  return (
    <div className='w-full px-3 py-2 cursor-pointer hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-blue-600 flex items-center'>
      <div className='w-10 h-10 min-w-[40px]'>
        <img className='w-10 h-10 rounded-full object-cover' src="https://source.unsplash.com/random" alt="" />
      </div>
      <div className='ml-3'>
        <div className='flex items-center'>
          <h3 className='font-semibold text-[14px] limit-text'>User Name</h3>
          <time className='text-gray-500 text-[10px] limit-text ml-2'> 12 hour ago</time>
        </div>
        <p className='text-gray-500 text-[12px] limit-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, dolorum.</p>
      </div>
    </div>
  )
}
