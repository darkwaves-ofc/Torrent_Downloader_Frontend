import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { serverData } from "../../../../../../config";

export default function Card({ contentData }) {
  console.log(contentData);

  return (
    <div className="w-full flex-row-bet">
      <div className="meta flex-row g-2">
        <div className="icon">
          <FontAwesomeIcon icon={`fa-solid fa-file`} />
        </div>
        <div className="name">
          {contentData.torrentName || contentData.torrentInfo.name}
        </div>
      </div>

      {contentData.downloadData && (
        <div className="process w-30 p-1 position-relative flex-row-center bg-light rounded-sm border">
          <span>
            {contentData.downloadData.downloadSpeed} - {contentData.state}
          </span>
          <div
            className="progress_bar position-absolute h-100 bg-primary"
            style={{
              width: contentData.downloadData.progress,
            }}
          ></div>
        </div>
      )}

      <div className="size">
        {contentData.downloadData && (
          <>
            {contentData.downloadData.totalSize}/
            {contentData.downloadData.received} ||{" "}
            {contentData.downloadData.timeRemaining}
          </>
        )}
      </div>

      {contentData.state === "Done!" && (
        <a
          href={`${serverData.API}/download/${contentData.downloadPath}`}
          className="link"
        >
          Download
        </a>
      )}
    </div>
  );
}
