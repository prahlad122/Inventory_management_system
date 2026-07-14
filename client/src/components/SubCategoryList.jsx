function SubCategoryList({
  subCategories,
  categories,
  handleEdit,
  handleDelete,
}) {
  // Get Category Name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((item) => item.id === categoryId);

    return category ? category.categoryName : "N/A";
  };

  return (
    <div className="card shadow border-0 rounded-4">
      {/* Card Header */}

      <div className="card-header bg-success text-white rounded-top-4">
        <h5 className="mb-0 fw-bold">Sub Category List</h5>
      </div>

      {/* Card Body */}

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>

                <th>Category</th>

                <th>Sub Category</th>

                <th>Status</th>

                <th width="160">Action</th>
              </tr>
            </thead>

            <tbody>
              {subCategories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No Sub Categories Found
                  </td>
                </tr>
              ) : (
                subCategories.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    <td>{getCategoryName(item.categoryId)}</td>

                    <td>{item.subCategoryName}</td>

                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-2 ${
                          item.status ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {item.status ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(item)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SubCategoryList;
