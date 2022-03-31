import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Pizza from './Components/Home';
import { Provider } from "react-redux"
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import store from './reducer/index'
import Cart from './Components/Cart';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Signup from './Components/Signup';
import Admin from './Components/admin/Admin';
import Userlist from './Components/admin/Userlist';
import Addproduct from './Components/admin/Addproduct';
import Orderlist from './Components/admin/Orderlist';
import ForgetPassword from './Components/ForgetPassword';
import Addtocart from './Components/Addtocart';
function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Pizza />} />
            <Route path="/signin" element={<Login />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route eact path="/admin/userlist" element={<Userlist />} />
            <Route eact path="/admin/addproduct" element={<Addproduct />} />
            <Route eact path="/admin/orderslist" element={<Orderlist />} />
            <Route exact path="/changepassword" element={<ForgetPassword />} />
            <Route exact path="/addtocart" element={<Addtocart />} />
          </Routes>

        </Provider>
      </Router>
      {/* <Navbar /> */}
    </>
  );
}

export default App;
