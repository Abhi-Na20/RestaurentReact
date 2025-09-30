import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarRes from './RestaurentComponents/NavbarRes';
import Homepage from './RestaurentComponents/Homepage';
import AboutPage from './RestaurentComponents/Aboutpage';
import Menupage from './RestaurentComponents/Menupage';
import Contactpage from './RestaurentComponents/Contactpage';
import LoginRes from './RestaurentComponents/LoginRes';
import RegisterRes from './RestaurentComponents/RegisterRes';
import BasketRes from './RestaurentComponents/BasketRes';
import AddressRes from './RestaurentComponents/AddressRes';
import CardRes from './RestaurentComponents/CardRes';
import OrderSuccessRes from './RestaurentComponents/OrderSuccessRes';
import YourOrder from './RestaurentComponents/YourOrder';
import SettingsRes from './RestaurentComponents/SettingsRes';
import SummaryRes from './RestaurentComponents/SummaryRes';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Aboutus" element={<AboutPage />} />
        <Route path="/Menu" element={<Menupage />} />
        <Route path="/Contact" element={<Contactpage />} />
        <Route path="/login" element={<LoginRes />} />
        <Route path="/register" element={<RegisterRes />} />
        <Route path="/basket" element={<BasketRes />} />
        <Route path="/address" element={<AddressRes />} />
        <Route path="/card" element={<CardRes />} />
        <Route path="/success" element={<OrderSuccessRes />} />
        <Route path="/orders" element={<YourOrder />} />
        <Route path="/settings" element={<SettingsRes />} />
        <Route path="/summary" element={<SummaryRes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
