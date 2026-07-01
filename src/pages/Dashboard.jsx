function Dashboard() {
  return (
    <div className="container-fluid">

      <div className="mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted">
          Welcome to Inventory Management System
        </p>
      </div>

      <div className="row g-4">

        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Total Categories</h6>
              <h3>10</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Total SubCategories</h6>
              <h3>20</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Total Items</h6>
              <h3>150</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Total Tax</h6>
              <h3>5</h3>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;