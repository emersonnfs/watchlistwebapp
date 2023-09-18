import React, { useState } from "react";

const Section = ({ title, data }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleArrowClick = (direction) => {
    if (direction === "next") {
      setStartIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 5));
    } else if (direction === "prev") {
      setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const visibleData = data.slice(startIndex, startIndex + 5);

  return (
    <div className="bg-gray-300 p-4 mt-6 rounded-lg">
      <h2 className="text-2xl text-gray-700 mb-4">{title}</h2>
      <div className="flex space-x-4">
        {visibleData.map((item) => (
          <div key={item.id} className="bg-gray-100 p-2 rounded-lg w-full">
            <img
              src={`https://picsum.photos/200?random=${item.id}`}
              alt={item.nome}
              className="w-full h-48 object-cover"
            />
            <p>{item.nome}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={() => handleArrowClick("prev")}
          className="bg-gray-300 hover:bg-gray-300 px-2 py-1 rounded-md mr-2"
          disabled={startIndex === 0} // Disable the previous button at the beginning
        >
          Anterior
        </button>
        <button
          onClick={() => handleArrowClick("next")}
          className="bg-gray-300 hover:bg-gray-300 px-2 py-1 rounded-md"
          disabled={startIndex + 5 >= data.length} // Disable the next button at the end
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default Section;
