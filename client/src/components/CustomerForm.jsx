function CustomerForm({
  customerName,
  setCustomerName,

  mobile,
  setMobile,

  email,
  setEmail,

  gstin,
  setGstin,

  address,
  setAddress,

  city,
  setCity,

  state,
  setState,

  pincode,
  setPincode,

  status,
  setStatus,

  handleSubmit,

  editId,
}) {

  const indianStates = [

    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",

    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",

  ];

  return (

    <div className="card shadow border-0 rounded-4">

      {/* Header */}

      <div className="card-header bg-primary text-white py-3">

        <h5 className="mb-0 fw-bold">

          {editId
            ? "Update Customer"
            : "Create Customer"}

        </h5>

      </div>

      {/* Body */}

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          {/* Customer Name */}

          <div className="mb-3">

            <label className="form-label fw-semibold">

              Customer Name
              <span className="text-danger">*</span>

            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Customer Name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
            />

          </div>

          {/* Mobile */}

          <div className="mb-3">

            <label className="form-label fw-semibold">

              Mobile Number
              <span className="text-danger">*</span>

            </label>

            <input
              type="tel"
              className="form-control"
              maxLength={10}
              placeholder="9876543210"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value)
              }
            />

          </div>

          {/* Email */}

          <div className="mb-3">

            <label className="form-label fw-semibold">

              Email

            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          {/* GSTIN */}

          <div className="mb-3">

            <label className="form-label fw-semibold">

              GSTIN

            </label>

            <input
              type="text"
              className="form-control"
              placeholder="GSTIN (Optional)"
              value={gstin}
              onChange={(e) =>
                setGstin(e.target.value.toUpperCase())
              }
            />

          </div>

          {/* Address */}

          <div className="mb-3">

            <label className="form-label fw-semibold">

              Address

            </label>

            <textarea
              rows="3"
              className="form-control"
              placeholder="Enter Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
            />

          </div>

          {/* City */}

          <div className="mb-3">

            <label className="form-label fw-semibold">

              City

            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter City"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
            />

          </div>

          {/* State */}

          <div className="mb-3">

            <label className="form-label fw-semibold">

              State
              <span className="text-danger">*</span>

            </label>

            <select
              className="form-select"
              value={state}
              onChange={(e) =>
                setState(e.target.value)
              }
            >

              <option value="">
                Select State
              </option>

              {indianStates.map((item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              ))}

            </select>

          </div>

          {/* Pincode */}

          <div className="mb-4">

            <label className="form-label fw-semibold">

              Pincode

            </label>

            <input
              type="text"
              maxLength={6}
              className="form-control"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) =>
                setPincode(e.target.value)
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
                htmlFor="status"
                className="form-check-label fw-semibold"
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
              ? "Update Customer"
              : "Save Customer"}

          </button>

        </form>

      </div>

    </div>

  );

}

export default CustomerForm;