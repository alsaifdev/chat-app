import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import Reciver from "../components/Reciver";
import Sender from "../components/Sender";
import { useAuth } from "../contexts/AuthContext";
import { ref, onValue, set } from "firebase/database";
import { database } from "../firebase";
const Chat = () => {
  const { username } = useParams();
  const { currentUser } = useAuth();
  const [reciver, setReciver] = useState({});
  const [sender, setSender] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(currentUser);

  useEffect(() => {
    const users = ref(database, "users");
    onValue(users, (snapshot) => {
      const data = snapshot.val();
      let users = Object.entries(data).map((user) => {
        return {
          userid: user[0],
          ...user[1],
        };
      });
      users.filter((user) => {
        if (user.username === username) setReciver(user);
        if (user.email === currentUser.email) setSender(user);
      });
    });
  }, []);
  useEffect(() => {
    const messageRef = ref(database, "messages");
    onValue(messageRef, (snapshot) => {
      const data = snapshot.val();
      let messages = Object.entries(data).map((message) => {
        return {
          id: message[0],
          ...message[1],
        };
      });
      // let filterMessages = messages.filter((message) => {
      //   if (message.to == reciver.username && message.from == sender.username) {
      //     return message;
      //   }
      // });
      setMessages(messages);
    });
  }, []);
  const sendMessage = () => {
    if (message === "") return;
    const timestamp = Date.now();
    set(ref(database, "messages/" + timestamp), {
      username: sender.username,
      message,
      profile: sender.profile,
      email: sender.email,
      name: sender.fullname,
      date: new Date().toLocaleString(),
      to: reciver.username,
      from: sender.username,
    }).then(() => setMessage(""));
    let chatLists = document.getElementById("chat-lists");
    chatLists.scrollTo(0, chatLists.scrollHeight);
  };

  return (
    <>
      <ChatHeader
        username={reciver.username}
        profile={reciver.profile}
        name={reciver.fullname}
      />
      <div className="chat-body px-3">
        <div className="chat-lists" id="chat-lists">
          {messages.map((message) => {
            if (message.username === sender.username) {
              return <Sender key={message.id} {...message} />;
            }
            if (message.username === reciver.username) {
              return <Reciver key={message.id} {...message} />;
            }
          })}
        </div>
      </div>
      <div className="chat-footer position-fixed bottom-0 left-0 w-100 px-3 py-2 bg-light">
        <div className="input-field d-flex gap-4">
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Type here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <i className="bx bx-send icon-send" onClick={sendMessage}></i>
        </div>
      </div>
    </>
  );
};

export default Chat;
