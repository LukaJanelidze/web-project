import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from './../ProductsData';
import './FilteredCategoryPage.css';

const FilteredCategoryPage: React.FC = () => {
  const { categoryName, subCategoryName } = useParams<{
    categoryName?: string;
    subCategoryName?: string;
  }>();

  const filteredProducts = productsData.filter((product) => {
    if (subCategoryName) {
      return product.subCategory.toLowerCase() === subCategoryName.toLowerCase();
    } else if (categoryName) {
      return product.category.toLowerCase() === categoryName.toLowerCase();
    }
    return false;
  });

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="category-filter-container">
      <h2 className="category-filter-title">
        {subCategoryName
          ? `ქვეკატეგორია: "${subCategoryName}"`
          : categoryName
          ? `კატეგორია: "${categoryName}"`
          : 'ფილტრი'}
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="category-filter-empty">პროდუქტები ამ კატეგორიაში არ მოიძებნა</p>
      ) : (
        <div className="category-product-grid">
          {currentItems.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="category-product-card"
            >
              <img
                src={product.image}
                alt={product.name}
                className="category-product-image"
              />
              <h3 className="category-product-name">{product.name}</h3>
              <p className="category-product-price">{product.price} ₾</p>
              <p className="category-product-location">{product.location}</p>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="category-pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`category-pagination-btn ${
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

export default FilteredCategoryPage;
