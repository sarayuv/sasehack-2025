import React, { useState, useEffect } from "react";
import '../styles/Photos.css';

export default function Photos({ x = 50, y = 100, resetKey }) {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  useEffect(() => {
    setUploadedPhoto(null);
  }, [resetKey]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="photos" style={{ top: `${y}px`, left: `${x}px` }}>
      {!uploadedPhoto ? (
        <label className="upload-label">
          ➕ Add Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </label>
      ) : (
        <div className="photo-wrapper">
          <img src={uploadedPhoto} alt="Fridge" className="photo" />
          <div className="magnet" />
        </div>
      )}
    </div>
  );
}
