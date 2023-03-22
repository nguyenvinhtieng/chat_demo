import React from 'react'
import UserItem from '../UserItem'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoLogOutOutline } from 'react-icons/io5'
import { FaFacebookF } from 'react-icons/fa'
export default function ChatSidebar() {
  return (
    <aside className='w-[300px] min-w-[300px] relative border-r-2 border-gray-200 flex flex-col'>
      <div className='flex items-center justify-between border-b-2 border-gray-200 py-5 px-3'>
        <div className='flex items-center cursor-pointer w-full'>
          <img className='w-10 h-10 rounded-full object-cover' src='https://source.unsplash.com/random' alt='avatar'/>
          <h1 className='ml-2 flex-1'>Hello User Name</h1>
          <div className="dropdown min-w-[30px] flex justify-center relative">
            <BsThreeDotsVertical></BsThreeDotsVertical>
            <div className="dropdown__list absolute top-[110%] right-0 text-[12px] py-1 bg-gray-100 rounded-md opacity-0">
              <div className="px-4 hover:bg-blue-50 py-2 flex items-center">
                <span className='mr-2'>Facebook</span>
                <FaFacebookF></FaFacebookF>
              </div>
              <div className="px-4 hover:bg-red-50 py-2 flex items-center">
                <span className='mr-2'>Logout</span>
                <IoLogOutOutline></IoLogOutOutline>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className='pb-[40px] flex-1 overflow-auto overflow-y-auto scroll-custom'>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
      </div>
    </aside>
  )
}
