import React from 'react';
import { productsData } from './../ProductsData';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const newestProducts = productsData.slice(-10).reverse();

  return (
    <div className="home-container">
      <h1 className="home-title">ახალი დამატებული პროდუქტები</h1>
      <div className="products-grid">
        {newestProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-link">
            <div className="product-card">
              <div className="product-image-box">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price} ₾</p>
              <p className="product-location">{product.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
