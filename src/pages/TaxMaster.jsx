import { useEffect, useState } from "react";
import TaxForm from "../components/TaxForm";
import TaxList from "../components/TaxList";

function TaxMaster() {

  // ==========================
  // State
  // ==========================

  const [taxes, setTaxes] = useState([]);

  const [taxName, setTaxName] = useState("");

  const [percentage, setPercentage] = useState("");

  const [status, setStatus] = useState(false);

  const [editId, setEditId] = useState(null);

  // ==========================
  // Load Data
  // ==========================

  useEffect(() => {

    const storedTaxes =
      JSON.parse(localStorage.getItem("taxes")) || [];

    setTaxes(storedTaxes);

  }, []);

  // ==========================
  // Save Data
  // ==========================

  useEffect(() => {

    localStorage.setItem(
      "taxes",
      JSON.stringify(taxes)
    );

  }, [taxes]);

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = (e) => {

    e.preventDefault();

    if (taxName.trim() === "") {
      alert("Tax Name is Required");
      return;
    }

    if (percentage === "") {
      alert("Tax Percentage is Required");
      return;
    }

    if (editId !== null) {

      const updatedTaxes = taxes.map((item) =>

        item.id === editId
          ? {
              ...item,
              taxName,
              percentage,
              status,
            }
          : item

      );

      setTaxes(updatedTaxes);

      setEditId(null);

    } else {

      const newTax = {

        id: Date.now(),

        taxName,

        percentage,

        status,

      };

      setTaxes([...taxes, newTax]);

    }

    // Reset

    setTaxName("");

    setPercentage("");

    setStatus(false);

  };

  // ==========================
  // Delete
  // ==========================

  const handleDelete = (id) => {

    if (window.confirm("Delete Tax ?")) {

      const filtered = taxes.filter(
        (item) => item.id !== id
      );

      setTaxes(filtered);

    }

  };

  // ==========================
  // Edit
  // ==========================

  const handleEdit = (item) => {

    setTaxName(item.taxName);

    setPercentage(item.percentage);

    setStatus(item.status);

    setEditId(item.id);

  };

  // ==========================
  // JSX
  // ==========================

  return (

    <div className="container-fluid py-4">

      <div className="mb-4">

        <h2 className="fw-bold">
          Tax Master
        </h2>

        <p className="text-muted">
          Create, Update and Manage Taxes
        </p>

      </div>

      <div className="row g-4">

        {/* Form */}

        <div className="col-xl-4 col-lg-5 col-md-12">

          <TaxForm

            taxName={taxName}
            setTaxName={setTaxName}

            percentage={percentage}
            setPercentage={setPercentage}

            status={status}
            setStatus={setStatus}

            handleSubmit={handleSubmit}

            editId={editId}

          />

        </div>

        {/* List */}

        <div className="col-xl-8 col-lg-7 col-md-12">

          <TaxList

            taxes={taxes}

            handleEdit={handleEdit}

            handleDelete={handleDelete}

          />

        </div>

      </div>

    </div>

  );

}

export default TaxMaster;