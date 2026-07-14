import { useEffect, useState } from "react";
import TaxForm from "../components/TaxForm";
import TaxList from "../components/TaxList";

function TaxMaster() { 
  // States 

  const [taxes, setTaxes] = useState([]);

  const [taxName, setTaxName] = useState("");

  const [taxType, setTaxType] = useState("GST");

  const [percentage, setPercentage] = useState("");

  const [description, setDescription] = useState("");

  const [status, setStatus] = useState(false);

  const [editId, setEditId] = useState(null);
 
  // Load LocalStorage 

  useEffect(() => {
    const storedTaxes = JSON.parse(localStorage.getItem("taxes")) || [];

    setTaxes(storedTaxes);
  }, []);
 
  // Save LocalStorage 

  useEffect(() => {
    localStorage.setItem("taxes", JSON.stringify(taxes));
  }, [taxes]);
 
  // Submit 

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
              taxType,
              percentage,
              description,
              status,
            }
          : item,
      );

      setTaxes(updatedTaxes);

      setEditId(null);
    } else {
      const newTax = {
        id: Date.now(),

        taxName,

        taxType,

        percentage,

        description,

        status,
      };

      setTaxes([...taxes, newTax]);
    }

    resetForm();
  };
 
  // Reset Form 

  const resetForm = () => {
    setTaxName("");

    setTaxType("GST");

    setPercentage("");

    setDescription("");

    setStatus(false);
  };
 
  // Delete 

  const handleDelete = (id) => {
    if (window.confirm("Delete this Tax?")) {
      const updated = taxes.filter((item) => item.id !== id);

      setTaxes(updated);
    }
  };
 
  // Edit 

  const handleEdit = (item) => {
    setTaxName(item.taxName);

    setTaxType(item.taxType);

    setPercentage(item.percentage);

    setDescription(item.description);

    setStatus(item.status);

    setEditId(item.id);
  };
 
  // JSX 

  return (
    <div className="container-fluid py-3 py-md-4 px-3 px-md-4">
      {/* Heading */}

      <div className="mb-3 mb-md-4 text-center text-md-start">
        <h2 className="fw-bold mb-1">Tax Master</h2>

        <p className="text-muted mb-0">
          Manage GST Rates for your Billing System
        </p>
      </div>

      {/* Responsive Layout */}

      <div className="row g-3 g-lg-4">
        {/* Tax Form */}

        <div className="col-12 col-lg-5 col-xl-4">
          <TaxForm
            taxName={taxName}
            setTaxName={setTaxName}
            taxType={taxType}
            setTaxType={setTaxType}
            percentage={percentage}
            setPercentage={setPercentage}
            description={description}
            setDescription={setDescription}
            status={status}
            setStatus={setStatus}
            editId={editId}
            handleSubmit={handleSubmit}
          />
        </div>

        {/* Tax List */}

        <div className="col-12 col-lg-7 col-xl-8">
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
