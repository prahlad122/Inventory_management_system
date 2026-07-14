import { useEffect, useState } from "react";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";

function ItemMaster() {
  // State

  const [items, setItems] = useState([]);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [taxes, setTaxes] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const [itemName, setItemName] = useState("");
  const [sku, setSku] = useState("");

  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const [unit, setUnit] = useState("");

  const [taxId, setTaxId] = useState("");

  const [status, setStatus] = useState(false);

  const [editId, setEditId] = useState(null);

  // Load Local Storage

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("items")) || []);

    setCategories(JSON.parse(localStorage.getItem("categories")) || []);

    setSubCategories(JSON.parse(localStorage.getItem("subCategories")) || []);

    setTaxes(JSON.parse(localStorage.getItem("taxes")) || []);
  }, []);

  // Save Items

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // Submit

  const handleSubmit = (e) => {
    e.preventDefault();

    if (categoryId === "") {
      alert("Select Category");
      return;
    }

    if (subCategoryId === "") {
      alert("Select Sub Category");
      return;
    }

    if (itemName.trim() === "") {
      alert("Item Name is Required");
      return;
    }

    if (purchasePrice === "") {
      alert("Purchase Price Required");
      return;
    }

    if (sellingPrice === "") {
      alert("Selling Price Required");
      return;
    }

    if (unit === "") {
      alert("Select Unit");
      return;
    }

    if (taxId === "") {
      alert("Select Tax");
      return;
    }

    if (editId !== null) {
      const updatedItems = items.map((item) =>
        item.id === editId
          ? {
              ...item,
              categoryId,
              subCategoryId,
              itemName,
              sku,
              purchasePrice,
              sellingPrice,
              unit,
              taxId,
              status,
            }
          : item,
      );

      setItems(updatedItems);

      setEditId(null);
    } else {
      const newItem = {
        id: Date.now(),

        categoryId,
        subCategoryId,

        itemName,

        sku,

        purchasePrice,

        sellingPrice,

        unit,

        taxId,

        status,
      };

      setItems([...items, newItem]);
    }

    // Reset Form

    setCategoryId("");
    setSubCategoryId("");

    setItemName("");
    setSku("");

    setPurchasePrice("");
    setSellingPrice("");

    setUnit("");

    setTaxId("");

    setStatus(false);
  };

  // Delete

  const handleDelete = (id) => {
    if (window.confirm("Delete Item ?")) {
      const filtered = items.filter((item) => item.id !== id);

      setItems(filtered);
    }
  };

  // Edit

  const handleEdit = (item) => {
    setCategoryId(item.categoryId);

    setSubCategoryId(item.subCategoryId);

    setItemName(item.itemName);

    setSku(item.sku);

    setPurchasePrice(item.purchasePrice);

    setSellingPrice(item.sellingPrice);

    setUnit(item.unit);

    setTaxId(item.taxId);

    setStatus(item.status);

    setEditId(item.id);
  };

  // JSX

  return (
    <div className="container-fluid py-4">
      {/* Heading */}

      <div className="mb-4">
        <h2 className="fw-bold">Item Master</h2>

        <p className="text-muted">Create, Update and Manage Items</p>
      </div>

      {/* Responsive Layout */}

      <div className="row g-4">
        {/* Form */}

        <div className="col-xl-4 col-lg-5 col-md-12">
          <ItemForm
            categories={categories}
            subCategories={subCategories}
            taxes={taxes}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            subCategoryId={subCategoryId}
            setSubCategoryId={setSubCategoryId}
            itemName={itemName}
            setItemName={setItemName}
            sku={sku}
            setSku={setSku}
            purchasePrice={purchasePrice}
            setPurchasePrice={setPurchasePrice}
            sellingPrice={sellingPrice}
            setSellingPrice={setSellingPrice}
            unit={unit}
            setUnit={setUnit}
            taxId={taxId}
            setTaxId={setTaxId}
            status={status}
            setStatus={setStatus}
            handleSubmit={handleSubmit}
            editId={editId}
          />
        </div>

        {/* List */}

        <div className="col-xl-8 col-lg-7 col-md-12">
          <ItemList
            items={items}
            categories={categories}
            subCategories={subCategories}
            taxes={taxes}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemMaster;
