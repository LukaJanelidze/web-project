import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { storesData } from './../StoresData';
import { productsData } from './../ProductsData'; // Assuming products data is available
import './StorePage.css';

const StorePage: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const store = storesData.find((store) => store.id === storeId);

  const [currentPage, setCurrentPage] = useState(1);

  if (!store) {
    return <p>Store not found!</p>;
  }

  const itemsPerPage = 10;
  const filteredProducts = productsData.filter((product) => product.storeId === storeId);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="store-page">
      {/* Store Image at the Top */}
      <div className="store-banner">
        <img
          src={store.image}  // Use the store image
          alt={store.title}
          className="store-banner-image"
        />
      </div>

      {/* Store Details */}
      <div className="store-details">
        <h2>{store.title}</h2>
        <p>{store.description}</p>
      </div>

      {/* Products List */}
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="products-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price} ₾</p>
              <p className="product-location">{product.location}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StorePage;
