import { useContext } from 'react'
import { GlobalState } from '../../context';
import moment from "moment"
export default function ChatContentMessage({messages}) {
  const state = useContext(GlobalState);
  const [user, _ ] = state.userAPI.userData;
  return (
    <div className="overflow-y-auto flex-1 scroll-custom">
        {messages.length == 0 && 
            <div className="flex items-center justify-end mx-2 my-3 ">
            <div className="flex flex-col items-end max-w-[60%] rounded-md overflow-hidden">
              <div className="p-4 bg-blue-500 text-white flex flex-col justify-end items-start">
                <p className="text-[14px]">Start a new conversation!</p>
              </div>
            </div>
          </div>
        }
        {messages.length > 0 && messages.map(message => {
          let isMyMessage = message.sender.email === user.email
          return (
            <div key={message._id} className={`flex items-center mx-2 my-1 ${isMyMessage ? "justify-end" : "justify-start"}`}>
              <div className="flex flex-col items-end max-w-[60%] rounded-md overflow-hidden">
                <div className={` py-2 px-3 p-flex flex-col justify-end ${isMyMessage ? "items-start bg-blue-500 text-white" : "bg-gray-200 text-black items-end"}`}>
                  <p className="text-[14px]">{message.content}</p>
                  <time className="text-[10px] limit-text">{moment(message.createdAt).startOf('day').fromNow()}</time>
                </div>
              </div>
            </div>
        )})}
      </div>
  )
}
