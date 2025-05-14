import React from 'react';
import { Product } from './../ProductsData';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div
        className="product-card-image"
        style={{ backgroundImage: `url(${product.image})` }}
      />
      <div className="product-card-content">
        <h3>{product.name}</h3>
        <p>{product.price}₾</p>
        <p>{product.location}</p>
      </div>
    </div>
  );
};

export default ProductCard;
