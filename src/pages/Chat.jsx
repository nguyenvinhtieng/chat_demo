import React from 'react'
import ChatContent from '../components/ChatContent'
import ChatSidebar from '../components/ChatSidebar'

export default function Chat() {
  return (
    <div className="w-full h-[100vh] fixed inset-0 flex">
      <ChatSidebar></ChatSidebar>
      <ChatContent></ChatContent>
    </div>
  )
}
