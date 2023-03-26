import { useContext } from 'react';
import { GlobalState } from '../../context';
import Loading from '../Loading'
import SideBarHead from '../SideBarHead'
import SideBarSearch from '../SideBarSearch'
import UserItem from '../UserItem'

export default function ChatSidebar({setCurrentUser, chatThreads, currentUser, isFetchChatThread, usersOnline, isActive, setTabActive}) {
  const state = useContext(GlobalState);
  const [user, _ ] = state.userAPI.userData;
  if(chatThreads.length > 0) {
    chatThreads = chatThreads.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))
  }
  
  return (
    <aside className={`w-[300px] min-w-[300px] relative border-r-2 border-gray-200 flex flex-col sidebar ${isActive ? "is-active" : ""}`}>
      <SideBarHead></SideBarHead>
      <SideBarSearch setCurrentUser={setCurrentUser} setTabActive={setTabActive}></SideBarSearch>
      <div className='pb-[40px] flex-1 overflow-auto overflow-y-auto scroll-custom'>
        {isFetchChatThread && <Loading />}
        {!isFetchChatThread && chatThreads.length == 0 && (<p className='text-[14px] text-center text-gray-500 py-3'>Do not have any conversation</p>)}
        {!isFetchChatThread && chatThreads.length > 0 && chatThreads.map(thread => {
          let userData = thread.user1.email == user.email ? thread.user2 : thread.user1
          let isOnline = usersOnline.filter(user => user.user.email == userData.email)
          return ( <UserItem key={thread._id} thread={thread} currentUser={currentUser} setCurrentUser={setCurrentUser} isOnline={isOnline.length > 0} setTabActive={setTabActive}></UserItem>)
        })}
      </div>
    </aside>
  )
}
