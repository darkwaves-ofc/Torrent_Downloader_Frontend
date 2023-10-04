import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { serverData } from "../../../../../../config";

export default function Card({ contentData }) {
  console.log(contentData);
  const [torrentInfo, settorrentInfo] = useState(null);
  const [downloadData, setdownloadData] = useState(null);
  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io.connect(`${serverData.API}/socket.io`);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on(`torrentInfo-${contentData.torrentId}`, (torrentInfo) => {
      console.log("Received torrent info:", torrentInfo);
      settorrentInfo(torrentInfo);
      // Handle torrent info here
      // You can update your component state with the received data
    });

    socket.on(`downloadData-${contentData.torrentId}`, (downloadData) => {
      console.log("Received download data:", downloadData);
      // Handle download data updates here
      // You can update your component state with the received data
      setdownloadData(downloadData);
    });

    socket.on(`downlaoded-${contentData.torrentId}, (downlaoded)`);

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full flex-row-bet">
      <div className="meta flex-row g-2">
        <div className="icon">
          <FontAwesomeIcon icon={`fa-solid fa-${contentData.icon}`} />
        </div>
        <div className="name ">{contentData.name}</div>
      </div>
      <div className="functions flex-row g-3">
        {contentData.functions.map((datafunction) => (
          <a href={datafunction.api}>
            <FontAwesomeIcon
              key={datafunction.icon}
              icon={`fa-solid fa-${datafunction.icon}`}
            />
          </a>
        ))}
      </div>
      {downloadData && ( // Conditionally render progress-related elements when downloadData is available
        <div className="process w-30 p-1 position-relative flex-row-center bg-light rounded-sm border">
          <span>
            {downloadData.downloadSpeed} - {downloadData.progress}
          </span>
          <div
            className="progress_bar position-absolute h-100 bg-primary"
            style={{ width: downloadData.progress }}
          ></div>
        </div>
      )}
      <div className="size">
        {downloadData && ( // Conditionally render size-related elements when both torrentInfo and downloadData are available
          <>
            {downloadData.totalSize}/{downloadData.received} ||{" "}
            {downloadData.timeRemaining}
          </>
        )}
      </div>
    </div>
  );
}
