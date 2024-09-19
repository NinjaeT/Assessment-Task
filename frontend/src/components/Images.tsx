import { useEffect, useState } from "react";

function Images() {
  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/get_images");

    const data = await response.json();
    console.log(data);
  };

  return <></>;
}

export default Images;
