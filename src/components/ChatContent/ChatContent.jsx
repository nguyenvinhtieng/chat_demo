import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { BACKEND_URL } from '../../constant';
import { GlobalState } from '../../context';
import ChatContentCurrentUser from '../ChatContentCurrentUser';
import ChatContentInput from '../ChatContentInput';
import ChatContentMessage from '../ChatContentMessage';
export default function ChatContent({currentUser, chatThreads, setChatThreads, socket, isActive, setTabActive}) {
  
  let [messages, setMessages] = useState([])
  const state = useContext(GlobalState);
  const [user, _ ] = state.userAPI.userData;
  useEffect(()=> {
    if(!currentUser) return;
    let receiver_email = currentUser.email
    let dataJson = {
      my_email: user.email,
      receiver_email
    }
    axios.post(BACKEND_URL + "/get-chat-content", dataJson)
      .then(res => res.data)
      .then(data => {
        if(data.status) {
          let messageData = data.data
          setMessages(messageData)
        }
      })
      .catch(err => console.log(err))
  }, [currentUser])

  useEffect(()=> {
    socket.on("receive-message", (data) => {
      let messageData = data.data
      let chatThread = data.chatThread
      let isCurrentUser = messageData.sender.email == currentUser?.email
      if(isCurrentUser) {
        setMessages([...messages, messageData])
      }
      setChatThreads(prev => {
        let index = prev.findIndex(item => item._id == chatThread._id)
        if(index != -1) {
          prev[index] = chatThread
        }
        return [...prev, chatThread]
      })
    })
    return () => {
      socket.off("receive-message")
    }
  }, [currentUser, messages])


  return (
    <>
    {!currentUser && 
      <main className={`flex-1 flex flex-col justify-center items-center content ${isActive ? "is-active" : ""}`} >
        <p>Select user to start chat</p>
      </main>}
    {currentUser &&
    <main className={`flex-1 flex flex-col content ${isActive ? "is-active" : ""}`}>
      <ChatContentCurrentUser currentUser={currentUser} setTabActive={setTabActive}/>
      <ChatContentMessage messages={messages}></ChatContentMessage>
      <ChatContentInput currentUser={currentUser} setMessages={setMessages} chatThreads={chatThreads} setChatThreads={setChatThreads} socket={socket}></ChatContentInput>
    </main>}
    </>
  )
}
