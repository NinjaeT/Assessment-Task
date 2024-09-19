import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);

  return (
    <>
      <div className="card">
        <input
          type="file"
          accept="image/*"
          name="image"
          id="image"
          onChange={(event) => {
            setImage(event.target.files[0]); // Save the selected image
          }}
          style={{ display: "none" }}
        />
        <label htmlFor="image" className="card-content">
          <p className="card-title">Upload Image</p>
          <p className="card-para">Click to upload image</p>
        </label>
      </div>
    </>
  );
}

export default App;
