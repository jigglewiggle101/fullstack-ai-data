import React, { useState } from "react";
import axios from "axios";

const UploadDataset = () => {
  const [file, setFile] = useState(null);
  const [task, setTask] = useState("clustering");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("task", task);

    const response = await axios.post("http://localhost:5001/analyze", formData);
    console.log(response.data); // Use response for visualization
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <select onChange={(e) => setTask(e.target.value)}>
        <option value="clustering">Clustering</option>
        <option value="regression">Regression</option>
      </select>
      <button type="submit">Analyze</button>
    </form>
  );
};

export default UploadDataset;
