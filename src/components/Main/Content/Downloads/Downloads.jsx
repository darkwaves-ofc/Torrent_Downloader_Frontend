import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Card from "./Card/Card";
import { serverData } from "../../../../../config";
import "./Downloads.css"

export default function Downloads() {
  const [socketDownloads, setSocketDownloads] = useState([]);
  const [finalDownloads, setFinalDownloads] = useState([]);

  // Merge data utility function
  const mergeData = (apiData, socketData) => {
    const mergedData = [...apiData];

    for (const socketItem of socketData) {
      const existingIndex = mergedData.findIndex((apiItem) => apiItem.torrentId === socketItem.torrentId);

      if (existingIndex !== -1) {
        // Replace the API data with WebSocket data when there is a conflict
        mergedData.splice(existingIndex, 1, socketItem);
      } else {
        // Add WebSocket data when there is no matching API data
        mergedData.push(socketItem);
      }
    }

    return mergedData;
  };

  useEffect(() => {
    // Fetch API data on component mount
    axios.post(`${serverData.API}/download`).then((response) => {
      const apiData = response.data;
      // console.log("API Data", apiData);

      // Merge API data with existing socketDownloads
      const updatedFinalDownloads = mergeData(apiData, socketDownloads);

      setFinalDownloads([...updatedFinalDownloads]); // Clone the array to trigger a state update
    });
  }, [socketDownloads]);

  useEffect(() => {
    const socket = io.connect(`${serverData.API}`);

    // Listen for WebSocket data
    socket.on("server-message", (webSocketData) => {
      // console.log("WebSocket Data", webSocketData);
      setSocketDownloads((prevSocketDownloads) => {
        // Filter out any items with matching torrentId from API data
        const filteredApiDownloads = prevSocketDownloads.filter(
          (item) => !webSocketData.some((socketItem) => socketItem.torrentId === item.torrentId)
        );
        return [...filteredApiDownloads, ...webSocketData];
      });
    });

    // Clean up WebSocket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // console.log("Final Data", finalDownloads);

  return (
    <div className="downloads">
      {finalDownloads.length > 0 && (
        <div className="content__download flex-col border m-2 p-5 h-full">
          {finalDownloads.map((data) => (
            <div key={data.torrentId} className="content flex-row-bet m-1 p-3">
              <Card contentData={data} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
