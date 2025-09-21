import React, {useState, useEffect} from "react";
import '../styles/Photos.css';

export default function Photos({x = 50, y = 100, resetKey, slot = 1}) {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const localStorageKey = `fridgePhoto-${slot}`;

  useEffect(() => {
    const savedPhoto = localStorage.getItem(localStorageKey);
    setUploadedPhoto(savedPhoto);
  }, [resetKey, localStorageKey]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedPhoto(e.target.result);
        localStorage.setItem(localStorageKey, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="photos" style={{top: `${y}px`, left: `${x}px`}}>
      {!uploadedPhoto ? (
        <label className="upload-label">
          + Add Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{display: "none"}}
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
