import React, { useEffect, useState } from 'react'

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if(currentMessage !== ''){
            const messageData = {
                room: room,
                username: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }

            await socket.emit("send_message", messageData)
            setMessageList((messages) => [...messages, messageData])
        }
    }

    useEffect(() => {
        socket.on('receive_message', (message) => {
            setMessageList((messages) => [...messages, message])
        })
        //removes the listener to prevent numerous re-renders
        return () => {
            socket.off()
        }
    }, [socket])

  return (
    <div>
        <h1>CHAT</h1>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
            {messageList.map((val, i) => {
                return (
                    <div key={i}>
                        {val.message}
                    </div>
                )
            })}
        </div>
        <div className='chat-footer'>
            <input type="text" placeholder='Message' onChange={e => setCurrentMessage(e.target.value)} />
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat