import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import CategoryMaster from "./pages/CategoryMaster";
import SubCategoryMaster from "./pages/SubCategoryMaster";
import ItemMaster from "./pages/ItemMaster";
import TaxMaster from "./pages/TaxMaster";

import Transaction from "./pages/Transaction";
import Report from "./pages/Report";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Login */}

      <Route path="/" element={<Login />} />

      {/* Protected Routes */}

      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        <Route path="master/category" element={<CategoryMaster />} />

        <Route path="master/subcategory" element={<SubCategoryMaster />} />

        <Route path="master/item" element={<ItemMaster />} />

        <Route path="master/tax" element={<TaxMaster />} />

        <Route path="transaction" element={<Transaction />} />

        <Route path="report" element={<Report />} />
      </Route>
    </Routes>
  );
}

export default App;
