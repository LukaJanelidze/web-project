import React, { useState } from 'react';
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

  const handleClose = () => {
    setIsActive(false);
    setSearchQuery('');
  };

  const handleClearQuery = () => setSearchQuery('');

  const handleSearch = () => {
    // If no filters are applied, we proceed with normal search (just searchQuery)
    if (isFilterVisible) {
      // Advanced search (only if advanced filters are visible)
      if (selectedCity || itemName || minPrice || maxPrice) {
        const params = new URLSearchParams();
        if (selectedCity) params.append('city', selectedCity);
        if (itemName) params.append('item', itemName);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);

        navigate(`/search?${params.toString()}`);
      } else {
        // If no advanced filters, just use search query
        if (searchQuery.trim()) {
          const params = new URLSearchParams();
          params.append('query', searchQuery);
          navigate(`/search?${params.toString()}`);
        }
      }
    } else {
      // Normal search (just using searchQuery)
      if (searchQuery.trim()) {
        const params = new URLSearchParams();
        params.append('query', searchQuery);
        navigate(`/search?${params.toString()}`);
      }
    }
    setIsActive(false);
    setSearchQuery('');
  };

  const handleRemoveHistoryItem = (item: string) => {
    setHistory((prev) => prev.filter((h) => h !== item));
  };

  const handleFilterToggle = () => {
    setIsFilterVisible(!isFilterVisible);

    // If we switch to the advanced filter view, clear any existing advanced search values
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
            <span className="search-title">ძებნა საიტზე</span>
          </div>

          <div className="search-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              placeholder="საძიებო სიტყვა"
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
              <select id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
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
            <button className="apply-button" onClick={handleSearch}>გამოყენება</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
