import React from 'react';
import { storesData } from './../StoresData';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import './Stores.css';

const Stores: React.FC = () => {
  return (
    <div className="stores-container">
      <h1>მაღაზიები</h1>
      <div className="stores-wrapper">
      <Link to="/stores" className='more-stores'><FiMenu /> მეტი</Link>
        {storesData.map((store) => (
          <Link to={`/store/${store.id}`} key={store.id} className="store-item-link">
            <div
              className="store-item"
              style={{ backgroundImage: `url(${store.image})` }}
            >
              <div className="store-title">{store.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Stores;
