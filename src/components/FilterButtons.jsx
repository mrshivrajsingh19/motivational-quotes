import React from 'react';

function FilterButtons({ filter, setFilter }) {
  return (
    <div className="filters">
      <button
        className={"motivation-btn filter" + (filter === "all" ? " active" : "")}
        onClick={() => setFilter("all")}
      >
        📌 All
      </button>
      <button
        className={"motivation-btn filter" + (filter === "liked" ? " active" : "")}
        onClick={() => setFilter("liked")}
      >
        💗 Liked
      </button>
      <button
        className={"motivation-btn filter" + (filter === "unliked" ? " active" : "")}
        onClick={() => setFilter("unliked")}
      >
        📋 Unliked
      </button>
    </div>
  );
}

export default FilterButtons;
