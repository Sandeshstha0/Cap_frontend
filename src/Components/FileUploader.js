import React, { useState } from "react";
import Papa from "papaparse";

const FileUploader = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);

      // Parse CSV file
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          onFileUpload(result.data);
        },
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />
      {file && <p>Uploaded File: {file.name}</p>}
    </div>
  );
};

export default FileUploader;
