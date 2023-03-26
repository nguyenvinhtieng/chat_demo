import moment from 'moment';
import React, { useContext } from 'react'
import { GlobalState } from '../../context';

export default function UserItem({thread, currentUser, setCurrentUser, isOnline, setTabActive}) {
  const state = useContext(GlobalState);
  const [user, _ ] = state.userAPI.userData;
  let userData = thread.user1.email == user.email ? thread.user2 : thread.user1
  const handleClickUser = () => {
    setTabActive(2)
    if(userData.email != currentUser?.email){
      setCurrentUser(userData)
    }
  }
  return (
    <div className={`relative w-full px-3 py-2 cursor-pointer hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-blue-600 flex items-center ${userData.email == currentUser?.email && "bg-gray-50 border-blue-600"}`} onClick={handleClickUser}>
      <div className='w-10 h-10 min-w-[40px] '>
        <img className='w-10 h-10 rounded-full object-cover' src={userData.photoURL} alt="" />
      </div>
      <div className='ml-3'>
        <div className='flex items-center'>
          <h3 className='font-semibold text-[14px] limit-text flex items-center'>
            {userData.displayName}
            {isOnline && <div className='ml-[6px] w-3 h-3 bg-green-500 rounded-full border border-white' ></div>}
          </h3>
          <time className='text-gray-500 text-[10px] limit-text ml-2'>
            {!isOnline && moment(thread.lastMessageTime).startOf('day').fromNow()}
            {/* {isOnline && <div className='text-green-500' >Online</div>} */}
          </time>
        </div>
        <p className='text-gray-500 text-[12px] limit-text'>{thread.lastMessage}</p>
      </div>
      
    </div>
  )
}
