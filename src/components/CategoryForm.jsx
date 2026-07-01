function CategoryForm({
  categoryName,
  setCategoryName,
  status,
  setStatus,
  handleSubmit,
  editId,
}) {
  return (
    <div className="card shadow-sm border-0 rounded-3">

      {/* Card Header */}
      <div className="card-header bg-primary text-white py-3">
        <h5 className="mb-0">
          {editId ? "Update Category" : "Create Category"}
        </h5>
      </div>

      {/* Card Body */}
      <div className="card-body">

        <form onSubmit={handleSubmit}>

          {/* Category Name */}
          <div className="mb-4">

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

            <label className="form-label fw-semibold d-block">
              Status
            </label>

            <div className="form-check form-switch">

              <input
                className="form-check-input"
                type="checkbox"
                checked={status}
                onChange={() =>
                  setStatus(!status)
                }
              />

              <label className="form-check-label">

                {status ? "Active" : "Inactive"}

              </label>

            </div>

          </div>

          {/* Buttons */}

          <div className="d-grid">

            <button
              type="submit"
              className={`btn ${
                editId
                  ? "btn-warning"
                  : "btn-primary"
              }`}
            >
              {editId
                ? "Update Category"
                : "Save Category"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CategoryForm;