import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadImages() {
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();

  const handleUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage)); // Preview the image
    uploadImage(selectedImage, description);
  };

  // Uploading Image & Description
  const uploadImage = async (image, imageDescription) => {
    const formData = new FormData(); //JavaScript Object to create key/value pairs
    formData.append("image", image); //Appending the uploaded image to the object
    formData.append("image_description", imageDescription);
    const response = await fetch("http://127.0.0.1:8000/api/upload_image/", {
      method: "POST",
      body: formData,
    });
    const data = response.json();
    console.log(data);
  };
  return (
    <>
      <div className="main-container ">
        <div
          className="upload-card mt-4 mb-4"
          onClick={() => {
            navigate("/images");
          }}
        >
          <label className="upload-card-content">
            <p className="upload-card-title">Show Gallery</p>
            <p className="upload-card-para">Click to open image gallery</p>
          </label>
        </div>

        <div className="upload-card mt-4 ">
          <input
            type="file"
            accept="image/*"
            name="image"
            id="image"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
          <label htmlFor="image" className="upload-card-content">
            <p className="upload-card-title">Upload Image</p>
            <p className="upload-card-para">
              Click to upload image with description
            </p>
          </label>
        </div>

        <div className="input-container mt-4">
          <input
            required
            type="text"
            name="text"
            autoComplete={"off"}
            className="description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%" }}
          />
          <label className="user-label">Description</label>
        </div>
      </div>
    </>
  );
}

export default UploadImages;
