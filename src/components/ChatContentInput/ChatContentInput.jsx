import axios from "axios";
import { useContext, useRef } from "react";
import { BACKEND_URL } from "../../constant";
import { GlobalState } from "../../context";

export default function ChatContentInput({currentUser, setMessages, chatThreads, setChatThreads}) {
    const inputRef = useRef(null)
    const state = useContext(GlobalState);
    const [user, _ ] = state.userAPI.userData;
    const sendMessage = async () => {
        let val = inputRef.current.value
        if(!val) return
        let sendMessageData = {
            sender_email: user.email,
            receiver_email: currentUser.email,
            content: val,
            createdAt: new Date()
        }
        let response = await axios.post(BACKEND_URL + "/send-message", sendMessageData)
        let data = response.data
        let chatData = data.data
        let chatThread = data.chatThread
        let threadFind = chatThreads.filter(t => t._id == chatThread._id)
        if(threadFind.length == 0) {
          setChatThreads(prev => [...prev, chatThread])
        }else {
          setChatThreads(prev => prev.map(thread => thread._id != threadFind[0]._id ? thread :chatThread))
        }
        setMessages(prev => [...prev, chatData])

        inputRef.current.value = ""
        inputRef.current.focus()
    }

  return (
    <div className="flex items-center justify-between border-t-2 border-gray-200 py-5 px-3 max-h-[300px]">
      <textarea
        className="w-full ml-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-2 py-2 mr-2 max-h-[250px] min-h-[50px] border border-gray-100 scroll-custom"
        type="text"
        ref={inputRef}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </button>
    </div>
  );
}
