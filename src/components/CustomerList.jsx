function CustomerList({
  customers,
  handleEdit,
  handleDelete,
}) {

  return (

    <div className="card shadow border-0 rounded-4">

      {/* Header */}

      <div className="card-header bg-success text-white py-3">

        <h5 className="mb-0 fw-bold">

          Customer List

        </h5>

      </div>

      {/* Body */}

      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-hover table-bordered align-middle">

            <thead className="table-dark">

              <tr>

                <th width="60">#</th>

                <th>Customer</th>

                <th>Mobile</th>

                <th>Email</th>

                <th>GSTIN</th>

                <th>City</th>

                <th>State</th>

                <th>Status</th>

                <th width="150">Action</th>

              </tr>

            </thead>

            <tbody>

              {customers.length === 0 ? (

                <tr>

                  <td
                    colSpan="9"
                    className="text-center py-4 text-muted"
                  >

                    No Customers Found

                  </td>

                </tr>

              ) : (

                customers.map((customer, index) => (

                  <tr key={customer.id}>

                    <td>

                      {index + 1}

                    </td>

                    <td>

                      <div className="fw-semibold">

                        {customer.customerName}

                      </div>

                    </td>

                    <td>

                      {customer.mobile}

                    </td>

                    <td>

                      {customer.email || "-"}

                    </td>

                    <td>

                      {customer.gstin || "-"}

                    </td>

                    <td>

                      {customer.city || "-"}

                    </td>

                    <td>

                      {customer.state}

                    </td>

                    <td>

                      <span
                        className={`badge rounded-pill px-3 py-2 ${
                          customer.status
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >

                        {customer.status
                          ? "Active"
                          : "Inactive"}

                      </span>

                    </td>

                    <td>

                      <div className="d-flex flex-column flex-md-row gap-2">

                        <button
                          className="btn btn-warning btn-sm flex-fill"
                          onClick={() =>
                            handleEdit(customer)
                          }
                        >

                          <i className="bi bi-pencil-square"></i>

                        </button>

                        <button
                          className="btn btn-danger btn-sm flex-fill"
                          onClick={() =>
                            handleDelete(customer.id)
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

export default CustomerList;