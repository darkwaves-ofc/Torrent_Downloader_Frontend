import React from "react";
import { download } from "../../../../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Downloads() {
  return (
    <div className="flex-col border m-1 p-2">
      {download.map((data) => (
        <div key={data.id} className="content flex-row-bet m-3">
          <div className="icon">{data.icon}</div>
          <div className="name ">{data.name}</div>
          <div className="functions flex-row g-3">
            {data.functions.map((datafunction) => (
              <FontAwesomeIcon icon={`fa-solid fa-${datafunction.icon}`} />
            ))}
          </div>
          <div className="process">{data.process}</div>
          <div className="size">
            {data.size}/{data.downloaded}
          </div>
        </div>
      ))}
    </div>
  );
}
