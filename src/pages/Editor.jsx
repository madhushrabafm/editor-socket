import React, { useEffect, useRef, useState } from "react";
import ClientBox from "../components/ClientBox";
import EditorPlayground from "../components/EditorPlayground";
import { initSocket } from "../socket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Editor = () => {
  const socketRef = useRef(null);
  const location = useLocation(); // data received from url
  const { roomid } = useParams(); //id from url
  const nav = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      // errors
      socketRef.current.on("connect_error", (er) => handleError(er));
      socketRef.current.on("connect_failed", (er) => handleError(er));
      const handleError = () => {
        toast.error("socket not connected >>>");
        nav("/");
      };

      // emit
      socketRef.current.emit("joinRoom", {
        roomid,
        username: location.state?.username,
      });
      // console.log(location);
      // on - when new user joins room , for sendinf notif to others
      socketRef.current.on("joined", ({ allUsers, username, socketid }) => {
        console.log(allUsers);
        // console.log(username);
        if (username !== location.state?.username) {
          toast.success(`${username} joined the rooom`);
          console.log("wherhhrnjr");
        }
        setClients(allUsers);
      });

      //user disconnecting
      socketRef.current.on("disconnected", ({ username, socket_id }) => {
        toast.success(`${username} leaved rooom`);
        //removing the user from sidepanel list
        setClients((prev) => {
          return prev.filter((client) => client.socket_id != socket_id);
        });
      });
    };
    // console.log(init);
    init();
  }, []);

  // if no room id present then user will go to /
  if (!location.state) {
    nav("/");
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomid);
      toast.success(`Room Id is Copied`);
    } catch (error) {
      console.log(error);
      toast.error("unable to copy the room Id");
    }
  };

  const leaveRoom = async () => {
    nav("/");
  };

  console.log(clients);
  return (
    <div className="allwrap flex justify-between min-h-screen">
      <div className="sidebar text-white bg-neutral-800 w-[20rem] p-5">
        <div className="flex capitalize  justify-between flex-col h-full">
          <div className="top flex-col space-y-4">
            <div className="label mb-12 mt-7 text-rose-800 italic capitalize">
              Honeyyyy Codes
            </div>
            <div className="connextions mt-12">connected</div>
            <div className="allbox flex justify-between  gap-3 flex-wrap">
              {/* <ClientBox /> */}
              {clients &&
                clients.map((client, idx) => (
                  <ClientBox username={client.username} key={idx} />
                ))}
            </div>
          </div>
          <div className="bottom mb-12 flex-col space-y-4">
            <div
              className=" bg-rose-700 p-2 rounded cursor-pointer"
              onClick={copyRoomId}
            >
              share room id
            </div>
            <div
              className="  rounded bg-rose-700 p-2  cursor-pointer "
              onClick={leaveRoom}
            >
              leave
            </div>
          </div>
        </div>
      </div>
      <div className="editplaygr bg-neutral-900   w-full p-2">
        <EditorPlayground />
      </div>
    </div>
  );
};

export default Editor;
