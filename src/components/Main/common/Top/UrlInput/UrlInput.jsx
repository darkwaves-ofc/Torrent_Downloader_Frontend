import React, { useState } from "react";
import axios from "axios";
import { serverData } from "../../../../../../config";
import "./UrlInput.css";

export default function UrlInput() {
  const [magnetUri, setMagnetUri] = useState(""); // Fixed variable name and initial state value
  const handleChange = (e) => {
    const { value } = e.target;
    setMagnetUri(value); // Update the state with the input value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(magnetUri);

    // Make the POST request with the Magnet URI
    axios
      .post(`${serverData.API}/download/start`, { magnetLink: magnetUri }) // Send the Magnet URI as an object
      .then((response) => {
        console.log("POST request successful:", response.data);
        // Handle the response data here
      })
      .catch((error) => {
        console.error("POST request error:", error);
        // Handle any errors here
      });
  };

  return (
    <div className="url-input w-40 flex-row rounded">
      <input
        type="text"
        className="w-100 rounded-left p-2"
        name="urlinput"
        id="urlinput"
        placeholder="Enter Your Magnet URI"
        value={magnetUri} // Bind the input value to the state
        onChange={handleChange}
      />
      <button
        className="submit-btn bg-info rounded p-2"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
