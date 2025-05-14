import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from './../ProductsData';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = productsData.find((p) => p.id === id);

  if (!product) return <p>პროდუქტი ვერ მოიძებნა.</p>;

  return (
    <div className="product-detail-container">
      <img
        src={product.image}
        alt={product.name}
        className="product-detail-image"
      />
      <div className="product-detail-info">
        <h1 className="product-detail-title">{product.name}</h1>
        <p className="product-detail-price">ფასი: {product.price} ₾</p>
        <p className="product-detail-location">ადგილმდებარეობა: {product.location}</p>
        <Link to="/" className="back-button">← დაბრუნება</Link>
      </div>
    </div>
  );
};

export default ProductDetail;
