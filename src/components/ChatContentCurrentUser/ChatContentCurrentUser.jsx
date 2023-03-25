import React from 'react'

export default function ChatContentCurrentUser({currentUser}) {
  return (
    <div className='flex items-center justify-between border-b-2 border-gray-200 py-5 px-3'>
        <div className='flex items-center cursor-pointer'>
          <img className='w-10 h-10 rounded-full object-cover' src={currentUser.photoURL} alt='avatar'/>
          <div className='flex flex-col ml-2'>
            <h1 className=''>{currentUser.displayName}</h1>
            <p className='text-gray-400 text-[12px]'>{currentUser.email}</p>
          </div>
        </div>
      </div>
  )
}
