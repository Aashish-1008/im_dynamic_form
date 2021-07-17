import React, { useState, useEffect } from "react";
import Form from "@rjsf/core";
import {
  addItem,
  fetchItems,
  removeItem,
  fetchProductItemFormSchema,
  editItem,
} from "../api";

import ItemList from "../components/ItemList";
import ItemCount from "../components/ItemCount";

const uiSchema = {
  itemList: {
    "ui:enumDisabled": ["Food", "Utencils", "Toys"],
  },
};

const ItemsListForm = (props) => {
  const [savedFormData, setSavedFormData] = useState({});
  const [items, setItems] = useState([]);
  const [formSchema, setFormSchema] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formSchema = await fetchProductItemFormSchema();
        setFormSchema(formSchema);

        const fetchedItems = await fetchItems();
        setItems(fetchedItems);
      } catch (error) {
        setErrorMessage(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = ({ formData }) => {
    const addProduct = async () => {
      try {
        let fetchedItems = [];
        if (!selectedItem) fetchedItems = await addItem(formData);
        else
          fetchedItems = await editItem(selectedItem["product_id"], formData);

        setItems(fetchedItems);
        setSavedFormData({});
        setSelectedItem(null);
      } catch (error) {
        setErrorMessage(error);
      }
    };
    addProduct();
  };

  const handleChange = ({ formData }) => {
    if (formData?.itemList !== savedFormData?.itemList) {
      setSavedFormData({ itemList: formData?.itemList });
    } else {
      setSavedFormData({ ...formData });
    }
  };

  const handleEditClick = (item) => {
    setSavedFormData({ ...item });
    setSelectedItem(item);
  };

  const handleDeleteClick = (item) => {
    const deleteProduct = async () => {
      try {
        const fetchedItems = await removeItem(item["product_id"]);
        setItems(fetchedItems);
      } catch (error) {
        setErrorMessage(error);
      }
    };
    deleteProduct();
  };

  return (
    <div>
      <Form
        formData={savedFormData}
        schema={formSchema}
        uiSchema={uiSchema}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />

      {errorMessage ? errorMessage : ""}
      <ItemCount items={items} />
      <ItemList
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        items={items}
      />
    </div>
  );
};

export default ItemsListForm;
