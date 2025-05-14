import React, { useState } from 'react';
import './Categories.css';
import { useNavigate } from 'react-router-dom';
import { productsData } from './../ProductsData';
import { FiMenu } from 'react-icons/fi';

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Unique categories
  const categories = Array.from(
    new Map(productsData.map(product => [product.category, product])).values()
  ).map(product => ({
    title: product.category,
    src: product.categoryImg,
  }));

  // Divide categories into chunks of 6
  const chunks = chunkArray(categories, 6);

  // Unique subcategories for selected category
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

  return (
    <div className="categories-container">
      <h1>კატეგორიები</h1>
      <div className="categories-wrapper">
        {chunks.map((chunk, i) => (
          <div className="category-block" key={i}>

            <div className="category-filter-button" onClick={() => {
              setShowOverlay(true);
              setActiveCategory(null);
            }}>
              <div className="categories-three-lines">
                <FiMenu />
              </div>
              <div className="all-categories-title">
                <span>ყველა კატეგორია</span>
              </div>
            </div>

            {chunk.map((item, j) => (
              <div
                className="category-item"
                key={j}
                style={{ backgroundImage: `url(${item.src})` }}
                onClick={() => {
                  setActiveCategory(item.title);
                  setShowOverlay(true);
                }}
              >
                <div className="item-title">{item.title}</div>
              </div>
            ))}

          </div>
        ))}
      </div>

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="overlay-close" onClick={() => {
              setShowOverlay(false);
              setActiveCategory(null);
            }}>
              ×
            </button>

            {activeCategory ? (
              <>
                <h2>{activeCategory} ქვეკატეგორიები</h2>
                <button
                  onClick={() => setActiveCategory(null)}
                  style={{ marginBottom: '15px', cursor: 'pointer' }}
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

export default Categories;
