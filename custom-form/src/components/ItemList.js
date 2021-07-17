import React from "react";

const ItemList = (props) => {
  return (
    <div>
      <ul className="w3-ul w3-card-4">
        {props.items.map((item) => (
          <li className="w3-bar" key={item.product_id}>
            <span
              onClick={() => props.handleDeleteClick(item)}
              className="w3-bar-item w3-button w3-xlarge w3-right"
            >
              Delete
            </span>
            <span
              onClick={() => props.handleEditClick(item)}
              className="w3-bar-item w3-button w3-xlarge w3-right"
            >
              Edit
            </span>
            <div className="w3-bar-item">
              <span className="w3-large">{item.itemList}</span>
              <br />
              <span>{item[item.itemList] ? item[item.itemList] : ""}</span>
              <br />
              <span>{"Qty:" + item["quantity"]}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
