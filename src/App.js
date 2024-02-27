import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Pages/Admin";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Sidebar from "./Components/Sidebar/Sidebar";
import AddProduct from "./Components/AddProduct/AddProduct";
import ListProduct from "./Components/ListProduct/ListProduct";
import EditProduct from "./Components/EditProduct/EditProduct";

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/test" element={<Sidebar />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/addproduct" element={<AddProduct />} /> 
          <Route path="/edit/:productid" element={<EditProduct />} /> 
          <Route path="/listproduct" element={<ListProduct />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
