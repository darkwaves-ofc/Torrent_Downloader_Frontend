import React from "react";
import Storage from "./Storage/Storage";
import UrlInput from "./UrlInput/UrlInput";
import Profile from "./Profile/Profile";

export default function Top() {
  return (
    <div className="Main__Top w-full m-auto border-b">
      <div className="Main__top_content p-3 flex-row-bet">
        <Storage />
        <UrlInput />
        <Profile />
      </div>
    </div>
  );
}
