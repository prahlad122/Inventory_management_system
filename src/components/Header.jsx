import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav className="navbar bg-white shadow-sm sticky-top px-2 px-md-3">
      <div className="container-fluid">
        {/* Left */}
        <div className="d-flex align-items-center flex-grow-1 overflow-hidden">
          <button
            className="btn btn-outline-primary d-lg-none me-2 flex-shrink-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            aria-controls="sidebar"
          >
            ☰
          </button>

          <h4 className="mb-0 fw-bold text-primary fs-6 fs-md-4 text-truncate">
            Inventory Management
          </h4>
        </div>

        {/* Right */}
        <div className="ms-2 flex-shrink-0">
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              👤
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/dashboard/profile")}
                >
                  <i className="bi bi-person me-2"></i>
                  My Profile
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/dashboard/settings")}
                >
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </button>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
