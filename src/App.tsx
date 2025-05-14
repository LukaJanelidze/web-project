import { Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderNavbar from './components/HeaderNavbar';
import About from './pages/About';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import ProfilePage from './pages/ProfilePage';
import UploadPage from './pages/UploadPage';
import SignInSignUp from './pages/SignInSignUp';
import Categories from './components/Categories';
import Stores from './components/Stores';
import Search from './components/Search'; // Updated import
import FilteredProductsPage from './pages/FilteredProductsPage';
import { useRef, useState } from 'react';
import HeaderSearch from './components/HeaderSearch';
import FilteredCategoryPage from './pages/FilteredCategoryPage';
import BottomBar from './components/BottomBar';
import StoresPage from './pages/StoresPage';
import StorePage from './pages/StorePage';
import ProductDetail from './pages/ProductDetail';

function App() {
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = () => {
    setIsActive(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="main">
      <HeaderNavbar />
      
      <div className="search-component">
        <Search isActive={isActive} setIsActive={setIsActive} inputRef={inputRef} />
        <HeaderSearch isActive={isActive} handleInputClick={handleInputClick} />
      </div>

      <Categories />
      <Stores />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/signinsignup" element={<SignInSignUp />} />
        <Route path="/search" element={<FilteredProductsPage />} />
        <Route path="/subcategory/:subCategoryName" element={<FilteredCategoryPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/store/:storeId" element={<StorePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      <Footer />
      <BottomBar />
    </div>
  );
}

export default App;