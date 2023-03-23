import SideBarHead from '../SideBarHead'
import UserItem from '../UserItem'

export default function ChatSidebar() {
  return (
    <aside className='w-[300px] min-w-[300px] relative border-r-2 border-gray-200 flex flex-col'>
      <SideBarHead></SideBarHead>
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
