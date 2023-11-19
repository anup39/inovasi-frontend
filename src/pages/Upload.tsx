import { useState } from "react";
import "../css/upload/upload.css";
import axios from "axios";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFacilityUpload = (event) => {
    event.preventDefault();

    if (selectedFile) {
      console.log("File uploaded:", selectedFile);
      const data = new FormData();
      data.append("file", selectedFile);
      axios
        .post(
          `${import.meta.env.VITE_API_DASHBOARD_URL}/upload-facility/`,
          data
        )
        .then((res) => {
          console.log(res, "res");
        });
      // Perform operations with the file here
    } else {
      console.log("No file uploaded");
    }
  };

  return (
    <form onSubmit={handleFacilityUpload} className="centered-container">
      <div>
        <span>
          <b>Upload Facility</b>:
        </span>
        <input type="file" onChange={handleFileChange} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
