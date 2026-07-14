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
          {/* Sub Category Name */}

          <div className="mb-3">
            <label className="form-label fw-semibold">Sub Category Name</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Sub Category Name"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
            />
          </div>

          {/* Category Dropdown */}

          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>

            <select
              className="form-select"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}

          <div className="mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="status"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />

              <label className="form-check-label fw-semibold" htmlFor="status">
                Active
              </label>
            </div>
          </div>

          {/* Submit Button */}

          <button
            className={`btn btn-sm ${editId ? "btn-warning" : "btn-primary"}`}
            style={{ width: "6rem" }}
          >
            {editId ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubCategoryForm;
