function TaxList({
  taxes,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="card shadow border-0 rounded-4">

      <div className="card-header bg-success text-white">
        <h5 className="mb-0 fw-bold">
          Tax List
        </h5>
      </div>

      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-hover table-bordered align-middle">

            <thead className="table-dark">

              <tr>

                <th>#</th>

                <th>Tax Name</th>

                <th>Percentage</th>

                <th>Status</th>

                <th width="160">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {taxes.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-4 text-muted"
                  >
                    No Tax Found
                  </td>

                </tr>

              ) : (

                taxes.map((item, index) => (

                  <tr key={item.id}>

                    <td>{index + 1}</td>

                    <td>{item.taxName}</td>

                    <td>
                      {item.percentage}%
                    </td>

                    <td>

                      <span
                        className={`badge rounded-pill px-3 py-2 ${
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

export default TaxList;