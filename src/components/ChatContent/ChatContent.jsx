import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { BACKEND_URL } from '../../constant';
import { GlobalState } from '../../context';
import ChatContentCurrentUser from '../ChatContentCurrentUser';
import ChatContentInput from '../ChatContentInput';
import ChatContentMessage from '../ChatContentMessage';

export default function ChatContent({currentUser, chatThreads, setChatThreads}) {
  
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


  if(!currentUser) {
    return (
      <main className='flex-1 flex flex-col justify-center items-center'>
        <p>Select user to start chat</p>
      </main>
    )
  }

  return (
    <main className='flex-1 flex flex-col'>
      <ChatContentCurrentUser currentUser={currentUser}/>
      <ChatContentMessage messages={messages}></ChatContentMessage>
      <ChatContentInput currentUser={currentUser} setMessages={setMessages} chatThreads={chatThreads} setChatThreads={setChatThreads}></ChatContentInput>
    </main>
  )
}
