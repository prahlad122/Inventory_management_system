import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-3">

      {/* Left Section */}
      <div className="d-flex align-items-center">

        {/* Mobile Sidebar Toggle */}
        <button
          className="btn btn-outline-primary d-lg-none me-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar"
          aria-controls="sidebar"
        >
          ☰
        </button>

        {/* Logo */}
        <h4 className="mb-0 fw-bold text-primary">
          Inventory Management
        </h4>

      </div>

      {/* Right Section */}
      <div className="d-flex align-items-center ms-auto"> 

        {/* User Dropdown */}
        <div className="dropdown">

          <button
            className="btn btn-outline-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            👤
          </button>

          <ul className="dropdown-menu dropdown-menu-end">

            <li>
              <button className="dropdown-item">
                My Profile
              </button>
            </li>

            <li>
              <button className="dropdown-item">
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
                Logout
              </button>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Header;