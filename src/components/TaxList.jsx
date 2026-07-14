function TaxList({ taxes, handleEdit, handleDelete }) {
  return (
    <div className="card shadow border-0 rounded-4 h-100">
      {/* Card Header */}

      <div className="card-header bg-success text-white py-3 px-3 px-md-4">
        <h5 className="mb-0 fw-bold text-center text-md-start">
          Tax List
        </h5>
      </div>

      {/* Card Body */}

      <div className="card-body p-2 p-sm-3 p-md-4">
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle mb-0">
            <thead className="table-dark text-center">
              <tr>
                <th style={{ minWidth: "60px" }}>#</th>

                <th style={{ minWidth: "150px" }}>Tax Name</th>

                <th style={{ minWidth: "140px" }}>Tax Type</th>

                <th style={{ minWidth: "90px" }}>GST %</th>

                <th style={{ minWidth: "200px" }}>Description</th>

                <th style={{ minWidth: "110px" }}>Status</th>

                <th style={{ minWidth: "120px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {taxes.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    No Tax Records Found
                  </td>
                </tr>
              ) : (
                taxes.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-center">{index + 1}</td>

                    <td className="fw-semibold text-break">
                      {item.taxName}
                    </td>

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

                    <td className="text-break">
                      {item.description || "-"}
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
                      <div className="d-flex justify-content-center gap-2 flex-nowrap">
                        <button
                          className="btn btn-warning btn-sm"
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