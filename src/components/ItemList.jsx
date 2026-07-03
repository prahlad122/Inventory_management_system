function ItemList({
  items,
  categories,
  subCategories,
  taxes,
  handleEdit,
  handleDelete,
}) {

  const getCategory = (id) =>
    categories.find((c) => c.id === id)?.categoryName || "-";

  const getSubCategory = (id) =>
    subCategories.find((s) => s.id === id)?.subCategoryName || "-";

  const getTax = (id) => {
    const tax = taxes.find((t) => t.id === id);

    return tax
      ? `${tax.taxName} (${tax.percentage}%)`
      : "-";
  };

  return (

    <div className="card shadow border-0 rounded-4">

      <div className="card-header bg-success text-white">

        <h5 className="mb-0 fw-bold">
          Item List
        </h5>

      </div>

      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">

              <tr>

                <th>#</th>

                <th>Category</th>

                <th>Sub Category</th>

                <th>Item</th>

                <th>SKU</th>

                <th>Purchase</th>

                <th>Selling</th>

                <th>Unit</th>

                <th>Tax</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {items.length === 0 ? (

                <tr>

                  <td
                    colSpan="11"
                    className="text-center py-4"
                  >
                    No Items Found
                  </td>

                </tr>

              ) : (

                items.map((item, index) => (

                  <tr key={item.id}>

                    <td>{index + 1}</td>

                    <td>{getCategory(item.categoryId)}</td>

                    <td>{getSubCategory(item.subCategoryId)}</td>

                    <td>{item.itemName}</td>

                    <td>{item.sku}</td>

                    <td>₹ {item.purchasePrice}</td>

                    <td>₹ {item.sellingPrice}</td>

                    <td>{item.unit}</td>

                    <td>{getTax(item.taxId)}</td>

                    <td>

                      <span
                        className={`badge ${
                          item.status
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {item.status
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </td>

                    <td>

                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            handleEdit(item)
                          }
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(item.id)
                          }
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