import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { productsData } from './../ProductsData';
import './FilteredProductsPage.css';

const FilteredProductsPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const query = searchParams.get('query')?.toLowerCase() ?? '';
  const city = searchParams.get('city')?.toLowerCase() ?? '';
  const item = searchParams.get('item')?.toLowerCase() ?? '';
  const minPrice = parseFloat(searchParams.get('minPrice') ?? '0');
  const maxPrice = parseFloat(searchParams.get('maxPrice') ?? 'Infinity');

  const filtered = productsData.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(query);
    const matchesCity = city ? product.location.toLowerCase() === city : true;
    const matchesItem = item ? product.name.toLowerCase().includes(item) : true;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return matchesQuery && matchesCity && matchesItem && matchesPrice;
  });

  // Pagination State
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // Get items for the current page
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="filtered-products">
      <h2>
        {query ? `ძიების შედეგები: "${query}"` : 'ძიების შედეგები'}
        {city && ` - ქალაქი: "${city}"`}
        {item && ` - პროდუქტის დასახელება: "${item}"`}
        {(minPrice > 0 || maxPrice < Infinity) && ` - ფასის დიაპაზონი: ${minPrice > 0 ? minPrice : ''} ₾ - ${maxPrice < Infinity ? maxPrice : ''} ₾`}
      </h2>

      {filtered.length === 0 ? (
        <p>პროდუქტები არ მოიძებნა</p>
      ) : (
        <div className="products-grid">
          {currentItems.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price} ₾</p>
              <p className="product-location">{product.location}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pagination-btn ${
                currentPage === index + 1 ? 'active' : ''
              }`}
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

export default FilteredProductsPage;
