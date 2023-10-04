import React from "react";
import "./Main.css";
import Top from "../../components/Main/common/Top/Top";
import Content from "../../components/Main/Content/Content";

export default function Main() {
  return (
    <div className="main__page w-full">
      <Top />
      <Content />
    </div>
  );
}
