// DataContext.js

import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [downloadData, setDownloadData] = useState(null);

  const updateDownloadData = (data) => {
    setDownloadData(data);
  };

  return (
    <DataContext.Provider value={{ downloadData, updateDownloadData }}>
      {children}
    </DataContext.Provider>
  );
}
