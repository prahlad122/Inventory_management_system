import { useEffect, useState } from "react";
import SubCategoryForm from "../components/SubCategoryForm";
import SubCategoryList from "../components/SubCategoryList";

function SubCategoryMaster() {
  // State

  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState(true);

  const [editId, setEditId] = useState(null);

  // Load Data

  useEffect(() => {
    const storedSubCategories =
      JSON.parse(localStorage.getItem("subCategories")) || [];

    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];

    setSubCategories(storedSubCategories);
    setCategories(storedCategories);
  }, []);

  // Save Data

  useEffect(() => {
    localStorage.setItem("subCategories", JSON.stringify(subCategories));
  }, [subCategories]);

  // Submit

  const handleSubmit = (e) => {
    e.preventDefault();

    if (subCategoryName.trim() === "") {
      alert("SubCategory Name is Required");
      return;
    }

    if (categoryId === "") {
      alert("Please Select Category");
      return;
    }

    if (editId !== null) {
      const updatedData = subCategories.map((item) =>
        item.id === editId
          ? {
              ...item,
              subCategoryName,
              categoryId,
              status,
            }
          : item,
      );

      setSubCategories(updatedData);
      setEditId(null);
    } else {
      const newSubCategory = {
        id: Date.now(),
        subCategoryName,
        categoryId,
        status,
      };

      setSubCategories([...subCategories, newSubCategory]);
    }

    // Reset Form

    setSubCategoryName("");
    setCategoryId("");
    setStatus(true);
  };

   
  // Delete
 

  const handleDelete = (id) => {
    if (window.confirm("Delete Sub Category ?")) {
      const filtered = subCategories.filter((item) => item.id !== id);

      setSubCategories(filtered);
    }
  };

 
  // Edit
 

  const handleEdit = (item) => {
    setSubCategoryName(item.subCategoryName);
    setCategoryId(item.categoryId);
    setStatus(item.status);
    setEditId(item.id);
  };

  return (
    <div className="container-fluid py-4">
      {/* Heading */}

      <div className="mb-4">
        <h2 className="fw-bold">Sub Category Master</h2>

        <p className="text-muted">Create, Update and Manage Sub Categories</p>
      </div>

      {/* Responsive Layout */}

      <div className="row g-4">
        {/* Form */}

        <div className="col-12 col-lg-4 ">
          <SubCategoryForm
            categories={categories}
            subCategoryName={subCategoryName}
            setSubCategoryName={setSubCategoryName}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            status={status}
            setStatus={setStatus}
            handleSubmit={handleSubmit}
            editId={editId}
          />
        </div>

        {/* List */}

        <div className="col-12 col-lg-8">
          <SubCategoryList
            subCategories={subCategories}
            categories={categories}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default SubCategoryMaster;
