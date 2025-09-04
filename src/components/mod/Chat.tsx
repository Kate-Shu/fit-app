'use client'
import { useState } from "react";
import Button from "../ui/Button";
import CloseIcon from "../ui/icons/CloseIcon"
import SendIcon from "../ui/icons/SendIcon";
import { AIAvatarIcon } from "../ui/icons/AIAvatarIcon";
import { UserAvatarIcon } from "../ui/icons/UserAvatarIcon";

type MessageType = {
 role: 'user' | 'assistant',
 text: string
}
type ChatType = {
 isOpen: boolean,
 onClose: () => void
}
const Chat = ({ isOpen, onClose }: ChatType) => {
 const [messages, setMessages] = useState<MessageType[]>([])
 const [inputVal, setInputVal] = useState('')
 const [isLoading, setLoading] = useState(false)
 // messages.map((mes) => {
 //  return (
 //   console.log('role: ', mes.role))
 // })


 const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInputVal(e.target.value)
 if (!isOpen) return null

 const sendMessage = () => {
  const messageText = inputVal.trim()
  if (!messageText) return

  setMessages(prev => [...prev, { role: 'user', text: messageText }])
  setInputVal('')
  setLoading(true)

  setTimeout(() => {
   setMessages(prev => [...prev, { role: 'assistant', text: messageText }])
   setLoading(false)
  }, 2000)
 }

 console.log('mes:', messages)
 return (
  <div className="absolute bottom-10 left-10 w-1/2 h-3/5 z-50 border border-border rounded-2xl flex flex-col bg-bg-secondary/95">
   <header className="flex justify-between items-center py-2 px-5 border-b border-b-border bg-amber-950/55 rounded-t-2xl">
    <p className="text-text-main font-semibold text-xl">Fitness AI assistant</p>
    <Button variant='icon' onClick={onClose}>
     <CloseIcon />
    </Button>
   </header>
   {/* message container */}
   <div className="flex flex-col justify-end flex-1 gap-3 overflow-y-auto p-3">
    {messages.map((message, i) =>
    (<div key={i} className={`flex ${message.role === 'user' ? 'flex-row-reverse' : ''} text-text-main`}>
     {message.role === 'user' ? (
      <UserAvatarIcon size={26} strokeWidth={1} className="text-text-light ml-2" />) : (
      <AIAvatarIcon size={26} strokeWidth={1} className="text-text-light mr-2" />
     )}
     <span>{message.text}</span>
    </div>)
    )}
    {
     isLoading && (
      <div className="flex items-center gap-2 text-text-light">
       <CloseIcon />
       <div className="w-4 h-4 border-2 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
      </div>
     )
    }
   </div>

   <div className="mt-auto w-full min-h-fit py-2 flex flex-row justify-between items-center border-t border-t-amber-400 bottom-0">
    <textarea
     value={inputVal}
     onChange={handleChange}
     className="w-full min-h-2 outline-none resize-none px-4 py-2 text-text-main leading-tight"
     placeholder="Ask something your assistant..."
     autoFocus
    />
    <Button disabled={!inputVal.trim() || isLoading} variant="submit" onClick={sendMessage}>
     <SendIcon />
    </Button>
   </div>

  </div>
 )
}
export default Chat;