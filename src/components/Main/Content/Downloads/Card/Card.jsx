import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { serverData } from "../../../../../../config";
import axios from "axios"; // Don't forget to import axios

export default function Card({ contentData }) {
  console.log(contentData);
  const [torrentInfo, setTorrentInfo] = useState(null);
  const [downloadData, setDownloadData] = useState(null);

  useEffect(() => {}, []);

  return (
    <div className="w-full flex-row-bet">
      {/* <div className="meta flex-row g-2">
        <div className="icon">
          <FontAwesomeIcon icon={`fa-solid fa-${contentData.icon}`} />
        </div>
        <div className="name ">{contentData.name}</div>
      </div>
      <div className="functions flex-row g-3">
        {contentData.functions.map((datafunction) =>
          datafunction.method === "POST" ? (
            <span onClick={() => runApi(datafunction.api)}>
              <FontAwesomeIcon
                key={datafunction.icon}
                icon={`fa-solid fa-${datafunction.icon}`}
              />
            </span>
          ) : (
            datafunction && (
              <a href={`${serverData.API}/download/${datafunction.api}`}>
                <FontAwesomeIcon
                  key={datafunction.icon}
                  icon={`fa-solid fa-${datafunction.icon}`}
                />
              </a>
            )
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
      </div> */}
      <h1>{contentData.state}</h1>
      {contentData.state === "Ready" ? (
        <h2>Ready</h2>
      ) : contentData.state === "Downloading" ? (
        <h2>Downloading</h2>
      ) : contentData.state === "archiving" ? (
        <h2>Archiving</h2>
      ) : null}
    </div>
  );
}
