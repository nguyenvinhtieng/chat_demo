import Loading from '../Loading'
import SideBarHead from '../SideBarHead'
import SideBarSearch from '../SideBarSearch'
import UserItem from '../UserItem'

export default function ChatSidebar({setCurrentUser, chatThreads, currentUser, isFetchChatThread}) {
  if(chatThreads.length > 0) {
    chatThreads = chatThreads.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))
  }
  return (
    <aside className='w-[300px] min-w-[300px] relative border-r-2 border-gray-200 flex flex-col'>
      <SideBarHead></SideBarHead>
      <SideBarSearch setCurrentUser={setCurrentUser}></SideBarSearch>
      <div className='pb-[40px] flex-1 overflow-auto overflow-y-auto scroll-custom'>
        {isFetchChatThread && <Loading />}
        {!isFetchChatThread && chatThreads.length == 0 && (<p className='text-[14px] text-center text-gray-500 py-3'>Do not have any conversation</p>)}
        {!isFetchChatThread && chatThreads.length > 0 && chatThreads.map(thread => (
          <UserItem key={thread._id} thread={thread} currentUser={currentUser} setCurrentUser={setCurrentUser}></UserItem>
        ))}
      </div>
    </aside>
  )
}
