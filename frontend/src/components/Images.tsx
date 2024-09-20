import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { div, h1 } from "framer-motion/client";

function Images() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<object[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<object>();
  // const [selectedImageDescription, setSelectedImageDescription] = useState(""); // for later if we want to show the description after opening the image
  const imagesPerPage = 10;

  const handleImageClick = (image) => {
    setSelectedImage(image);
    // setSelectedImageDescription(image.image_description);
  };

  const handleClickOutside = () => {
    setSelectedImage(null);
  };

  const handleDeleteWithAnimation = () => {
    deleteImage(selectedImage);
    setSelectedImage(null);
  };

  // Pagination logic
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(images.length / imagesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get_images");
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (image: object) => {
    await fetch(`http://127.0.0.1:8000/api/delete_image/${image.id}`, {
      method: "DELETE",
    });
    getImages();
  };

  return (
    <>
      {loading ? (
        <h1 style={{ color: "beige" }}>Loading...</h1>
      ) : (
        <>
          {images.length > 0 ? (
            <>
              <motion.div className="image-grid" layout>
                {/* Grid layout with motion.div */}

                {currentImages.map((image, index) => (
                  <motion.div
                    className="image-container"
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => {
                      handleImageClick(image);
                    }}
                  >
                    {/* Image Description Overlay */}
                    <motion.div
                      className="image-description"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        padding: "10px",
                        textAlign: "center",
                        fontSize: "0.9rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        opacity: 0,
                        zIndex: 10000,
                      }}
                    >
                      {image.image_description || "No description"}
                    </motion.div>

                    {/* Image Itself */}
                    <motion.img
                      src={image.image}
                      alt="Uploaded"
                      className="image"
                      style={{
                        objectFit: "cover",
                      }}
                      whileHover={{ scale: 1.05 }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Enlarged Image on click */}
              {selectedImage && (
                <>
                  <AnimatePresence>
                    <motion.div
                      className="expanded-image-container"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        flexDirection: "column-reverse",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                      }}
                      onClick={() => {
                        handleClickOutside();
                      }}
                    >
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents triggering the click outside event
                          handleDeleteWithAnimation();
                        }}
                      >
                        <svg viewBox="0 0 448 512" className="svgIcon">
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                        </svg>
                      </button>
                      <motion.img
                        src={selectedImage.image}
                        initial={{ scale: 0.7 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.7 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          maxWidth: "90%",
                          maxHeight: "90%",
                          objectFit: "contain",
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
                      />
                    </motion.div>
                  </AnimatePresence>
                </>
              )}
              {/* Pagination controls */}
              <motion.div
                className="pagination"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <button
                  className={
                    currentPage === 1 ? "glowbutton-disabled" : "glowbutton"
                  }
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span style={{ zIndex: 1, color: "beige" }}>
                  Page {currentPage} of{" "}
                  {Math.ceil(images.length / imagesPerPage)}
                </span>
                <button
                  className={
                    currentPage === Math.ceil(images.length / imagesPerPage)
                      ? "glowbutton-disabled"
                      : "glowbutton"
                  }
                  onClick={handleNextPage}
                  disabled={
                    currentPage === Math.ceil(images.length / imagesPerPage)
                  }
                >
                  Next
                </button>
              </motion.div>
            </>
          ) : (
            <h1 className="p-4" style={{ color: "beige" }}>
              No Images yet!
              <br />
              Go back and add images
            </h1>
          )}
        </>
      )}
    </>
  );
}

export default Images;
