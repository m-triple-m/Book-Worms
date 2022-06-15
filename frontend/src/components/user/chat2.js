import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import app_config from "../../config";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import "./chat.css";
import { useParams } from "react-router-dom";

const Chat2 = () => {
  const url = app_config.api_url;
  const [socket, setSocket] = useState(io(url, { autoConnect: false }));
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [connectedUser, setConnectedUser] = useState("");
  const [status, setStatus] = useState("not connected");
  const [message, setMessage] = useState("");
  const { userid } = useParams();

  const [messageList, setMessageList] = useState([]);
  const [selContact, setSelContact] = useState(currentUser.connections[0]);

  useEffect(() => {
    socket.connect();
    // socket.emit('add', currentUser._id);
    // socket.emit('checkuser', userid);
  }, []);

  //   socket.on('isonline', (data) => {
  //     if(data.status === 'online'){
  //       setConnectedUser(data.socketid);
  //       setStatus('Online')

  //     }else if(data.status === 'offline'){
  //       setStatus('Offline')
  //     }
  //   })

  // subscribing the event
  socket.on("recmsg", (data) => {
    console.log(data);
    setMessageList([...messageList, data]);
  });

  const showConnections = () => {
    return (
      <div className="card">
        <div className="card-body">
          <ul className="list-group">
            {currentUser.connections.map((connection) => (
              <li
                className="list-group-item"
                key={connection._id}
                onClick={(e) => setSelContact(connection)}
              >
                {connection.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const displayMessages = () => {
    return messageList.map((obj) => (
      <div
        className={
          obj.sent ? "message-sent message-box" : "message-recieved message-box"
        }
      >
        <p className="message-text">{obj.text}</p>
      </div>
    ));
  };

  const sendMessage = () => {
    // emit is used for sending the event
    let obj = { text: message, sent: true };
    socket.emit("sendmsg", obj);

    setMessageList([...messageList, obj]);
    setMessage("");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">{showConnections()}</div>
        <div className="col-md-9">
          <Card className="chat-card">
            <CardHeader
              title={selContact ? selContact.username : "No Contact Selected"}
            />
            <CardContent>
              <div className="chat-area">{displayMessages()}</div>

              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Type Your Message Here..."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />

                <Button variant="contained" onClick={sendMessage}>
                  Send &nbsp; <i className="fas fa-paper-plane"></i>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat2;
