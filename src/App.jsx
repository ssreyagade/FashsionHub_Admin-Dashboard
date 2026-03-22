import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./pages/Navbar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Inventory from "./pages/Inventary";
import Orders from "./pages/Orders";
import OrderTable from "./pages/OrderTable";
import ProductDetails from "./pages/ProductDetails";
import Invoice from "./pages/Invoice";

function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg-image.jpeg')",
        }}
      >
        <div className="min-h-screen bg-white/30 backdrop-sm">
          <div className="flex">
            <Sidebar />

            <div className="flex-1">
              <Navbar userName="Admin" companyName="MyCompany" />

              <div className="pt-20 px-4">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/ordertable" element={<OrderTable />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/invoice" element={<Invoice />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
