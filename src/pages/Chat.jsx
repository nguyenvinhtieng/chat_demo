import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import ChatContent from '../components/ChatContent'
import ChatSidebar from '../components/ChatSidebar'
import { BACKEND_URL } from '../constant'
import { GlobalState } from '../context'
import socket from '../socket'
export default function Chat() {
  const state = useContext(GlobalState);
  const [user, _ ] = state.userAPI.userData;
  const [currentUser, setCurrentUser] = useState(null)
  const [chatThreads, setChatThreads] = useState([])
  const [isFetchChatThread, setIsFetchChatThread] = useState(false)
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
    console.log("runn");
    socket.connect();
    socket.on('connect', ()=> {
      console.log("connect")
    });
  }, [])
  return (
    <div className="w-full h-[100vh] fixed inset-0 flex">
      <ChatSidebar 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        chatThreads={chatThreads}
        isFetchChatThread={isFetchChatThread}/>
      <ChatContent 
        currentUser={currentUser} 
        chatThreads={chatThreads} 
        setChatThreads={setChatThreads}/>
    </div>
  )
}
