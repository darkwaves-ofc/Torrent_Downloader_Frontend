import React, { useEffect, useState } from "react";
import { download } from "../../../../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Downloads.css";
import { io } from "socket.io-client";
import axios from "axios";
import Card from "./Card/Card";
import { serverData } from "../../../../../config";

export default function Downloads() {
  const [Downloads, setDownloads] = useState([]);

  useEffect(() => {
    axios.post(`${serverData.API}/download/all`).then((Response) => {
      console.log(Response.data);
      setDownloads(Response.data);
    });
  }, []);
  return (
    <div className="content__download flex-col border m-2 p-5 h-full">
      {Downloads.map((data) => (
        <div key={data.torrentId} className="content flex-row-bet m-1 p-3">
          <Card contentData={data} />
        </div>
      ))}
    </div>
  );
}
