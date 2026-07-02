import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />

      <div className="d-flex">

        <Sidebar  />

        <main
          className="flex-grow-1 bg-light p-4"
          style={{ minHeight: "100vh" }}
        >
          <Outlet />
        </main>

      </div>
    </>
  );
}

export default Layout;