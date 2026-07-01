function SubCategoryForm({
  categories,
  subCategoryName,
  setSubCategoryName,
  categoryId,
  setCategoryId,
  status,
  setStatus,
  handleSubmit,
  editId,
}) {
  return (
    <div className="card shadow border-0 rounded-4">

      <div className="card-header bg-primary text-white rounded-top-4">
        <h5 className="mb-0 fw-bold">
          {editId ? "Update Sub Category" : "Create Sub Category"}
        </h5>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          {/* Category Dropdown */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Category
            </label>

            <select
              className="form-select"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.categoryName}
                </option>
              ))}

            </select>

          </div>

          {/* Sub Category Name */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Sub Category Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Sub Category Name"
              value={subCategoryName}
              onChange={(e) =>
                setSubCategoryName(e.target.value)
              }
            />

          </div>

          {/* Status */}

          <div className="mb-4">

            <div className="form-check form-switch">

              <input
                className="form-check-input"
                type="checkbox"
                checked={status}
                onChange={() => setStatus(!status)}
              />

              <label className="form-check-label fw-semibold">
                {status ? "Active" : "Inactive"}
              </label>

            </div>

          </div>

          {/* Submit Button */}

          <button
            type="submit"
            className={`btn ${
              editId ? "btn-warning" : "btn-primary"
            } w-100`}
          >
            {editId ? "Update Sub Category" : "Add Sub Category"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default SubCategoryForm;