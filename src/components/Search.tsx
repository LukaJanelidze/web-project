import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiClock, FiSearch, FiX, FiFilter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const georgiaCities = [
  'თბილისი', 'ბათუმი', 'ქუთაისი', 'ზუგდიდი', 'რუსთავი', 'სამტრედია', 'გორი', 'ახალქალაქი',
  'გურჯაანი', 'ტყიბული', 'ოზურგეთი', 'ხობი', 'ანაკლიე', 'ფოთი', 'სიღნაღი', 'გორი', 'წალკა',
  'ლაგოდეხი', 'თეთრიწყარო', 'ხაშური', 'კასპი', 'მცხეთა', 'ბორჯომი', 'ჩოხატაური', 'დუშეთი',
  'ბაკურიანი', 'ლენტეხი', 'სენაკი', 'ხიმში', 'ვანთი', 'შუმი'
];

interface SearchProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const Search: React.FC<SearchProps> = ({ isActive, setIsActive, inputRef }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [itemName, setItemName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const navigate = useNavigate();

  // Load search history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('searchHistory');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }, [history]);

  const handleClose = () => {
    setIsActive(false);
    setSearchQuery('');
  };

  const handleClearQuery = () => setSearchQuery('');

  const handleSearch = () => {
  const params = new URLSearchParams();

  const isAdvancedSearch = isFilterVisible;

  if (isAdvancedSearch) {
    if (selectedCity) params.append('city', selectedCity);
    if (itemName) params.append('item', itemName);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
  }

  // Only include main searchQuery if not in advanced search
  if (!isAdvancedSearch && searchQuery.trim()) {
    params.append('query', searchQuery);
  }

  if (params.toString()) {
    navigate(`/search?${params.toString()}`);

    if (!isAdvancedSearch && searchQuery.trim()) {
      setHistory((prev) => {
        const newHistory = [searchQuery, ...prev.filter((h) => h !== searchQuery)];
        return newHistory.slice(0, 10);
      });
    }

    setIsActive(false);
    setSearchQuery('');
    setIsFilterVisible(false);
  }
};


  const handleRemoveHistoryItem = (item: string) => {
    setHistory((prev) => prev.filter((h) => h !== item));
  };

  const handleFilterToggle = () => {
    setIsFilterVisible(!isFilterVisible);

    if (!isFilterVisible) {
      setSelectedCity('');
      setItemName('');
      setMinPrice('');
      setMaxPrice('');
    }
  };

  return (
    <>
      {isActive && (
        <div className="search-overlay">
          <div className="search-header">
            <button className="back-button" onClick={handleClose}>
              <FiArrowLeft />
            </button>
            <span className="search-title">საიტზე ძებნა</span>
          </div>

          <div className="search-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              placeholder="რას ეძებთ?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-full-input"
            />
            {searchQuery && (
              <button className="clear-button" onClick={handleClearQuery}>
                <FiX />
              </button>
            )}
          </div>

          <div className="search-footer">
            <button className="filter-button" onClick={handleFilterToggle}>
              <FiFilter />
              დამატებითი ფილტრები
            </button>
            <button className="submit-button" onClick={handleSearch}>
              <FiSearch />
              ძებნა
            </button>
          </div>

          {history.length > 0 && <p className="history-label">ბოლოს მოძებნილი</p>}

          <div className="search-history">
            {history.slice(0, 4).map((item, idx) => (
              <div className="history-item" key={idx}>
                <FiClock className="history-icon" />
                <span className="history-text">{item}</span>
                <FiX
                  className="remove-history"
                  onClick={() => handleRemoveHistoryItem(item)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {isFilterVisible && (
        <div className="filter-overlay">
          <div className="filter-header">
            <button className="back-button" onClick={handleFilterToggle}>
              <FiArrowLeft />
            </button>
            <h2>ფილტრები</h2>
          </div>

          <div className="filter-body">
            {/* Item Name Filter */}
            <div className="filter-group">
              <label htmlFor="itemName">პროდუქტის დასახელება</label>
              <input
                type="text"
                id="itemName"
                placeholder="პროდუქტის დასახელება"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>

            {/* City Filter */}
            <div className="filter-group">
              <label htmlFor="city">ქალაქი</label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">აირჩიეთ ქალაქი</option>
                {georgiaCities.map((city, idx) => (
                  <option key={idx} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label>ფასის დიაპაზონი</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="მინიმალური"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="მაქსიმალური"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="filter-footer">
            <button className="apply-button" onClick={handleSearch}>
              გამოყენება
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
