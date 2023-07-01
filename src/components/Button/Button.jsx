import React from "react";

export const Button = ({ onClick }) => {
    return (
      <button type='button' className="load-more" onClick={onClick}>
        Load More
      </button>
    );
};
