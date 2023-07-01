import React from "react";

export const ImageGalleryItem = ({ image, onItemClick }) => {
    return (
      <li className="gallery-item" onClick={() => onItemClick(image.largeImageURL)}>
        <img src={image.webformatURL} alt="" />
      </li>
    );
};
