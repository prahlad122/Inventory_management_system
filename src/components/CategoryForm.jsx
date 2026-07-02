function CategoryForm({
  categoryName,
  setCategoryName,
  status,
  setStatus,
  handleSubmit,
  editId,
}) {
  return (
    <div className="card shadow border-0 rounded-4">

      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          {editId ? "Update Category" : "Create Category"}
        </h5>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          {/* Category Name */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Category Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Category Name"
              value={categoryName}
              onChange={(e) =>
                setCategoryName(e.target.value)
              }
            />

          </div>

          {/* Status */}

          <div className="mb-4">

            <div className="form-check">

              <input
                className="form-check-input"
                type="checkbox"
                id="status"
                checked={status}
                onChange={(e) =>
                  setStatus(e.target.checked)
                }
              />

              <label
                className="form-check-label fw-semibold"
                htmlFor="status"
              >
                Active
              </label>

            </div>

          </div>

          {/* Button */}

          <button
            className={`btn ${
              editId
                ? "btn-warning"
                : "btn-primary"
            } w-100`}
          >
            {editId
              ? "Update Category"
              : "Save Category"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CategoryForm;