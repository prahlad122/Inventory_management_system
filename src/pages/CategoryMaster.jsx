import { useEffect, useState } from "react";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";

function CategoryMaster() {
  const [categories, setCategories] = useState([]);

  const [categoryName, setCategoryName] = useState("");

  const [status, setStatus] = useState(false);

  const [editId, setEditId] = useState(null);

  // Load Data From LocalStorage

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("categories")) || [];

    setCategories(storedData);
  }, []);

  // Save Data

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // Add / Update

  const handleSubmit = (e) => {
    e.preventDefault();

    if (categoryName.trim() === "") {
      alert("Category Name is Required");
      return;
    }

    if (editId !== null) {
      const updatedData = categories.map((item) =>
        item.id === editId
          ? {
              ...item,
              categoryName,
              status,
            }
          : item,
      );

      setCategories(updatedData);

      setEditId(null);
    } else {
      const newCategory = {
        id: Date.now(),

        categoryName,

        status,
      };

      setCategories([...categories, newCategory]);
    }

    setCategoryName("");

    setStatus(false);
  };

  // ===========================
  // Delete
  // ===========================

  const handleDelete = (id) => {
    if (window.confirm("Delete Category ?")) {
      const filtered = categories.filter((item) => item.id !== id);

      setCategories(filtered);
    }
  };

  // ===========================
  // Edit
  // ===========================

  const handleEdit = (item) => {
    setCategoryName(item.categoryName);

    setStatus(item.status);

    setEditId(item.id);
  };

  return (
    <div className="container-fluid py-4">
      {/* Heading */}

      <div className="mb-4">
        <h2 className="fw-bold">Category Master</h2>

        <p className="text-muted">Create, Update and Manage Categories</p>
      </div>

      {/* Responsive Layout */}

      <div className="row g-4">
        {/* Create Form */}

        <div className="col-xl-4 col-lg-5 col-md-12">
          <CategoryForm
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            status={status}
            setStatus={setStatus}
            handleSubmit={handleSubmit}
            editId={editId}
          />
        </div>

        {/* Category List */}

        <div className="col-xl-8 col-lg-7 col-md-12">
          <CategoryList
            categories={categories}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryMaster;
