import { useState } from "react";

function CategoryList({
  categories,
  handleEdit,
  handleDelete,
}) {

  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((item) =>
    item.categoryName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="card shadow-sm border-0">

      {/* Header */}

      <div className="card-header bg-success text-white d-flex justify-content-between align-items-center flex-wrap gap-2">

        <h5 className="mb-0">
          Category List
        </h5>

        <input
          type="text"
          className="form-control w-auto"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Body */}

      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-hover table-bordered align-middle">

            <thead className="table-light">

              <tr>

                <th width="8%">#</th>

                <th>Category Name</th>

                <th width="15%">Status</th>

                <th width="10%">Edit</th>

                <th width="10%">Delete</th>

              </tr>

            </thead>

            <tbody>

              {filteredCategories.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center text-muted py-4"
                  >
                    No Categories Found
                  </td>

                </tr>

              ) : (

                filteredCategories.map((item, index) => (

                  <tr key={item.id}>

                    <td>{index + 1}</td>

                    <td>{item.categoryName}</td>

                    <td>

                      {item.status ? (

                        <span className="badge bg-success">
                          Active
                        </span>

                      ) : (

                        <span className="badge bg-danger">
                          Inactive
                        </span>

                      )}

                    </td>

                    {/* Edit */}

                    <td className="text-center">

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          handleEdit(item)
                        }
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                    </td>

                    {/* Delete */}

                    <td className="text-center">

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(item.id)
                        }
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

export default CategoryList;