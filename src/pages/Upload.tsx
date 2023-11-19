import { useState } from "react";
// import "../css/upload/upload.css";
import axios from "axios";
import NavBar from "../components/commoncomp/NavBar";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [sheetname, setsheetname] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFacilityUpload = (event) => {
    event.preventDefault();

    if (selectedFile) {
      console.log(sheetname, "sheetname");
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
    <>
      <NavBar />
      <div className="p-8">
        <div className="max-w-md mx-auto bg-[#11767A] p-6 rounded-md shadow-md">
          <form className="space-y-4" onSubmit={handleFacilityUpload}>
            <div>
              <label htmlFor="text-input" className="block text-white">
                Sheet Name
              </label>
              <input
                id="text-input"
                type="text"
                name="sheet_name"
                className="w-full border-black-300 rounded-md mt-1 focus:border-blue-500 focus:ring-blue-500 "
                onChange={(event) => {
                  setsheetname(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="file-input" className="block text-white">
                Upload File
              </label>
              <input
                id="file-input"
                type="file"
                name="file_upload"
                className="mt-1"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#CCB848] text-white rounded-md py-2 px-4 hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
