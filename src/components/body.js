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

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user && user == null) {
      navigate("/login");
    } else {
      setUser(user);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PostService.list();
        setMessages(data.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Only create socket connection if it doesn't exist
    if (!isSocketConnected) {
      socketRef.current = io(process.env.REACT_APP_BACKSOCKET);

      // Set up the WebSocket event listener for "chat message"
      socketRef.current.on("chat message", (msg) => {
        fetchData();
      });

      // Set the flag to indicate that the socket is connected
      setIsSocketConnected(true);
    }

    // Clean up the socket connection on component unmount
    return () => {
      //socketRef.current.disconnect();
    };
  }, []); // empty dependency array to run the effect only once

  useEffect(() => {
    // Scroll to the bottom of the messages container when messages change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    console.log(message);
    try {
      // Check if the socket is connected before sending the message
      if (isSocketConnected) {
        socketRef.current.emit("chat message", { body: message, user: user });
        
        setMessages((prevMessages) => [
          ...prevMessages,
          { body: message, user: user },
        ]);

        setMessage("");
      } else {
        console.error("Socket connection not ready.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="body-main">
      <div>
        <div className="chatbox" ref={messagesContainerRef}>
          <div>
            <div className="incoming-messages">
              {messages
                .filter((item) => item.user !== user)
                .map((item, index) => (
                  <div className="message-in" key={index}>
                    <p>{item.user}</p>
                    <div className="incoming-message">
                      <p>{item.body}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="outgoing-messages">
              {messages
                .filter((item) => item.user === user)
                .map((item, index) => (
                  <div className="message-out" key={index}>
                    <p>{item.user}</p>
                    <div className="outgoing-message">
                      <p>{item.body}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="input-box">
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button onClick={sendMessage}>send</Button>
        </div>
      </div>
    </div>
  );
};

export default MainBody;
