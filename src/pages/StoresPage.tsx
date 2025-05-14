import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { storesData } from './../StoresData';
import './StoresPage.css';

const StoresPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(storesData.length / itemsPerPage);

  const currentStores = storesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="stores-page">
      <h2>მაღაზიები</h2>

      {storesData.length === 0 ? (
        <p>მაღაზიები ვერ მოიძებნა</p>
      ) : (
        <div className="stores-grid">
          {currentStores.map((store) => (
            <Link to={`/store/${store.id}`} key={store.id} className="store-card-link">
              <div className="store-card">
                <img src={store.image} alt={store.title} className="store-image" />
                <h3 className="store-name">{store.title}</h3>
                <p className="store-location">{store.location}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

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

export default StoresPage;
