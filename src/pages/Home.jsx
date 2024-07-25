import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuid();
    console.log(id);
    setRoomId(id);
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("pls fill both");
    } else {
      navigate(`/editor/${roomId}`, {
        //2nd parameter state is used to send data using router
        state: {
          username,
        },
      });
    }
  };
  const handleEnterClick = (e) => {
    // console.log("event=====>", e.code);
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  console.log(roomId);
  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50">
      <div className="formwrap bg-rose-100 rounded p-12 w-[25rem] ">
        <div className="label mb-5 text-rose-800 italic capitalize">
          Honeyyyy Codes
        </div>
        <div className="inputs flex flex-col">
          <input
            type="text"
            className="p-2 rounded border border-rose-800 my-2"
            placeholder="room name"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleEnterClick}
          />
          <input
            type="text"
            className="p-2 rounded border border-rose-800 my-2"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleEnterClick}
          />
          <button
            className="bg-rose-700 hover:bg-rose-900 rounded mt-3 text-white p-2 w-full"
            onClick={joinRoom}
          >
            join
          </button>
        </div>
        <div
          onClick={createNewRoom}
          className="redirect cursor-pointer mt-5 underline text-sm text-rose-800 text-end  capitalize"
        >
          create new room
        </div>
      </div>
    </div>
  );
};

export default Home;
