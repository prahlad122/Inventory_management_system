function TaxList({ taxes, handleEdit, handleDelete }) {
  return (
    <div className="card shadow border-0 rounded-4">
      {/* Card Header */}

      <div className="card-header bg-success text-white py-3">
        <h5 className="mb-0 fw-bold">Tax List</h5>
      </div>

      {/* Card Body */}

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th width="60">#</th>

                <th>Tax Name</th>

                <th>Tax Type</th>

                <th>GST %</th>

                <th>Description</th>

                <th>Status</th>

                <th width="150">Action</th>
              </tr>
            </thead>

            <tbody>
              {taxes.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    No Tax Records Found
                  </td>
                </tr>
              ) : (
                taxes.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    <td className="fw-semibold">{item.taxName}</td>

                    <td>
                      <span className="badge bg-info text-dark">
                        {item.taxType}
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-primary">
                        {item.percentage}%
                      </span>
                    </td>

                    <td>{item.description || "-"}</td>

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

export default TaxList;
