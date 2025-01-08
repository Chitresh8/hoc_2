import React, { useEffect, useState } from "react";

export const GetAPI = () => {
  const [api, setApi] = useState([]);
  const [page,setPage]=useState(1);
  const imagesPerPage=100;
  const [hasMoreImages,setHasMoreImages]=useState(true);
  useEffect(() => {
    const images = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?page=${page}&limit=${imagesPerPage}`
      );
      const res = await response.json();
      setApi(res.slice(0,100));
      // Check if we received any images
      if (res.length < imagesPerPage) {
        setHasMoreImages(false); // No more images available
      }
      setApi(prevApi=>[...prevApi,...res]);
      console.log("Result===>", res);
    };
    images();
  }, [page]);

  const loadMoreImages = () => {
    if (hasMoreImages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const proper = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    border: "3px solid darkblue",
    width: "100%",
    margin: "10px 0", // Added margin for better spacing
  };

  
    return (
    <div>
      <h3>Api data</h3>
      {api.length === 0 ? ( // Check if there are no images to display
        <p>No images to display.</p>
      ) : (api.map((item) => {
        return (
          <div style={proper} key={item.url}>
            <th>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <img src={item.url} alt={item.url} />
              </td>
              <td>{item.albumId}</td>
              <td>
                <img src={item.thumbnailUrl} alt={item.thumbnailUrl} />
              </td>
            </th>
          </div>
        );
      }))}
      {hasMoreImages && ( // Only show button if there are more images
        <button onClick={loadMoreImages}>Load More</button>
      )}
      {!hasMoreImages && api.length > 0 && ( // Show message when no more images to load
        <p>Showing all images.</p>
      )}
    </div>
  );
};
