import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaList, FaPlusCircle, FaHeart, FaUser } from 'react-icons/fa';
import './BottomBar.css';
import { productsData } from './../ProductsData';

const BottomBar: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = Array.from(
    new Map(productsData.map(product => [product.category, product])).values()
  ).map(product => ({
    title: product.category,
    src: product.categoryImg,
  }));

  const getSubCategories = (category: string) => {
    return Array.from(
      new Map(
        productsData
          .filter(p => p.category === category)
          .map(p => [p.subCategory, p])
      ).values()
    ).map(p => ({
      title: p.subCategory,
      src: p.subCategoryImg,
    }));
  };

  const handleNavigate = (path: string) => {
    if (window.location.pathname === path) {
      window.scrollTo(0, 0);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="bottom-bar">
      <button onClick={() => handleNavigate('/')} className="bottom-bar-button">
        <FaHome className="icon" />
        <span>Home</span>
      </button>

      <button
        className="bottombar-category"
        onClick={() => setShowOverlay(true)}
      >
        <FaList className="icon" />
        <span>Categories</span>
      </button>

      <button
        onClick={() => handleNavigate('/add-product')}
        className="add-button"
      >
        <FaPlusCircle className="icon add-icon" />
      </button>

      <button
        onClick={() => handleNavigate('/favorites')}
        className="bottom-bar-button"
      >
        <FaHeart className="icon" />
        <span>Favorites</span>
      </button>

      <button
        onClick={() => handleNavigate('/signinsignup')}
        className="bottom-bar-button"
      >
        <FaUser className="icon" />
        <span>Login</span>
      </button>

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <button
              className="overlay-close"
              onClick={() => {
                setShowOverlay(false);
                setActiveCategory(null);
              }}
            >
              ×
            </button>

            {activeCategory ? (
              <>
                <h2>{activeCategory} ქვეკატეგორიები</h2>
                <button
                  onClick={() => setActiveCategory(null)}
                >
                  ← უკან
                </button>
                <div className="overlay-categories">
                  {getSubCategories(activeCategory).map((sub, i) => (
                    <div
                      key={i}
                      className="overlay-item"
                      onClick={() => {
                        navigate(`/subcategory/${sub.title}`);
                        setShowOverlay(false);
                        setActiveCategory(null);
                      }}
                    >
                      <img src={sub.src} alt={sub.title} />
                      <span>{sub.title}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2>ყველა კატეგორია</h2>
                <div className="overlay-categories">
                  {categories.map((cat, i) => (
                    <div
                      key={i}
                      className="overlay-item"
                      onClick={() => setActiveCategory(cat.title)}
                    >
                      <img src={cat.src} alt={cat.title} />
                      <span>{cat.title}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomBar;
