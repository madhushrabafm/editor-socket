import React from "react";

const ClientBox = ({ username }) => {
  const getInitials = (username) => {
    return username
      .split(" ")
      .map((name) => name[0]?.toUpperCase())
      .join("");
  };
  return (
    <div>
      <div className="boxes flex-col ">
        <p className="box border rounded   h-10 bg-emerald-200 w-10 flex items-center justify-center text-black">
          {getInitials(username)}
        </p>
        <p className="name text-xs mt-2">{username}</p>
      </div>
    </div>
  );
};

export default ClientBox;
