import { useState } from "react";

import { NavLink } from "react-router-dom";
import { Offcanvas } from "bootstrap";

function Sidebar() {
  const [masterOpen, setMasterOpen] = useState(true);

  const closeSidebar = () => {
    const sidebar = document.getElementById("sidebar");

    if (sidebar) {
      const bsOffcanvas = Offcanvas.getOrCreateInstance(sidebar);

      bsOffcanvas.hide();
    }
  };

  const menuClass = ({ isActive }) =>
    `nav-link text-white rounded px-3 py-2 mb-1 ${
      isActive ? "bg-primary" : ""
    }`;

  const sidebarContent = (
    <div className="h-100 d-flex flex-column">
      <div className="p-3 border-bottom border-secondary">
        <h5 className="text-white fw-bold mb-0">Inventory</h5>
      </div>

      <ul className="nav flex-column p-2">
        {/* Dashboard */}
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            end
            className={menuClass}
            data-bs-dismiss="offcanvas"
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        </li>

        {/* Master */}

        <li className="nav-item">
          <button
            className="btn btn-dark w-100 text-start d-flex justify-content-between align-items-center"
            onClick={() => setMasterOpen(!masterOpen)}
          >
            <span>
              <i className="bi bi-folder me-2"></i>
              Master
            </span>

            <i
              className={`bi ${
                masterOpen ? "bi-chevron-down" : "bi-chevron-right"
              }`}
            ></i>
          </button>

          {masterOpen && (
            <ul className="nav flex-column ms-3 mt-2">
              <li>
                <NavLink
                  to="/dashboard/master/category"
                  className={menuClass}
                  data-bs-dismiss="offcanvas"
                >
                  Category Master
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/master/subcategory"
                  className={menuClass}
                  data-bs-dismiss="offcanvas"
                >
                  SubCategory Master
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/master/item"
                  className={menuClass}
                  data-bs-dismiss="offcanvas"
                >
                  Item Master
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/master/tax"
                  className={menuClass}
                  data-bs-dismiss="offcanvas"
                >
                  Tax Master
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Transaction */}
        <li className="nav-item mt-2">
          <NavLink
            to="/dashboard/transaction"
            className={menuClass}
            data-bs-dismiss="offcanvas"
          >
            <i className="bi bi-arrow-left-right me-2"></i>
            Transaction
          </NavLink>
        </li>

        {/* Report */}
        <li className="nav-item">
          <NavLink
            to="/dashboard/report"
            className={menuClass}
            data-bs-dismiss="offcanvas"
          >
            <i className="bi bi-bar-chart me-2"></i>
            Report
          </NavLink>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="bg-dark text-white d-none d-lg-block"
        style={{
          width: "260px",
          minHeight: "100vh",
        }}
      >
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="sidebar"
      >
        <div className="offcanvas-header">
          <h5 className="text-white">Inventory</h5>

          <button
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body p-0">{sidebarContent}</div>
      </div>
    </>
  );
}

export default Sidebar;
