import { useEffect, useState } from "react";
import CustomerForm from "../components/CustomerForm";
import CustomerList from "../components/CustomerList";

function CustomerMaster() {
  
  // State

  const [customers, setCustomers] = useState([]);

  const [customerName, setCustomerName] = useState("");

  const [mobile, setMobile] = useState("");

  const [email, setEmail] = useState("");

  const [gstin, setGstin] = useState("");

  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");

  const [state, setState] = useState("");

  const [pincode, setPincode] = useState("");

  const [status, setStatus] = useState(false);

  const [editId, setEditId] = useState(null);

  // Load Data

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];

    setCustomers(storedCustomers);
  }, []);

  // Save Data

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  // Submit

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation

    if (customerName.trim() === "") {
      alert("Customer Name is Required");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Enter Valid Mobile Number");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Enter Valid Email");
      return;
    }

    if (state === "") {
      alert("Please Select State");
      return;
    }

    if (pincode && !/^\d{6}$/.test(pincode)) {
      alert("Enter Valid Pincode");
      return;
    }

    if (editId !== null) {
      const updatedCustomers = customers.map((item) =>
        item.id === editId
          ? {
              ...item,
              customerName,
              mobile,
              email,
              gstin,
              address,
              city,
              state,
              pincode,
              status,
            }
          : item,
      );

      setCustomers(updatedCustomers);

      setEditId(null);
    } else {
      const newCustomer = {
        id: Date.now(),

        customerName,

        mobile,

        email,

        gstin,

        address,

        city,

        state,

        pincode,

        status,
      };

      setCustomers([...customers, newCustomer]);
    }

    resetForm();
  };

  // Reset Form

  const resetForm = () => {
    setCustomerName("");

    setMobile("");

    setEmail("");

    setGstin("");

    setAddress("");

    setCity("");

    setState("");

    setPincode("");

    setStatus(false);
  };

  // Delete

  const handleDelete = (id) => {
    if (window.confirm("Delete Customer ?")) {
      const updatedCustomers = customers.filter((item) => item.id !== id);

      setCustomers(updatedCustomers);
    }
  };

  // Edit

  const handleEdit = (item) => {
    setCustomerName(item.customerName);

    setMobile(item.mobile);

    setEmail(item.email);

    setGstin(item.gstin);

    setAddress(item.address);

    setCity(item.city);

    setState(item.state);

    setPincode(item.pincode);

    setStatus(item.status);

    setEditId(item.id);
  };

  // JSX

  return (
    <div className="container-fluid py-4">
      {/* Heading */}

      <div className="mb-4">
        <h2 className="fw-bold">Customer Master</h2>

        <p className="text-muted mb-0">Create, Update and Manage Customers</p>
      </div>

      {/* Responsive Layout */}

      <div className="row g-4">
        {/* Form */}

        <div className="col-12 col-lg-5 col-xl-4">
          <CustomerForm
            customerName={customerName}
            setCustomerName={setCustomerName}
            mobile={mobile}
            setMobile={setMobile}
            email={email}
            setEmail={setEmail}
            gstin={gstin}
            setGstin={setGstin}
            address={address}
            setAddress={setAddress}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            pincode={pincode}
            setPincode={setPincode}
            status={status}
            setStatus={setStatus}
            handleSubmit={handleSubmit}
            editId={editId}
          />
        </div>

        {/* List */}

        <div className="col-12 col-lg-7 col-xl-8">
          <CustomerList
            customers={customers}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerMaster;
