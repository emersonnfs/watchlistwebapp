import React from "react";
const ContentTypeButton = ({ contentType, setContentType }) => {
  return (
    <div className="mb-4">
      <button
        onClick={() => setContentType("movies")}
        className={`${
          contentType === "movies"
            ? "bg-gray-600 text-white"
            : "bg-gray-300 text-gray-700"
        } px-4 py-2 rounded-md mr-2 focus:outline-none`}
      >
        Filmes
      </button>
      <button
        onClick={() => setContentType("series")}
        className={`${
          contentType === "series"
            ? "bg-gray-600 text-white"
            : "bg-gray-300 text-gray-700"
        } px-4 py-2 rounded-md focus:outline-none`}
      >
        Séries
      </button>
    </div>
  );
};

export default ContentTypeButton;
