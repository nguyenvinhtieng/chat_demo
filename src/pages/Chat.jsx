import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import ChatContent from '../components/ChatContent'
import ChatSidebar from '../components/ChatSidebar'
import { BACKEND_URL } from '../constant'
import { GlobalState } from '../context'
import socketIO from 'socket.io-client';
import { BACKEND_URL_SOCKET } from "../constant"
const socket = socketIO.connect(BACKEND_URL_SOCKET);

export default function Chat() {
  const state = useContext(GlobalState);
  const [user, _ ] = state.userAPI.userData;
  const [currentUser, setCurrentUser] = useState(null)
  const [chatThreads, setChatThreads] = useState([])
  const [isFetchChatThread, setIsFetchChatThread] = useState(false)
  const [usersOnline, setUsersOnline] = useState([])
  const [tabActive, setTabActive] = useState(1) // 1 => sidebar || 2 => chat content
  useEffect(()=> {
    setIsFetchChatThread(true)
    axios.post(BACKEND_URL + "/get-all-chat-thread", {my_email: user?.email})
      .then(res => res.data)
      .then(data => {
        if(data.status) {
          let threads = data.data
          setChatThreads(threads)
        }
      })
      .catch(err => console.log(err))
      .finally(()=> {
        setIsFetchChatThread(false)
      })
  }, [])

  useEffect(()=> {
    socket.emit("join", user)
    socket.on("list-user-online", (users) => {
      setUsersOnline(users)
    })
  }, [])

  return (
    <div className="w-full h-[100vh] fixed inset-0 flex">
      <ChatSidebar 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        chatThreads={chatThreads}
        isFetchChatThread={isFetchChatThread}
        usersOnline={usersOnline}
        isActive={tabActive == 1}
        setTabActive={setTabActive}
        />
      <ChatContent 
        currentUser={currentUser} 
        chatThreads={chatThreads} 
        setChatThreads={setChatThreads}
        socket={socket}
        isActive={tabActive == 2}
        setTabActive={setTabActive}
        />
    </div>
  )
}
