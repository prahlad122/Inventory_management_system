function ItemList({
  items,
  categories,
  subCategories,
  taxes,
  handleEdit,
  handleDelete,
}) {
  const getCategoryName = (id) => {
    const category = categories.find((item) => item.id === id);

    return category ? category.categoryName : "-";
  };

  const getSubCategoryName = (id) => {
    const subCategory = subCategories.find((item) => item.id === id);

    return subCategory ? subCategory.subCategoryName : "-";
  };

  const getTax = (id) => {
    const tax = taxes.find((item) => item.id === id);

    if (!tax) return "-";

    return `${tax.taxName} (${tax.taxType} - ${tax.percentage}%)`;
  };

  return (
    <div className="card shadow border-0 rounded-4">
      {/* Header */}

      <div className="card-header bg-success text-white py-3">
        <h5 className="mb-0 fw-bold">Item List</h5>
      </div>

      {/* Body */}

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>

                <th>Category</th>

                <th>Sub Category</th>

                <th>Item Name</th>

                <th>Item Code</th>

                <th>Purchase</th>

                <th>Selling</th>

                <th>Unit</th>

                <th>Tax</th>

                <th>Status</th>

                <th width="150">Action</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center py-4 text-muted">
                    No Items Found
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    <td>{getCategoryName(item.categoryId)}</td>

                    <td>{getSubCategoryName(item.subCategoryId)}</td>

                    <td className="fw-semibold">{item.itemName}</td>

                    <td>{item.sku || "-"}</td>

                    <td>₹ {item.purchasePrice}</td>

                    <td>₹ {item.sellingPrice}</td>

                    <td>{item.unit}</td>

                    <td>
                      <span className="badge bg-info text-dark">
                        {getTax(item.taxId)}
                      </span>
                    </td>

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
                      <div className="d-flex flex-column flex-md-row gap-2">
                        <button
                          className="btn btn-warning btn-sm flex-fill"
                          onClick={() => handleEdit(item)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                          className="btn btn-danger btn-sm flex-fill"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
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

export default ItemList;
