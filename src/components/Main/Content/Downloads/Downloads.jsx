import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { io } from "socket.io-client";
import axios from "axios";
import Card from "./Card/Card";
import { serverData } from "../../../../../config";

export default function Downloads() {
  const [finalDownloads, setFinalDownloads] = useState([]);

  useEffect(() => {
    const socket = io.connect(`${serverData.API}`);

    // Initialize downloads with empty array
    let downloads = [];

    // Listen for WebSocket data
    socket.on("server-message", (webSocketData) => {
      downloads = mergeData(downloads, webSocketData);
      setFinalDownloads(downloads);
    });

    // Clean up WebSocket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Fetch API data on component mount
    axios.post(`${serverData.API}/download`).then((response) => {
      const apiData = response.data;
      console.log("API Data", apiData);

      // Merge API data with existing finalDownloads
      const updatedFinalDownloads = mergeData(finalDownloads, apiData);

      setFinalDownloads(updatedFinalDownloads);
    });
  }, []);

  console.log("Final Data ", finalDownloads);

  // Merge data utility function
  const mergeData = (existingData, newData) => {
    return newData.map((newItem) => {
      const existingItem = existingData.find(
        (item) => item.torrentId === newItem.torrentId
      );
      return existingItem ? { ...existingItem, ...newItem } : newItem;
    });
  };

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
