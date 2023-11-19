import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import NavBar from "../components/commoncomp/NavBar";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sheetname, setsheetname] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFacilityUpload = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedFile && sheetname) {
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("sheet", sheetname);
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
      console.log("No file uploaded and sheet name also");
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
                className="w-full border-yellow-300 rounded-md mt-1 focus:border-yellow-500 focus:ring-yellow-500 "
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
                className="w-full bg-[#CCB848] text-white rounded-md py-2 px-4 hover:bg-[#89C461]"
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
