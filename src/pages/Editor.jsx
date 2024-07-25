import React, { useState } from "react";
import ClientBox from "../components/ClientBox";
import EditorPlayground from "../components/EditorPlayground";

const Editor = () => {
  const [clients, setclients] = useState([
    {
      socketId: 1,
      username: "madhu das",
    },
    {
      socketId: 2,
      username: "john doe",
    },
    {
      socketId: 3,
      username: "jane smith",
    },
    {
      socketId: 4,
      username: "alice wonder",
    },
    {
      socketId: 5,
      username: "bob builder",
    },
    {
      socketId: 6,
      username: "charlie b",
    },
    {
      socketId: 7,
      username: "daisy duck",
    },
  ]);
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
              {clients.map((client) => (
                <ClientBox username={client.username} key={client.socketId} />
              ))}
            </div>
          </div>
          <div className="bottom mb-12 flex-col space-y-4">
            <div className=" bg-rose-700 p-2 rounded">share room id</div>
            <div className="  rounded bg-rose-700 p-2  ">leave</div>
          </div>
        </div>
      </div>
      <div className="editplaygr bg-purple-100 pt-12 w-full p-5">
        <EditorPlayground />
      </div>
    </div>
  );
};

export default Editor;
