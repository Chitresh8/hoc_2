import React, { useState, useEffect } from "react";

export const GetApiPagination = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1); // Start at page 1
  const [totalPages, setTotalPages] = useState(0); // To track total pages
  const imagesPerPage = 50; // Set images per page to 50

  function greet(name) {
    // console.log('Hello, ' + name + '!');
    console.log (`Hello ${name}`);
}

// Calling the function
greet('Geek'); 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos?page=${page}&limit=${imagesPerPage}`
        );
        const data = await response.json();
          // Set images directly from the fetched data
          setImages(data);

        // Check if data.images exists and is an array
        if (Array.isArray(data.images)) {
          // Assuming the API returns the total number of images
          setImages(data.images);
          setTotalPages(Math.ceil(data.total / imagesPerPage)); // Calculate total pages
        } else {
          console.error("Images data is not an array:", data.images);
          setImages([]); // Reset images to avoid undefined issues
          setTotalPages(0); // Reset total pages
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, [page]);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  let string = 'Reversed...!!!';
  let stre = '';
  
  const stringReverse = (stre) => {
      return stre.split("").reverse().join(" ");
  };
  
  console.log("Result===>", stringReverse(string));

  return (
    <div>
      <div className="gallery">
        {images.map((image, index) => (
          <img key={index} src={image.url} alt={image.alt} />
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === page} // Disable button for the current page
          >
            {index + 1}
          </button>
        ))}
      </div>
      <progress></progress>
      <nav></nav>
      <time></time>
      <mark></mark> <summary></summary> <meter></meter> <figure></figure> <details></details> <aside></aside> <article></article>
    </div>
  );
};
