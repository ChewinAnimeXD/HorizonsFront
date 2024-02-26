import { createContext, useContext, useState } from "react";
import {
  createImageRequest,
  getImageRequest,
  getImagesRequest,
  deleteImageRequest,
  updateImageRequest,
} from "../api/image.js";

const ImageContext = createContext();

export const useImage = () => {
  const context = useContext(ImageContext);
  if (!context) throw new Error("useImage must be used within a TaskProvider");
  return context;
};

export function ImageProvider({ children }) {
  const [images, setImages] = useState([]);

  const createImage = async (image) => {
    try {
      const res = await createImageRequest(image);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getImages = async () => {
    try {
      const res = await getImagesRequest();
      setImages(res.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const getImage = async (id) => {
    try {
      const res = await getImageRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteImage = async (id) => {
    try {
      const res = await deleteImageRequest(id);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateImage = async (id, data) => {
    try {
      const res = await updateImageRequest(id, data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        createImage,
        getImage,
        getImages,
        deleteImage,
        updateImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}
