import React, { useEffect, useState, useRef } from "react";
import { Button } from "antd";
import PostService from "../services/main/post.service";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const MainBody = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const socketRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    messages.map((item, index) => {
      console.log(item.user);
    });
    try {
      const data = await PostService.list();
      setMessages(data.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user && user == null) {
      navigate("/login");
    } else {
      setUser(user);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
    if (!isSocketConnected) {
      socketRef.current = io(process.env.REACT_APP_BACKSOCKET);
      socketRef.current.on("chat message", (msg) => {
        console.log("got mesage" + msg);
        fetchData();
      });

      setIsSocketConnected(true);
    }

    return () => {
      //socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    console.log(message);
    try {
      if (isSocketConnected) {
        try {
          socketRef.current.emit("chat message", { body: message, user: user });
          const r = await PostService.post({ body: message, user: user });
          setMessages((prevMessages) => [
            ...prevMessages,
            { body: message, user: user },
          ]);
        } catch (e) {
          console.log(e);
        }
        setMessage("");
      } else {
        console.error("Socket connection not ready.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const keyhandler = (e) => {
    if (e.key == "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="body-main">
      <div>
        <div className="chatbox" ref={messagesContainerRef}>
          <div>
            {messages.map((item, index) => (
              <>
                {item.user == user ? (
                  <>
                    <div className="message-out" key={index}>
                      <p>{item.user}</p>
                      <div className="outgoing-message">
                        <p>{item.body}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="message-in" key={index}>
                      <p>{item.user}</p>
                      <div className="incoming-message">
                        <p>{item.body}</p>
                      </div>
                    </div>
                  </>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="input-box">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={keyhandler}
          />
          <Button onClick={sendMessage}>send</Button>
        </div>
      </div>
    </div>
  );
};

export default MainBody;
