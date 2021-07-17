import React from "react";

const ItemCount = (props) => {
  return (
    <div className="w3-bar">
      {props.items.length > 0 ? (
        <h4>{`Total Product Items Added: ${props.items.length}`}</h4>
      ) : null}
    </div>
  );
};

export default ItemCount;
