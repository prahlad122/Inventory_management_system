function ItemForm({
  categories,
  subCategories,
  taxes,

  categoryId,
  setCategoryId,

  subCategoryId,
  setSubCategoryId,

  itemName,
  setItemName,

  sku,
  setSku,

  purchasePrice,
  setPurchasePrice,

  sellingPrice,
  setSellingPrice,

  unit,
  setUnit,

  taxId,
  setTaxId,

  status,
  setStatus,

  handleSubmit,

  editId,
}) {

  const filteredSubCategories = subCategories.filter(
    (sub) => sub.categoryId === Number(categoryId)
  );

  return (
    <div className="card shadow border-0 rounded-4">

      <div className="card-header bg-primary text-white">
        <h5 className="mb-0 fw-bold">
          {editId ? "Update Item" : "Create Item"}
        </h5>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          {/* Category */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Category
            </label>

            <select
              className="form-select"
              value={categoryId}
              onChange={(e) =>
                setCategoryId(Number(e.target.value))
              }
            >
              <option value="">Select Category</option>

              {categories.map((category) => (

                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.categoryName}
                </option>

              ))}

            </select>

          </div>

          {/* Sub Category */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Sub Category
            </label>

            <select
              className="form-select"
              value={subCategoryId}
              onChange={(e) =>
                setSubCategoryId(Number(e.target.value))
              }
            >
              <option value="">
                Select Sub Category
              </option>

              {filteredSubCategories.map((sub) => (

                <option
                  key={sub.id}
                  value={sub.id}
                >
                  {sub.subCategoryName}
                </option>

              ))}

            </select>

          </div>

          {/* Item Name */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Item Name
            </label>

            <input
              className="form-control"
              placeholder="Enter Item Name"
              value={itemName}
              onChange={(e) =>
                setItemName(e.target.value)
              }
            />

          </div>

          {/* SKU */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              SKU / HSN Code
            </label>

            <input
              className="form-control"
              placeholder="Enter SKU / HSN"
              value={sku}
              onChange={(e) =>
                setSku(e.target.value)
              }
            />

          </div>

          {/* Purchase Price */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Purchase Price
            </label>

            <input
              type="number"
              className="form-control"
              value={purchasePrice}
              onChange={(e) =>
                setPurchasePrice(e.target.value)
              }
            />

          </div>

          {/* Selling Price */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Selling Price
            </label>

            <input
              type="number"
              className="form-control"
              value={sellingPrice}
              onChange={(e) =>
                setSellingPrice(e.target.value)
              }
            />

          </div>

          {/* Unit */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Unit
            </label>

            <select
              className="form-select"
              value={unit}
              onChange={(e) =>
                setUnit(e.target.value)
              }
            >
              <option value="">Select Unit</option>

              <option>Piece</option>
              <option>Kg</option>
              <option>Gram</option>
              <option>Liter</option>
              <option>Box</option>
              <option>Packet</option>
              <option>Dozen</option>

            </select>

          </div>

          {/* Tax */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Tax
            </label>

            <select
              className="form-select"
              value={taxId}
              onChange={(e) =>
                setTaxId(Number(e.target.value))
              }
            >
              <option value="">Select Tax</option>

              {taxes.map((tax) => (

                <option
                  key={tax.id}
                  value={tax.id}
                >
                  {tax.taxName} ({tax.percentage}%)
                </option>

              ))}

            </select>

          </div>

          {/* Status */}

          <div className="mb-4">

            <div className="form-check">

              <input
                className="form-check-input"
                type="checkbox"
                checked={status}
                onChange={(e) =>
                  setStatus(e.target.checked)
                }
                id="status"
              />

              <label
                htmlFor="status"
                className="form-check-label"
              >
                Active
              </label>

            </div>

          </div>

          <button
            className={`btn ${
              editId
                ? "btn-warning"
                : "btn-primary"
            } w-100`}
          >
            {editId ? "Update Item" : "Save Item"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ItemForm;