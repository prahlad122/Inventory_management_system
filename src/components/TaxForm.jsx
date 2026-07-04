function TaxForm({
  taxName,
  setTaxName,

  taxType,
  setTaxType,

  percentage,
  setPercentage,

  description,
  setDescription,

  status,
  setStatus,

  handleSubmit,

  editId,
}) {
  return (
    <div className="card shadow border-0 rounded-4">
      {/* Card Header */}

      <div className="card-header bg-primary text-white py-3">
        <h5 className="mb-0 fw-bold">{editId ? "Update Tax" : "Create Tax"}</h5>
      </div>

      {/* Card Body */}

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Tax Name */}

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Tax Name <span className="text-danger">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Example : GST 18%"
              value={taxName}
              onChange={(e) => setTaxName(e.target.value)}
            />
          </div>

          {/* Tax Type */}

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Tax Type <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={taxType}
              onChange={(e) => setTaxType(e.target.value)}
            >
              <option value="GST">GST</option>

              <option value="IGST">IGST</option>

              <option value="CGST + SGST">CGST + SGST</option>

              <option value="Exempt">Exempt</option>
            </select>
          </div>

          {/* GST Percentage */}

          <div className="mb-3">
            <label className="form-label fw-semibold">
              GST Percentage
              <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            >
              <option value="">Select GST Rate</option>

              <option value="0">0%</option>

              <option value="5">5%</option>

              <option value="12">12%</option>

              <option value="18">18%</option>

              <option value="28">28%</option>
            </select>
          </div>

          {/* Description */}

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>

            <textarea
              rows="3"
              className="form-control"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Status */}

          <div className="mb-4">
            <div className="form-check">
              <input
                type="checkbox"
                id="status"
                className="form-check-input"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />

              <label htmlFor="status" className="form-check-label fw-semibold">
                Active
              </label>
            </div>
          </div>

          {/* Button */}

          <button
            type="submit"
            className={`btn ${editId ? "btn-warning" : "btn-primary"} w-100`}
          >
            {editId ? "Update Tax" : "Save Tax"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaxForm;
