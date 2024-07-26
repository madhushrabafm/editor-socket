import React, { useEffect, useRef, useState } from "react";
import ClientBox from "../components/ClientBox";
import EditorPlayground from "../components/EditorPlayground";
import { initSocket } from "../socket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Editor = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
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
        toast.error("Socket not connected");
        nav("/");
      };

      // emit
      socketRef.current.emit("joinRoom", {
        roomId: roomid,
        username: location.state?.username,
      });

      // on - when new user joins room, for sending notif to others
      socketRef.current.on("joined", ({ allUsers, username, socketId }) => {
        console.log(allUsers);
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room`);
        }
        setClients(allUsers);
      });

      // user disconnecting
      socketRef.current.on("disconnected", ({ username, socketId }) => {
        toast.success(`${username} left the room`);
        // removing the user from side panel list
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };

    if (!location.state) {
      nav("/");
    } else {
      init();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off("joined");
        socketRef.current.off("disconnected");
      }
    };
  }, [location.state, nav, roomid]);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomid);
      toast.success(`Room ID copied`);
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy the room ID");
    }
  };

  const leaveRoom = async () => {
    nav("/");
  };

  return (
    <div className="allwrap flex justify-between min-h-screen">
      <div className="sidebar text-white bg-neutral-800 w-[20rem] p-5">
        <div className="flex capitalize justify-between flex-col h-full">
          <div className="top flex-col space-y-4">
            <div className="label mb-12 mt-7 text-rose-800 italic capitalize">
              Honeyyyy Codes
            </div>
            <div className="connextions mt-12">connected</div>
            <div className="allbox flex justify-between gap-3 flex-wrap">
              {clients &&
                clients.map((client, idx) => (
                  <ClientBox username={client.username} key={idx} />
                ))}
            </div>
          </div>
          <div className="bottom mb-12 flex-col space-y-4">
            <div
              className="bg-rose-700 p-2 rounded cursor-pointer"
              onClick={copyRoomId}
            >
              share room id
            </div>
            <div
              className="rounded bg-rose-700 p-2 cursor-pointer"
              onClick={leaveRoom}
            >
              leave
            </div>
          </div>
        </div>
      </div>
      <div className="playground w-full">
        <EditorPlayground
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
          socketRef={socketRef}
          roomId={roomid}
        />
      </div>
    </div>
  );
};

export default Editor;
