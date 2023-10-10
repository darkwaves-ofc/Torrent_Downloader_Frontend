import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./Storage.css";
import { serverData } from "../../../../../../config";

export default function Storage() {
  const [storageStats, setStorageStats] = useState({});
console.log(storageStats)
  useEffect(() => {
    const socket = socketIOClient(serverData.API);

    socket.on("system-specs", (data) => {
      setStorageStats(data[0]);
    });

    // Clean up the socket connection when the component unmounts
    return () => socket.disconnect();
  }, []);

  const { storage } = storageStats;
  return (
    <div className="server-stats w-20">
      <div className="title font-weight-600 text-center">Your Storage</div>
      <div className="progress h-100 border bg-light position-relative rounded bg-info">
        <div
          className="progress-bar bg-secondary absolute"
          style={{ width: storage?.percentage }}
        ></div>
      </div>
      <span className="status font-weight-300 font-sm w-100 text-left flex-end">
        {`${storage?.usedStorage}gb/${storage?.totalStorage}gb`}
      </span>
    </div>
  );
}
