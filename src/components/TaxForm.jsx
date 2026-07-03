function TaxForm({
  taxName,
  setTaxName,

  percentage,
  setPercentage,

  status,
  setStatus,

  handleSubmit,

  editId,
}) {
  return (
    <div className="card shadow border-0 rounded-4">

      <div className="card-header bg-primary text-white">
        <h5 className="mb-0 fw-bold">
          {editId ? "Update Tax" : "Create Tax"}
        </h5>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          {/* Tax Name */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Tax Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Tax Name"
              value={taxName}
              onChange={(e) =>
                setTaxName(e.target.value)
              }
            />

          </div>

          {/* Tax Percentage */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Tax Percentage (%)
            </label>

            <input
              type="number"
              className="form-control"
              placeholder="Enter Percentage"
              value={percentage}
              onChange={(e) =>
                setPercentage(e.target.value)
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
            type="submit"
            className={`btn ${
              editId
                ? "btn-warning"
                : "btn-primary"
            } w-100`}
          >
            {editId
              ? "Update Tax"
              : "Save Tax"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default TaxForm;