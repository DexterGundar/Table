import React from "react";

export default function Selector({ order, setOrder, sortBy, setSortBy }) {
  return (
    <div className="selector">
      <div className="sort-by">
        <p>Sort by: </p>
        <select
          name="sort-by"
          onChange={(e) => setSortBy(e.target.value)}
          defaultValue={sortBy}
        >
          <option value="name">vārds</option>
          <option value="lastName">uzvārds</option>
        </select>
      </div>
      <div className="order">
        <p>Order: </p>
        <button
          onClick={(e) => setOrder((val) => (val === "asc" ? "desc" : "asc"))}
        >
          {order}
        </button>
      </div>
    </div>
  );
}
