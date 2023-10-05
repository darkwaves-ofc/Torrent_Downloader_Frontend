import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { serverData } from "../../../../../../config";
import axios from "axios"; // Don't forget to import axios

export default function Card({ contentData }) {
  console.log(contentData);
  const [torrentInfo, setTorrentInfo] = useState(null);
  const [downloadData, setDownloadData] = useState(null);
  
  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io.connect(`${serverData.API}`);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on(`downloadData-${contentData.torrentId}`, (downloadData) => {
      console.log("Received download data:", downloadData);
      // Handle download data updates here
      // You can update your component state with the received data
      setDownloadData(downloadData);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  
  const runApi = (api) => { // Fix the function definition and parameter
    axios.post(`${serverData.API}/download${api}`).then((Response) => {
      console.log(Response.data);
    });
  };

  return (
    <div className="w-full flex-row-bet">
      <div className="meta flex-row g-2">
        <div className="icon">
          <FontAwesomeIcon icon={`fa-solid fa-${contentData.icon}`} />
        </div>
        <div className="name ">{contentData.name}</div>
      </div>
      <div className="functions flex-row g-3">
        {contentData.functions.map(
          (datafunction) =>
            datafunction && (
              <span onClick={() => runApi(datafunction.api)}> {/* Correct onClick usage */}
                <FontAwesomeIcon
                  key={datafunction.icon}
                  icon={`fa-solid fa-${datafunction.icon}`}
                />
              </span>
            )
        )}
      </div>
      {downloadData && (
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
        {downloadData && (
          <>
            {downloadData.totalSize}/{downloadData.received} ||{" "}
            {downloadData.timeRemaining}
          </>
        )}
      </div>
    </div>
  );
}
