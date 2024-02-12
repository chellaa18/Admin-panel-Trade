import React, { useState } from "react";
import "./ImageUpload.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fileFilter } from "../../helper/fileFilter";
import { toast } from "react-toastify";

const ImageUpload = () => {
  const [imagesArr, setImagesArr] = useState([]);

  const handleImageFile = (e, i) => {
    e.preventDefault();
    const files = e.target.files;
    console.log(files);

    const formatCheck = fileFilter(files);
    if (e.target.files[0]?.size > 2 * 1000 * 1024) {
      toast.warning("File with maximum size of 2MB is allowed");
      return;
    }else if (formatCheck) {
      const newImagesArray = [...imagesArr];
      for (let i = 0; i < files.length; i++) {
        newImagesArray.push(files[i]);
      }
      setImagesArr(newImagesArray);
    } else {
      return false;
    }

    // console.log(newImagesArray);
  };

  const handleImageDel = (e, name) => {
    e.preventDefault();
    //  console.log(name);
    const updatedArr = imagesArr.filter((img) => img.name !== name);
    // console.log(updatedArr);
    setImagesArr(updatedArr);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="text-center border p-5">
        <h4>File Upload</h4>
        {/* <div className="mb-3">
          <label htmlFor="image1" className="form-label">
            Image 1
          </label>
          <input
            type="file"
            className="form-control  form-control-lg"
            id="image1"
            accept="image/*"
            onChange={handleImageFile}
            multiple
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image2" className="form-label">
            Image 2
          </label>
          <input
            type="file"
            className="form-control  form-control-lg"
            id="image2"
            accept="image/*"
            onChange={handleImageFile}
            multiple
          />
        </div> */}
        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Image
          </label>

          <input
            type="file"
            className="form-control  form-control-lg"
            id="images"
            onChange={handleImageFile}
            multiple
          />

          <div className="my-4 d-flex">
            {imagesArr.length > 0
              ? imagesArr.map((img, i) => {
                  return (
                    <div className="position-relative" key={i}>
                      {" "}
                      <img src={URL.createObjectURL(img)} className="me-3" />
                      {/* <button className="btn btn-danger">del</button> */}
                      {/* <button onClick={(e)=>handleImageDel(e,i)}  type="button" class="btn-close bg-danger p-1 text-danger" disabled aria-label="Close"></button> */}
                      <div className="">
                        <button
                          className="btn-close-btn"
                          onClick={(e) => handleImageDel(e, img.name)}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
