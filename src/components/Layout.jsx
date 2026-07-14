import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />

      <div className="d-flex flex-column flex-lg-row">
        <Sidebar />

        <main
          className="flex-grow-1 bg-light p-3 p-md-4 w-100"
          style={{ minHeight: "100vh" }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
